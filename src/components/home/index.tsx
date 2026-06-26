'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Home, BookOpen, Trophy, Star, User, Lock } from 'lucide-react';

import { LEVELS, Position, Direction } from '../../config/levels';
import { DemoPlatform } from './demo';
import { Level1Platform } from './level1';

type CommandType = 'straight' | 'left' | 'right' | 'pickup' | 'back';

interface CommandInfo {
  type: CommandType;
  label: string;
  imageSrc: string;
}

const COMMAND_DETAILS: Record<CommandType, CommandInfo> = {
  straight: { type: 'straight', label: 'Go Straight', imageSrc: '/images/moves/Go straight.png' },
  left: { type: 'left', label: 'Turn Left', imageSrc: '/images/moves/Turn left.png' },
  right: { type: 'right', label: 'Turn Right', imageSrc: '/images/moves/Turn right.png' },
  pickup: { type: 'pickup', label: 'Pick Up', imageSrc: '/images/moves/Pick up.png' },
  back: { type: 'back', label: 'Go Back', imageSrc: '/images/moves/Go back.png' },
};

// ── Map node definitions (x/y in percentage of a 380×640 container) ──
const MAP_NODES = [
  { id: 1, key: 'level1', name: 'What is Programming?', x: 53, y: 11 },
  { id: 2, key: 'level2', name: 'Commands', x: 69, y: 30 },
  { id: 3, key: 'level3', name: 'Sequence', x: 55, y: 48 },
  { id: 4, key: 'level4', name: 'Conditions', x: 41, y: 68 },
  { id: 5, key: 'level5', name: 'Loops', x: 67, y: 86 },
];

// SVG path connecting all nodes sequentially
const PATH_D = `M 38,11 Q 48,18 58,28 Q 52,36 42,44 Q 32,52 28,60 Q 38,68 52,76`;

// ── Theory slides ──
const THEORY_SLIDES = [
  {
    title: "Welcome to Programming! 🚀",
    text: "Computers are super powerful, but they aren't smart enough to work on their own. They need us to tell them exactly what to do using special rules and code.",
    instruction: "Let's learn how to speak the computer's language!",
    hasQuiz: false,
  },
  {
    title: "What is Programming?",
    text: "Programming is all about giving commands to a computer. A command is a clear instruction to do a specific action.",
    instruction: "The computer follows your commands exactly!",
    hasQuiz: false,
    showCommandsIllustration: true,
  },
  {
    title: "Test Your Knowledge! 🧠",
    text: "Select the correct answer to continue.",
    question: "What is a 'command' in programming?",
    options: [
      { text: "A special instruction we give to a computer to do a specific action.", isCorrect: true },
      { text: "A hardware device used to power up a robot's screen.", isCorrect: false },
      { text: "The name of a programmer's computer monitor.", isCorrect: false },
    ],
    hasQuiz: true,
  },
  {
    title: "Order Matters! 📊",
    text: "A computer runs commands step-by-step, in the exact order you write them. This ordered list of commands is called a Program!",
    instruction: "If the order is wrong, the program won't work correctly!",
    hasQuiz: false,
  },
  {
    title: "Brush Your Teeth! 🦷",
    text: "Let's put the steps of brushing your teeth in the correct sequence.",
    question: "Which sequence is correct?",
    options: [
      { text: "1. Put toothpaste on brush ➔ 2. Brush teeth ➔ 3. Rinse mouth", isCorrect: true },
      { text: "1. Rinse mouth ➔ 2. Brush teeth ➔ 3. Put toothpaste on brush", isCorrect: false },
      { text: "1. Brush teeth ➔ 2. Rinse mouth ➔ 3. Put toothpaste on brush", isCorrect: false },
    ],
    hasQuiz: true,
  },
  {
    title: "Ready to Program! 🤖",
    text: "Awesome job! You've learned that programming is giving step-by-step commands to a computer. Now let's help Lumi navigate platforms!",
    instruction: "Click Continue to unlock the Commands level and start programming!",
    hasQuiz: false,
    isEnd: true,
  },
];

// ── Flying star particle ──
interface FlyingStar { id: number; fromX: number; fromY: number; }

export default function HomePage() {
  // ── View ──
  const [view, setView] = useState<'map' | 'lesson1_theory' | 'game'>('map');

  // ── Level lock states ──
  const [levelStates, setLevelStates] = useState<Record<string, 'locked' | 'unlocked' | 'completed'>>({
    level1: 'unlocked', level2: 'locked', level3: 'locked', level4: 'locked', level5: 'locked',
  });

  // ── Stars: visualStars is what header shows; stars is the real total ──
  const [stars, setStars] = useState(0);        // actual earned
  const [visualStars, setVisualStars] = useState(0);       // animated display
  const [flyingStars, setFlyingStars] = useState<FlyingStar[]>([]);
  const [headerBounce, setHeaderBounce] = useState(false);
  const [pendingStars, setPendingStars] = useState(0);     // stars pending animation
  const starPillRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // ── Hearts ──
  const [hearts, setHearts] = useState(5);

  // ── Slides ──
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizAnswerChecked, setQuizAnswerChecked] = useState(false);
  const [showOutOfHeartsModal, setShowOutOfHeartsModal] = useState(false);

  // ── Game ──
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const level = LEVELS[currentLevelIdx];

  const [commands, setCommands] = useState<(CommandType | null)[]>(Array(5).fill(null));
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerPos, setPlayerPos] = useState<Position>({ r: 0, c: 0 });
  const [playerDir, setPlayerDir] = useState<Direction>('up');
  const [collectedStar, setCollectedStar] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [executingStep, setExecutingStep] = useState<number | null>(null);
  const [failureMsg, setFailureMsg] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const executionTimerRef = useRef<NodeJS.Timeout[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ── Persist ──
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const s = localStorage.getItem('lingo_stars');
    const h = localStorage.getItem('lingo_hearts');
    const l = localStorage.getItem('lingo_level_states');
    if (s) { const v = parseInt(s, 10); setStars(v); setVisualStars(v); }
    if (h) setHearts(parseInt(h, 10));
    if (l) { try { setLevelStates(JSON.parse(l)); } catch { } }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('lingo_stars', stars.toString());
    localStorage.setItem('lingo_hearts', hearts.toString());
    localStorage.setItem('lingo_level_states', JSON.stringify(levelStates));
  }, [stars, hearts, levelStates]);

  // ── Animate visualStars toward stars ──
  useEffect(() => {
    if (visualStars >= stars) return;
    const timer = setTimeout(() => setVisualStars(v => Math.min(v + 1, stars)), 30);
    return () => clearTimeout(timer);
  }, [visualStars, stars]);

  // ── Trigger flying stars from node position ──
  const triggerFlyingStars = useCallback((nodeId: number, count: number) => {
    const node = MAP_NODES.find(n => n.id === nodeId);
    if (!node || !mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    const fromX = rect.left + (node.x / 100) * rect.width;
    const fromY = rect.top + (node.y / 100) * rect.height;

    const newStars: FlyingStar[] = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      fromX,
      fromY,
    }));
    setFlyingStars(prev => [...prev, ...newStars]);

    // After animation completes, clear them and trigger header bounce
    setTimeout(() => {
      setFlyingStars([]);
      setHeaderBounce(true);
      setTimeout(() => setHeaderBounce(false), 600);
    }, 1000);
  }, []);

  // ── Reset level ──
  const resetLevel = useCallback((keepCommands = false) => {
    executionTimerRef.current.forEach(clearTimeout);
    executionTimerRef.current = [];
    setPlayerPos({ ...level.startPos });
    setPlayerDir(level.startDir);
    setCollectedStar(false);
    setSuccess(null);
    setExecutingStep(null);
    setIsPlaying(false);
    setFailureMsg('');
    if (!keepCommands) setCommands(Array(level.maxSlots).fill(null));
  }, [level]);

  useEffect(() => { resetLevel(); }, [currentLevelIdx, resetLevel]);

  // ── Sound ──
  const triggerSound = useCallback((type: 'tap' | 'step' | 'pickup' | 'win' | 'lose' | 'hint') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      if (!AC) return;
      const ctx = new AC();
      const tone = (f: number, dur: number, kind: OscillatorType = 'sine', t0 = 0) => {
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.type = kind; o.frequency.value = f;
        g.gain.setValueAtTime(0.12, ctx.currentTime + t0);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + t0 + dur);
        o.connect(g); g.connect(ctx.destination);
        o.start(ctx.currentTime + t0); o.stop(ctx.currentTime + t0 + dur);
      };
      switch (type) {
        case 'tap': tone(600, 0.08, 'triangle'); break;
        case 'step': tone(200, 0.06); tone(220, 0.06, 'sine', 0.04); break;
        case 'pickup': tone(523.25, 0.1); tone(659.25, 0.1, 'sine', 0.06); tone(783.99, 0.1, 'sine', 0.12); tone(1046.50, 0.25, 'sine', 0.18); break;
        case 'win':
          [261.63, 329.63, 392, 523.25, 659.25, 783.99, 1046.50].forEach((f, i) => tone(f, 0.18, 'triangle', i * 0.07)); break;
        case 'lose': {
          const o = ctx.createOscillator(); const g = ctx.createGain();
          o.type = 'sawtooth';
          o.frequency.setValueAtTime(220, ctx.currentTime);
          o.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.4);
          g.gain.setValueAtTime(0.15, ctx.currentTime);
          g.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
          o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + 0.4);
          break;
        }
        case 'hint': tone(440, 0.1); tone(554.37, 0.15, 'sine', 0.05); break;
      }
    } catch { }
  }, [soundEnabled]);

  // ── Confetti ──
  useEffect(() => {
    if (success !== true) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const colors = ['#FFC107', '#FF5722', '#E91E63', '#9C27B0', '#3F51B5', '#00BCD4', '#4CAF50', '#8BC34A'];
    const ps = Array.from({ length: 120 }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 100, y: canvas.height + 20,
      size: Math.random() * 8 + 6, color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 12, vy: -Math.random() * 15 - 10,
      rot: Math.random() * 360, rs: (Math.random() - 0.5) * 10,
    }));
    let id: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      ps.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.35; p.rot += p.rs;
        if (p.y < canvas.height + 20) alive = true;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot * Math.PI / 180);
        ctx.fillStyle = p.color; ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size); ctx.restore();
      });
      if (alive) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [success]);

  // ── Commands ──
  const addCommand = (type: CommandType) => {
    if (isPlaying || success !== null) return;
    triggerSound('tap');
    const idx = commands.findIndex(c => c === null);
    if (idx !== -1) { const nc = [...commands]; nc[idx] = type; setCommands(nc); }
  };
  const removeCommand = (index: number) => {
    if (isPlaying || success !== null) return;
    triggerSound('tap');
    const nc = [...commands]; nc[index] = null; setCommands(nc);
  };

  // ── Run sequence ──
  const runSequence = () => {
    if (isPlaying || success !== null || hearts <= 0) return;
    const active = commands.filter((c): c is CommandType => c !== null);
    if (!active.length) return;
    setIsPlaying(true); setExecutingStep(0);
    let pos = { ...level.startPos }, dir = level.startDir, starPicked = false;

    active.forEach((cmd, idx) => {
      const t = setTimeout(() => {
        setExecutingStep(idx);
        if (cmd === 'straight' || cmd === 'back') {
          const m = cmd === 'straight' ? 1 : -1;
          let nr = pos.r, nc = pos.c;
          if (dir === 'up') nr -= m; else if (dir === 'right') nc += m; else if (dir === 'down') nr += m; else nc -= m;
          if (nr < 0 || nr >= level.gridRows || nc < 0 || nc >= level.gridCols) {
            triggerSound('lose'); setFailureMsg("Oh no! Lumi fell off the platform!");
            setSuccess(false); setHearts(p => Math.max(0, p - 1)); setIsPlaying(false);
            executionTimerRef.current.slice(idx + 1).forEach(clearTimeout); return;
          }
          if (level.obstacles.find(o => o.r === nr && o.c === nc)) {
            triggerSound('lose'); setFailureMsg("Crash! Lumi ran into a rock or tree!");
            setSuccess(false); setHearts(p => Math.max(0, p - 1)); setIsPlaying(false);
            executionTimerRef.current.slice(idx + 1).forEach(clearTimeout); return;
          }
          pos = { r: nr, c: nc }; setPlayerPos(pos); triggerSound('step');
        } else if (cmd === 'left') {
          if (level.isDemo) {
            const nc2 = pos.c - 1;
            if (nc2 < 0) { triggerSound('lose'); setFailureMsg("Fell off!"); setSuccess(false); setHearts(p => Math.max(0, p - 1)); setIsPlaying(false); executionTimerRef.current.slice(idx + 1).forEach(clearTimeout); return; }
            pos = { r: pos.r, c: nc2 }; setPlayerPos(pos); triggerSound('step');
          } else {
            const dirs: Direction[] = ['up', 'left', 'down', 'right'];
            dir = dirs[(dirs.indexOf(dir) + 1) % 4]; setPlayerDir(dir); triggerSound('step');
          }
        } else if (cmd === 'right') {
          if (level.isDemo) {
            const nc3 = pos.c + 1;
            if (nc3 >= level.gridCols) { triggerSound('lose'); setFailureMsg("Fell off!"); setSuccess(false); setHearts(p => Math.max(0, p - 1)); setIsPlaying(false); executionTimerRef.current.slice(idx + 1).forEach(clearTimeout); return; }
            pos = { r: pos.r, c: nc3 }; setPlayerPos(pos); triggerSound('step');
          } else {
            const dirs: Direction[] = ['up', 'right', 'down', 'left'];
            dir = dirs[(dirs.indexOf(dir) + 1) % 4]; setPlayerDir(dir); triggerSound('step');
          }
        } else if (cmd === 'pickup') {
          if (level.starPos && pos.r === level.starPos.r && pos.c === level.starPos.c) { starPicked = true; setCollectedStar(true); triggerSound('pickup'); }
          else triggerSound('lose');
        }

        if (idx === active.length - 1) {
          setTimeout(() => {
            const atFlag = pos.r === level.flagPos.r && pos.c === level.flagPos.c;
            const starOk = level.starPos ? starPicked : true;
            if (atFlag && starOk) { triggerSound('win'); setSuccess(true); }
            else {
              triggerSound('lose');
              setFailureMsg(atFlag && !starOk ? "Forgot the star! ⭐" : "Didn't reach the flag.");
              setSuccess(false); setHearts(p => Math.max(0, p - 1));
            }
            setIsPlaying(false);
          }, 600);
        }
      }, (idx + 1) * 700);
      executionTimerRef.current.push(t);
    });
  };

  // ── Level success handler ──
  const handleLevelSuccessContinue = () => {
    triggerSound('tap');
    if (currentLevelIdx === 0) {
      // Demo done → go to Lesson 1
      setCurrentLevelIdx(1);
    } else if (currentLevelIdx === 1) {
      // Lesson 1 done → award 50 stars, unlock level 3, return to map
      setLevelStates(prev => ({ ...prev, level2: 'completed', level3: 'unlocked' }));
      setStars(prev => prev + 50);
      triggerFlyingStars(2, 3);
      setView('map');
    }
  };

  const fillHint = () => {
    triggerSound('hint');
    const nc = Array(commands.length).fill(null);
    level.hints.forEach((h, i) => { if (i < nc.length) nc[i] = h as CommandType; });
    setCommands(nc);
  };

  // ════════════════════════════════════════════════════════════
  //  VIEW: MAP
  // ════════════════════════════════════════════════════════════
  if (view === 'map') {
    return (
      <main className="min-h-screen relative w-full flex flex-col items-center bg-gradient-to-b from-sky-100 via-blue-50 to-yellow-50 font-sans select-none">

        {/* Flying star particles */}
        {flyingStars.map(fs => (
          <FlyingStarParticle
            key={fs.id}
            fromX={fs.fromX}
            fromY={fs.fromY}
            targetRef={starPillRef}
          />
        ))}

        {/* ── Header ── */}
        <header className="w-full max-w-lg  flex items-center justify-between px-4 py-3 mt-2">
          <button className="w-9 h-9 flex items-center justify-center rounded-2xl bg-white/80 border border-slate-200 shadow-sm text-slate-500 hover:bg-white transition-all active:scale-95">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <h1 className="text-[15px] font-black text-slate-800 tracking-tight">Programming Basics</h1>
          <div
            ref={starPillRef}
            className={`flex items-center gap-1.5 bg-white border border-amber-200 rounded-2xl px-3 py-1.5 shadow-sm transition-transform ${headerBounce ? 'scale-125' : 'scale-100'}`}
            style={{ transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-black text-amber-600 tabular-nums">{visualStars}</span>
          </div>
        </header>

        {/* ── Map card ── */}
        <div
          ref={mapContainerRef}
          className="relative w-full max-w-lg mx-4 rounded-[28px] overflow-hidden shadow-2xl border-2 border-white/60 mb-24"
          style={{ height: 520 }}
        >
          {/* Background image */}
          <img
            src="/images/map_bg.png"
            alt="Map background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient overlay top & bottom for depth */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-sky-200/30 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-green-900/30 to-transparent pointer-events-none" />

          {/* ── SVG path ── */}
          <svg
            viewBox="0 0 100 90"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            {/* Shadow stroke */}
            <path d={PATH_D} fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="5" strokeLinecap="round" />
            {/* Main path */}
            <path d={PATH_D} fill="none" stroke="#b0bec5" strokeWidth="4" strokeLinecap="round" />
            {/* Dashed center highlight */}
            <path d={PATH_D} fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3,5" opacity="0.7" />
          </svg>

          {/* ── Level nodes ── */}
          {MAP_NODES.map((node, nodeIndex) => {
            const status = levelStates[node.key] || 'locked';
            const isNext = status === 'unlocked';
            const isDone = status === 'completed';
            const isLocked = status === 'locked';

            return (
              <div
                key={node.id}
                className="absolute flex items-center gap-2"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* ── Circular node button ── */}
                <button
                  onClick={() => {
                    if (isLocked) return;
                    triggerSound('tap');
                    if (node.id === 1) { setView('lesson1_theory'); setCurrentSlide(0); }
                    else if (node.id === 2) { setView('game'); setCurrentLevelIdx(0); }
                  }}
                  className={`
                    relative flex items-center justify-center rounded-full font-black text-white
                    transition-all duration-150 active:scale-95
                    ${isLocked
                      ? 'w-12 h-12 bg-slate-400 border-b-[4px] border-slate-500 cursor-not-allowed shadow-md'
                      : isDone
                        ? 'min-w-14 min-h-14 bg-[#58cc02] border-b-[5px] border-[#3ea800] hover:bg-[#65e002] shadow-[0_4px_14px_rgba(88,204,2,0.45)] cursor-pointer'
                        : 'min-w-14 min-h-14 bg-[#58cc02] border-b-[5px] border-[#3ea800] hover:bg-[#65e002] shadow-[0_4px_14px_rgba(88,204,2,0.45)] cursor-pointer ring-4 ring-[#58cc02]/30'
                    }
                  `}
                >
                  {isLocked
                    ? <Lock className="w-5 h-5 text-white" />
                    : <span className="text-xl">{node.id}</span>
                  }

                  {/* Pulse ring for active node */}
                  {isNext && (
                    <span className="absolute inset-0 rounded-full bg-[#58cc02]/30 animate-ping" />
                  )}
                </button>

                {/* ── Label capsule (right side) ── */}
                <div
                  className={`
                    flex flex-col px-3 py-1.5 rounded-2xl shadow-md border
                    ${isDone
                      ? 'bg-white border-slate-200'
                      : isNext
                        ? 'bg-[#d7f5c5] border-[#58cc02]/40'
                        : 'bg-white/80 border-slate-200'
                    }
                  `}
                  style={{ minWidth: 110, maxWidth: 140 }}
                >
                  <span className={`text-[12px] font-black leading-tight ${isLocked ? 'text-slate-400' : isDone ? 'text-slate-700' : 'text-[#3a9900]'}`}>
                    {node.name}
                  </span>
                  {isDone && (
                    <div className="flex gap-0.5 mt-0.5">
                      {[0, 1, 2].map(i => (
                        <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* ── Mascot bottom right ── */}
          <div className="absolute -bottom-6 -left-4 w-40 h-40 pointer-events-none z-10">
            <img src="/images/bulb_mascot.png" alt="Mascot" className="w-full h-full object-contain drop-shadow-lg" />
          </div>
        </div>

        {/* ── Bottom Navigation Bar ── */}
        <nav className="fixed bottom-0 w-full max-w-lg gap-6 mx-auto rounded-xl bottom-5 bg-white border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex justify-around items-center py-2 px-4 z-50">
          {[
            { icon: <Home className="w-5 h-5" />, label: 'Home', active: false },
            { icon: <BookOpen className="w-5 h-5" />, label: 'Learn', active: true },
            { icon: <Star className="w-5 h-5" />, label: 'Challenges', active: false },
            { icon: <Trophy className="w-5 h-5" />, label: 'Badges', active: false },
            { icon: <User className="w-5 h-5" />, label: 'Profile', active: false },
          ].map(item => (
            <button
              key={item.label}
              onClick={() => triggerSound('tap')}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all ${item.active
                ? 'text-[#58cc02]'
                : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              <span className={item.active ? 'text-[#58cc02]' : 'text-slate-400'}>{item.icon}</span>
              <span className={`text-[9px] font-bold tracking-wide ${item.active ? 'text-[#58cc02]' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </main>
    );
  }

  // ════════════════════════════════════════════════════════════
  //  VIEW: LESSON 1 THEORY SLIDES
  // ════════════════════════════════════════════════════════════
  if (view === 'lesson1_theory') {
    const slide = THEORY_SLIDES[currentSlide];
    const progress = ((currentSlide + 1) / THEORY_SLIDES.length) * 100;
    const total = THEORY_SLIDES.length;

    return (
      <main className="min-h-screen max-w-lg mx-auto bg-white font-sans flex flex-col" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

        {/* ── Top bar: back arrow | progress | hearts ── */}
        <header className="flex items-center justify-between px-5 pt-5 pb-3">
          <button
            onClick={() => { triggerSound('tap'); if (confirm("Exit lesson? Progress will be lost.")) setView('map'); }}
            className="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded-xl transition-all active:scale-95 cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          </button>

          <div className="flex items-center gap-2 flex-grow mx-3">
            <div className="flex-grow h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #58cc02, #89e219)' }}
              />
            </div>
            <span className="text-[11px] font-black text-slate-400 tabular-nums whitespace-nowrap">
              {currentSlide + 1}/{total}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-rose-50 border border-rose-100 rounded-xl px-3 py-1.5">
            <span className="text-sm">❤️</span>
            <span className="text-sm font-black text-rose-500">{hearts}</span>
          </div>
        </header>

        {/* ── Slide body ── */}
        <div className="flex-grow flex flex-col px-5 pt-4 pb-6 overflow-y-auto">

          {slide.showCommandsIllustration ? (
            /* ── Slide 2: title + mascot side by side, then command pills ── */
            <>
              <div className="flex items-start gap-3 mb-6">
                <div className="flex-grow">
                  <h2 className="text-[26px] font-black text-slate-900 leading-tight mb-3">{slide.title}</h2>
                  <p className="text-[14px] text-slate-600 leading-relaxed">{slide.text}</p>
                </div>
                <div className="flex-shrink-0 w-[110px] h-[130px] flex items-center justify-center">
                  <img src="/images/bulb_mascot.png" alt="Mascot" className="w-full h-full object-contain drop-shadow-md" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  { icon: '↑', label: 'Go Straight' },
                  { icon: '←', label: 'Turn Left' },
                  { icon: '✋', label: 'Pick Up' },
                  { icon: '↓', label: 'Put Down' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3 bg-white border-2 border-[#d7f5c5] rounded-2xl px-4 py-3 shadow-sm">
                    <div className="w-9 h-9 rounded-xl bg-[#58cc02] flex items-center justify-center text-white font-black text-lg shadow-sm flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-[14px] font-bold text-slate-800">{item.label}</span>
                  </div>
                ))}
              </div>

              <p className="text-[13px] font-semibold text-slate-500 text-center mt-5">
                The computer follows your commands exactly!
              </p>
            </>
          ) : slide.isEnd ? (
            /* ── End slide: mascot centered ── */
            <div className="flex flex-col items-center text-center gap-4">
              <img src="/images/bulb_mascot.png" alt="🎉" className="w-32 h-32 object-contain animate-bounce" />
              <h2 className="text-[26px] font-black text-slate-900 leading-tight">{slide.title}</h2>
              <p className="text-[14px] text-slate-600 leading-relaxed">{slide.text}</p>
              {slide.instruction && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-4 py-3 w-full">
                  <p className="text-[12px] font-bold text-indigo-600">{slide.instruction}</p>
                </div>
              )}
            </div>
          ) : slide.hasQuiz && slide.options ? (
            /* ── Quiz slide ── */
            <div className="flex flex-col gap-4">
              <h2 className="text-[22px] font-black text-slate-900 leading-tight">{slide.title}</h2>
              <p className="text-[14px] text-slate-600">{slide.text}</p>
              <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest mt-1">{slide.question}</p>
              <div className="flex flex-col gap-3">
                {slide.options.map((opt, idx) => {
                  const isSel = selectedQuizOption === idx;
                  const checked = quizAnswerChecked;
                  let borderCls = 'border-slate-200 bg-white text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/30';
                  let iconBg = 'bg-slate-100'; let iconColor = 'text-slate-400';

                  if (isSel && !checked) {
                    borderCls = 'border-indigo-400 bg-indigo-50 text-indigo-800 ring-2 ring-indigo-100';
                    iconBg = 'bg-indigo-500'; iconColor = 'text-white';
                  } else if (isSel && checked) {
                    if (opt.isCorrect) { borderCls = 'border-[#58cc02] bg-[#d7f5c5] text-[#2d7a00]'; iconBg = 'bg-[#58cc02]'; iconColor = 'text-white'; }
                    else { borderCls = 'border-[#ff4b4b] bg-[#ffdfe0] text-[#cc2b2b]'; iconBg = 'bg-[#ff4b4b]'; iconColor = 'text-white'; }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={checked}
                      onClick={() => { triggerSound('tap'); setSelectedQuizOption(idx); }}
                      className={`flex items-start gap-3 w-full text-left p-4 border-2 border-b-4 rounded-2xl transition-all shadow-sm cursor-pointer ${borderCls}`}
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-[11px] flex-shrink-0 mt-0.5 ${iconBg} ${iconColor}`}>
                        {['A', 'B', 'C'][idx]}
                      </span>
                      <span className="text-[13px] font-semibold leading-snug flex-grow">{opt.text}</span>
                      {isSel && checked && <span className="flex-shrink-0 text-lg mt-0.5">{opt.isCorrect ? '✓' : '✗'}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* ── Plain text slide ── */
            <div className="flex flex-col gap-4">
              <h2 className="text-[26px] font-black text-slate-900 leading-tight">{slide.title}</h2>
              <p className="text-[14px] text-slate-600 leading-relaxed">{slide.text}</p>
              {slide.instruction && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-4 py-3">
                  <p className="text-[12px] font-bold text-indigo-600 text-center">{slide.instruction}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Bottom button (always docked at the very bottom) ── */}
        <div className="px-5 pb-8 pt-3 bg-white border-t border-slate-50">
          {slide.hasQuiz && !quizAnswerChecked ? (
            <button
              disabled={selectedQuizOption === null}
              onClick={() => {
                if (selectedQuizOption === null) return;
                setQuizAnswerChecked(true);
                const correct = slide.options![selectedQuizOption].isCorrect;
                if (correct) triggerSound('win');
                else {
                  triggerSound('lose');
                  setHearts(p => { const nv = Math.max(0, p - 1); if (nv === 0) setShowOutOfHeartsModal(true); return nv; });
                }
              }}
              className={`w-full py-4 rounded-2xl font-black text-[15px] text-white border-b-4 transition-all active:translate-y-0.5 shadow-lg ${selectedQuizOption === null
                ? 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-[#7c3aed] border-[#5b21b6] hover:bg-[#6d28d9] cursor-pointer'
                }`}
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={() => {
                triggerSound('tap');
                setSelectedQuizOption(null);
                setQuizAnswerChecked(false);
                if (slide.isEnd) {
                  setLevelStates(prev => ({ ...prev, level1: 'completed', level2: 'unlocked' }));
                  setStars(prev => prev + 25);
                  setView('map');
                  setTimeout(() => triggerFlyingStars(1, 3), 100);
                } else {
                  setCurrentSlide(p => p + 1);
                }
              }}
              className="w-full py-4 rounded-2xl font-black text-[15px] text-white border-b-4 bg-[#7c3aed] border-[#5b21b6] hover:bg-[#6d28d9] shadow-lg active:translate-y-0.5 transition-all cursor-pointer"
            >
              Continue
            </button>
          )}
        </div>

        {/* ── Out of hearts modal ── */}
        {showOutOfHeartsModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-sm bg-white rounded-3xl p-6 text-center shadow-2xl">
              <span className="text-5xl block mb-3">💔</span>
              <h3 className="text-lg font-black text-slate-800 mb-2">Out of Hearts!</h3>
              <p className="text-sm text-slate-500 mb-6">Refill hearts using stars, or return to the map.</p>
              <div className="flex flex-col gap-2">
                <button
                  disabled={stars < 50}
                  onClick={() => { if (stars >= 50) { triggerSound('tap'); setStars(p => p - 50); setHearts(5); setShowOutOfHeartsModal(false); setSelectedQuizOption(null); setQuizAnswerChecked(false); } }}
                  className={`w-full py-3 rounded-2xl font-black text-sm border-b-4 ${stars >= 50 ? 'bg-amber-500 border-amber-700 text-white cursor-pointer hover:bg-amber-400' : 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed'}`}
                >
                  Refill Hearts (50 ⭐)
                </button>
                <button onClick={() => { triggerSound('tap'); setShowOutOfHeartsModal(false); setView('map'); }} className="w-full py-3 rounded-2xl font-black text-sm border-b-4 bg-white border-slate-200 text-slate-600 cursor-pointer hover:bg-slate-50">
                  Return to Map
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    );
  }

  // ════════════════════════════════════════════════════════════
  //  VIEW: GAME
  // ════════════════════════════════════════════════════════════
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-sky-100 via-blue-50 to-yellow-50 font-sans flex flex-col items-center py-2 px-3">
      {/* Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-150px] w-[200px] h-[80px] bg-white opacity-40 blur-[2px] rounded-full animate-float-slow" />
        <div className="absolute top-[30%] right-[-180px] w-[250px] h-[90px] bg-white opacity-50 blur-[1px] rounded-full animate-float-medium" />
      </div>

      {success === true && <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-50" />}

      <div className="relative w-full max-w-xl flex flex-col z-10">

        {/* ── Game Header ── */}
        <header className="flex items-center justify-between gap-3 mb-2 w-full bg-white/95 backdrop-blur shadow-sm border border-slate-100 rounded-2xl p-2.5">
          <button
            onClick={() => { triggerSound('tap'); setView('map'); }}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          <div className="flex-grow">
            <div className="flex justify-between items-center mb-1 px-1">
              <span className={`text-[10px] font-bold tracking-wide uppercase ${level.isDemo ? 'text-amber-500' : 'text-indigo-600'}`}>
                {level.isDemo ? '🎓 ' : ''}{level.name}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {level.isDemo ? 'Practice' : `${currentLevelIdx}/${LEVELS.length - 1}`}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${level.isDemo ? 'bg-amber-400' : 'bg-[#58cc02]'}`}
                style={{ width: level.isDemo ? '50%' : '100%' }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-rose-50 border border-rose-100 rounded-xl px-2.5 py-1.5 text-xs font-black text-rose-500">
              <span>❤️</span><span>{hearts}</span>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 rounded-xl px-2.5 py-1.5 text-xs font-black text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /><span>{visualStars}</span>
            </div>
          </div>
        </header>

        {/* ── Mascot banner ── */}
        <div className="w-full bg-white border border-slate-100 shadow-md rounded-2xl p-3 flex gap-3 items-center mb-2">
          <div className="w-11 h-11 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
            <img src="/images/lumi.png" alt="Lumi" className="w-8 h-8 object-contain" style={{ filter: 'url(#chroma-white)' }} />
          </div>
          <div className="flex-grow">
            <h2 className="text-xs font-extrabold text-slate-800 mb-0.5">{level.subtitle}</h2>
            <p className="text-[10px] text-slate-500 leading-snug">{level.instructions}</p>
          </div>
          <div className="flex flex-col items-center p-2 bg-slate-50 border border-slate-100 rounded-xl flex-shrink-0 min-w-[60px]">
            {level.starPos ? (
              <><img src="/images/star.png" alt="Star" className="w-5 h-5 object-contain animate-bounce" /><span className="text-[9px] font-black text-slate-500 mt-1">{collectedStar ? '1/1' : '0/1'}</span></>
            ) : (
              <><img src="/images/flag.png" alt="Flag" className="w-5 h-5 object-contain" /><span className="text-[9px] font-black text-slate-500 mt-1">{success === true ? '1/1' : '0/1'}</span></>
            )}
          </div>
        </div>

        {/* ── Board ── */}
        <div className="relative w-full bg-white/90 border-2 border-white backdrop-blur shadow-xl rounded-3xl p-3 mb-2 flex flex-col items-center">
          <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10 pointer-events-none">
            <span className={`pointer-events-auto text-white font-black text-[10px] px-3 py-1 rounded-full border-b-4 shadow-md ${level.isDemo ? 'bg-amber-500 border-amber-700' : 'bg-indigo-600 border-indigo-800'}`}>
              Steps left: {commands.filter(c => c === null).length}
            </span>
            <div className="pointer-events-auto flex gap-1.5">
              <button onClick={fillHint} disabled={isPlaying} className="flex items-center gap-1 bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-600 text-[10px] font-bold px-3 py-1 rounded-xl border border-slate-200 hover:border-amber-300 shadow-sm transition-all cursor-pointer disabled:opacity-50">
                💡 Hint
              </button>
              <button onClick={() => { triggerSound('tap'); setSoundEnabled(!soundEnabled); }} className={`w-8 h-8 flex items-center justify-center rounded-xl border shadow-sm transition-all cursor-pointer ${soundEnabled ? 'bg-white border-slate-200 text-slate-600' : 'bg-slate-100 border-slate-300 text-slate-400'}`}>
                {soundEnabled ? '🔊' : '🔇'}
              </button>
            </div>
          </div>

          <div className="w-full flex items-center justify-center py-4 overflow-visible relative">
            {level.isDemo
              ? <DemoPlatform playerPos={playerPos} playerDir={playerDir} isPlaying={isPlaying} executingStep={executingStep} />
              : <Level1Platform playerPos={playerPos} playerDir={playerDir} isPlaying={isPlaying} executingStep={executingStep} collectedStar={collectedStar} />
            }
          </div>

          <div className="w-full mt-1">
            <p className="text-[9px] font-black text-slate-400 tracking-widest uppercase text-center mb-2">Program Slots</p>
            <div className="flex flex-wrap justify-center gap-2">
              {commands.map((cmd, idx) => {
                const active = executingStep === idx && isPlaying;
                return (
                  <div key={idx} className="flex flex-col items-center">
                    <span className="text-[8px] font-black text-slate-400 mb-1">{idx + 1}</span>
                    {cmd ? (
                      <button onClick={() => removeCommand(idx)} disabled={isPlaying || success !== null}
                        className={`w-12 h-12 rounded-xl overflow-hidden transition-all p-0 border-0 bg-transparent cursor-pointer ${active ? 'scale-110 -translate-y-1 drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]' : 'hover:scale-105 active:scale-95'}`}>
                        <img src={COMMAND_DETAILS[cmd].imageSrc} alt={COMMAND_DETAILS[cmd].label} className="w-full h-full object-contain" draggable={false} />
                      </button>
                    ) : (
                      <div className="w-11 h-11 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 flex items-center justify-center">
                        {idx === 0 && commands.filter(c => c !== null).length === 0 && <div className="w-3 h-1 bg-indigo-400 rounded-full animate-ping absolute" />}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Commands ── */}
        <div className="w-full bg-white border border-slate-100 shadow-md rounded-2xl p-2 mb-2">
          <p className="text-[9px] font-black text-slate-400 tracking-widest uppercase text-center mb-2">Available Actions</p>
          <div className="flex justify-between gap-2 px-1">
            {(Object.keys(COMMAND_DETAILS) as CommandType[]).map(type => {
              const d = COMMAND_DETAILS[type];
              const disabled = type === 'pickup' && !level.starPos;
              return (
                <button key={type} onClick={() => addCommand(type)} disabled={isPlaying || success !== null || disabled}
                  className={`flex-1 p-0 rounded-2xl bg-transparent border-0 shadow-lg transition-all cursor-pointer ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}>
                  <img src={d.imageSrc} alt={d.label} className="w-full h-auto object-contain" draggable={false} />
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="w-full flex gap-3 mb-2">
          <button onClick={() => { triggerSound('tap'); resetLevel(); }} className="flex items-center gap-2 justify-center py-3 px-5 rounded-2xl border-2 border-b-4 border-slate-200 hover:bg-slate-50 text-indigo-600 font-extrabold text-sm shadow-sm active:translate-y-0.5 transition-all w-1/3 cursor-pointer">
            🔄 Reset
          </button>
          <button
            onClick={runSequence}
            disabled={isPlaying || success !== null || commands.filter(c => c !== null).length === 0}
            className={`flex-grow flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-b-4 text-white font-extrabold text-sm shadow-md active:translate-y-0.5 transition-all cursor-pointer ${commands.filter(c => c !== null).length === 0 ? 'bg-slate-300 border-slate-400 cursor-not-allowed shadow-none'
              : isPlaying ? 'bg-[#58cc02] border-[#3ea800] animate-pulse'
                : 'bg-[#58cc02] border-[#3ea800] hover:bg-[#65e002]'
              }`}
          >
            {isPlaying ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Executing…</span></> : <><span>▶️</span> Run Program</>}
          </button>
        </footer>

        {/* ── Completion modal ── */}
        {success !== null && (
          <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50 p-4 animate-slide-up">
            <div className={`w-full max-w-md rounded-3xl p-5 shadow-2xl border border-b-8 ${success ? 'bg-[#d7f5c5] border-[#58cc02]' : 'bg-[#ffdfe0] border-[#ff4b4b]'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border-b-4 ${success ? 'bg-white/50 border-[#58cc02]/30' : 'bg-white/50 border-[#ff4b4b]/30'}`}>
                  {success ? '🎉' : '💔'}
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-800">
                    {success ? (currentLevelIdx === 0 ? 'Practice Cleared! 🎯' : 'Awesome Job! 🎉') : hearts <= 0 ? 'Out of Hearts!' : 'Try Again!'}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {success
                      ? currentLevelIdx === 0 ? "Practice done! Now the real test begins." : "Lumi reached the flag successfully!"
                      : hearts <= 0 ? "Refill hearts using stars to continue." : failureMsg || "Lumi didn't reach the flag."}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                {success ? (
                  <button onClick={handleLevelSuccessContinue}
                    className="w-full py-3 bg-[#58cc02] border-b-4 border-[#3ea800] hover:bg-[#65e002] text-white font-extrabold rounded-2xl shadow-md text-sm cursor-pointer transition-all active:translate-y-0.5">
                    {currentLevelIdx === 0 ? 'Start Lesson 1 ➔' : 'Finish Level ➔'}
                  </button>
                ) : hearts <= 0 ? (
                  <>
                    <button
                      disabled={stars < 50}
                      onClick={() => { if (stars >= 50) { triggerSound('tap'); setStars(p => p - 50); setHearts(5); resetLevel(true); } }}
                      className={`w-1/2 py-3 rounded-2xl font-extrabold text-white text-sm border-b-4 transition-all active:translate-y-0.5 ${stars >= 50 ? 'bg-amber-500 border-amber-700 cursor-pointer hover:bg-amber-400' : 'bg-slate-300 border-slate-400 cursor-not-allowed'}`}
                    >Refill (50 ⭐)</button>
                    <button onClick={() => { triggerSound('tap'); setView('map'); }} className="w-1/2 py-3 rounded-2xl font-extrabold text-slate-700 text-sm border-b-4 border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition-all active:translate-y-0.5">
                      Return to Map
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { triggerSound('tap'); resetLevel(true); }} className="w-1/2 py-3 rounded-2xl font-extrabold text-slate-700 text-sm border-2 border-b-4 border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition-all active:translate-y-0.5">Retry</button>
                    <button onClick={() => { triggerSound('tap'); resetLevel(false); }} className="w-1/2 py-3 bg-[#ff4b4b] border-b-4 border-[#cc2b2b] text-white font-extrabold rounded-2xl text-sm cursor-pointer transition-all active:translate-y-0.5">Clear & Restart</button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <filter id="chroma-white" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 -2 -2 -2 6 -0.05" />
          </filter>
        </defs>
      </svg>
    </main>
  );
}

// ════════════════════════════════════════════════════════════
//  Flying Star Component
// ════════════════════════════════════════════════════════════
function FlyingStarParticle({
  fromX,
  fromY,
  targetRef,
}: {
  fromX: number;
  fromY: number;
  targetRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [pos, setPos] = useState({ x: fromX, y: fromY, opacity: 1, scale: 1 });

  useEffect(() => {
    const rect = targetRef.current?.getBoundingClientRect();
    if (!rect) return;
    const toX = rect.left + rect.width / 2;
    const toY = rect.top + rect.height / 2;

    const duration = 800;
    const start = performance.now();

    const animate = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setPos({
        x: fromX + (toX - fromX) * ease,
        y: fromY + (toY - fromY) * ease,
        opacity: t > 0.7 ? 1 - (t - 0.7) / 0.3 : 1,
        scale: 1 - t * 0.4,
      });
      if (t < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [fromX, fromY, targetRef]);

  return (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: pos.x,
        top: pos.y,
        transform: `translate(-50%, -50%) scale(${pos.scale})`,
        opacity: pos.opacity,
      }}
    >
      <Star className="w-6 h-6 text-amber-400 fill-amber-400 drop-shadow-lg" />
    </div>
  );
}