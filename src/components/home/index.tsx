'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

import { LEVELS, Position, Direction, Obstacle } from '../../config/levels';
import { DemoPlatform } from './demo';
import { Level1Platform } from './level1';

type CommandType = 'straight' | 'left' | 'right' | 'pickup' | 'back';

interface CommandInfo {
  type: CommandType;
  label: string;
  imageSrc: string;
}

const COMMAND_DETAILS: Record<CommandType, CommandInfo> = {
  straight: {
    type: 'straight',
    label: 'Go Straight',
    imageSrc: '/images/moves/Go straight.png',
  },
  left: {
    type: 'left',
    label: 'Turn Left',
    imageSrc: '/images/moves/Turn left.png',
  },
  right: {
    type: 'right',
    label: 'Turn Right',
    imageSrc: '/images/moves/Turn right.png',
  },
  pickup: {
    type: 'pickup',
    label: 'Pick Up',
    imageSrc: '/images/moves/Pick up.png',
  },
  back: {
    type: 'back',
    label: 'Go Back',
    imageSrc: '/images/moves/Go back.png',
  },
};

export default function Home() {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(1);
  const level = LEVELS[currentLevelIdx];
  const dims = level.dimensions;

  // Game States
  const [commands, setCommands] = useState<(CommandType | null)[]>(Array(5).fill(null));
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerPos, setPlayerPos] = useState<Position>({ r: 0, c: 0 });
  const [playerDir, setPlayerDir] = useState<Direction>('up');
  const [collectedStar, setCollectedStar] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [executingStep, setExecutingStep] = useState<number | null>(null);
  const [failureMsg, setFailureMsg] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showHint, setShowHint] = useState(false);

  // Stats
  const [hearts, setHearts] = useState(5);
  const [stars, setStars] = useState(120);

  // References
  const executionTimerRef = useRef<NodeJS.Timeout[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize level state
  const resetLevel = useCallback((keepCommands = false) => {
    // Clear any active timers
    executionTimerRef.current.forEach(clearTimeout);
    executionTimerRef.current = [];

    setPlayerPos({ ...level.startPos });
    setPlayerDir(level.startDir);
    setCollectedStar(false);
    setSuccess(null);
    setExecutingStep(null);
    setIsPlaying(false);
    setFailureMsg('');
    setShowHint(false);

    if (!keepCommands) {
      const slotCount = level.maxSlots;
      setCommands(Array(slotCount).fill(null));
    }
  }, [level, currentLevelIdx]);

  useEffect(() => {
    resetLevel();
  }, [currentLevelIdx, resetLevel]);

  // Sound Synthesizer (Web Audio API)
  const triggerSound = useCallback((type: 'tap' | 'step' | 'pickup' | 'win' | 'lose' | 'hint') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const playTone = (freq: number, duration: number, oscType: OscillatorType = 'sine', startTime = 0) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = oscType;
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(0.12, ctx.currentTime + startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + startTime);
        osc.stop(ctx.currentTime + startTime + duration);
      };

      switch (type) {
        case 'tap':
          playTone(600, 0.08, 'triangle');
          break;
        case 'step':
          playTone(200, 0.06, 'sine');
          playTone(220, 0.06, 'sine', 0.04);
          break;
        case 'pickup':
          playTone(523.25, 0.1, 'sine');
          playTone(659.25, 0.1, 'sine', 0.06);
          playTone(783.99, 0.1, 'sine', 0.12);
          playTone(1046.50, 0.25, 'sine', 0.18);
          break;
        case 'win':
          [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
            playTone(f, 0.18, 'triangle', i * 0.07);
          });
          break;
        case 'lose':
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(220, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.4);

          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.4);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.4);
          break;
        case 'hint':
          playTone(440, 0.1, 'sine');
          playTone(554.37, 0.15, 'sine', 0.05);
          break;
      }
    } catch (e) {
      console.warn("Audio Context blocked or failed:", e);
    }
  }, [soundEnabled]);

  // Confetti particles loop for success celebrating
  useEffect(() => {
    if (success !== true) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#FFC107', '#FF5722', '#E91E63', '#9C27B0', '#3F51B5', '#00BCD4', '#4CAF50', '#8BC34A'];
    interface Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
    }

    const particles: Particle[] = Array.from({ length: 120 }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 100,
      y: canvas.height + 20,
      size: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 12,
      speedY: -Math.random() * 15 - 10,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
    }));

    let animId: number;
    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.35;
        p.rotation += p.rotationSpeed;

        if (p.y < canvas.height + 20) {
          alive = true;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      if (alive) {
        animId = requestAnimationFrame(update);
      }
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [success]);

  // Handle Command selection / placement
  const addCommand = (type: CommandType) => {
    if (isPlaying || success !== null) return;
    triggerSound('tap');

    const emptyIndex = commands.findIndex(c => c === null || c === undefined);
    if (emptyIndex !== -1) {
      const newCommands = [...commands];
      newCommands[emptyIndex] = type;
      setCommands(newCommands);
    }
  };

  const removeCommand = (index: number) => {
    if (isPlaying || success !== null) return;
    triggerSound('tap');

    const newCommands = [...commands];
    newCommands[index] = null;
    setCommands(newCommands);
  };

  // Run the commands sequence step-by-step
  const runSequence = () => {
    if (isPlaying || success !== null) return;

    const activeCommands = commands.filter((c): c is CommandType => c !== null);
    if (activeCommands.length === 0) return;

    setIsPlaying(true);
    setExecutingStep(0);

    let currentPos = { ...level.startPos };
    let currentDir = level.startDir;
    let currentStarCollected = false;

    activeCommands.forEach((cmd, idx) => {
      const timer = setTimeout(() => {
        setExecutingStep(idx);

        if (cmd === 'straight' || cmd === 'back') {
          const moveDir = cmd === 'straight' ? 1 : -1;
          let nextR = currentPos.r;
          let nextC = currentPos.c;

          switch (currentDir) {
            case 'up':
              nextR -= moveDir;
              break;
            case 'right':
              nextC += moveDir;
              break;
            case 'down':
              nextR += moveDir;
              break;
            case 'left':
              nextC -= moveDir;
              break;
          }

          // Check out of bounds on the 5x4 board
          if (nextR < 0 || nextR >= level.gridRows || nextC < 0 || nextC >= level.gridCols) {
            triggerSound('lose');
            setFailureMsg("Oh no! Lumi fell off the platform!");
            setSuccess(false);
            setHearts((prev) => Math.max(0, prev - 1));
            setIsPlaying(false);
            executionTimerRef.current.slice(idx + 1).forEach(clearTimeout);
            return;
          }

          // Check obstacle collision
          const collides = level.obstacles.find((o) => o.r === nextR && o.c === nextC);
          if (collides) {
            triggerSound('lose');
            setFailureMsg(`Crash! Lumi ran into a rock or tree!`);
            setSuccess(false);
            setHearts((prev) => Math.max(0, prev - 1));
            setIsPlaying(false);
            executionTimerRef.current.slice(idx + 1).forEach(clearTimeout);
            return;
          }

          currentPos = { r: nextR, c: nextC };
          setPlayerPos(currentPos);
          triggerSound('step');
        } else if (cmd === 'left') {
          if (level.isDemo) {
            // Demo mode: left = move left (col - 1)
            const nextC = currentPos.c - 1;
            if (nextC < 0) {
              triggerSound('lose');
              setFailureMsg("Oh no! Lumi fell off the platform!");
              setSuccess(false);
              setHearts((prev) => Math.max(0, prev - 1));
              setIsPlaying(false);
              executionTimerRef.current.slice(idx + 1).forEach(clearTimeout);
              return;
            }
            currentPos = { r: currentPos.r, c: nextC };
            setPlayerPos(currentPos);
            triggerSound('step');
          } else {
            const dirs: Direction[] = ['up', 'left', 'down', 'right'];
            const currentIdx = dirs.indexOf(currentDir);
            currentDir = dirs[(currentIdx + 1) % 4];
            setPlayerDir(currentDir);
            triggerSound('step');
          }
        } else if (cmd === 'right') {
          if (level.isDemo) {
            // Demo mode: right = move right (col + 1)
            const nextC = currentPos.c + 1;
            if (nextC >= level.gridCols) {
              triggerSound('lose');
              setFailureMsg("Oh no! Lumi fell off the platform!");
              setSuccess(false);
              setHearts((prev) => Math.max(0, prev - 1));
              setIsPlaying(false);
              executionTimerRef.current.slice(idx + 1).forEach(clearTimeout);
              return;
            }
            currentPos = { r: currentPos.r, c: nextC };
            setPlayerPos(currentPos);
            triggerSound('step');
          } else {
            const dirs: Direction[] = ['up', 'right', 'down', 'left'];
            const currentIdx = dirs.indexOf(currentDir);
            currentDir = dirs[(currentIdx + 1) % 4];
            setPlayerDir(currentDir);
            triggerSound('step');
          }
        } else if (cmd === 'pickup') {
          if (level.starPos && currentPos.r === level.starPos.r && currentPos.c === level.starPos.c) {
            currentStarCollected = true;
            setCollectedStar(true);
            triggerSound('pickup');
          } else {
            triggerSound('lose');
          }
        }

        if (idx === activeCommands.length - 1) {
          setTimeout(() => {
            const reachedFlag = currentPos.r === level.flagPos.r && currentPos.c === level.flagPos.c;
            const starRequirementMet = level.starPos ? currentStarCollected : true;

            if (reachedFlag && starRequirementMet) {
              triggerSound('win');
              setSuccess(true);
              setStars((prev) => prev + 25);
            } else {
              triggerSound('lose');
              if (reachedFlag && !starRequirementMet) {
                setFailureMsg("You reached the flag, but forgot to pick up the star! ⭐️");
              } else {
                setFailureMsg("Lumi completed the path but didn't reach the flag.");
              }
              setSuccess(false);
              setHearts((prev) => Math.max(0, prev - 1));
            }
            setIsPlaying(false);
          }, 600);
        }
      }, (idx + 1) * 700);

      executionTimerRef.current.push(timer);
    });
  };

  const loadNextLevel = () => {
    if (currentLevelIdx < LEVELS.length - 1) {
      setCurrentLevelIdx((prev) => prev + 1);
    } else {
      alert("🎉 Incredible! You've completed all levels!");
      setCurrentLevelIdx(0);
    }
  };

  const fillHint = () => {
    triggerSound('hint');
    setShowHint(true);
    const newCmds = Array(commands.length).fill(null);
    level.hints.forEach((hintCmd, i) => {
      if (i < newCmds.length) {
        newCmds[i] = hintCmd as CommandType;
      }
    });
    setCommands(newCmds);
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#e0f2fe] via-[#f0f9ff] to-[#fffde7] font-sans flex flex-col items-center py-2 px-3">
      {/* Floating Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-150px] w-[200px] h-[80px] bg-white opacity-40 blur-[2px] rounded-full animate-float-slow"></div>
        <div className="absolute top-[25%] right-[-180px] w-[250px] h-[90px] bg-white opacity-55 blur-[1px] rounded-full animate-float-medium"></div>
        <div className="absolute top-[45%] left-[-220px] w-[300px] h-[100px] bg-white opacity-30 blur-[3px] rounded-full animate-float-fast"></div>
      </div>

      {/* Confetti Overlay */}
      {success === true && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-50" />
      )}

      {/* Game UI Container */}
      <div className="relative w-full max-w-xl flex flex-col  z-10">

        {/* Game Header */}
        <header className="flex items-center justify-between gap-3 mb-2 w-full bg-white/95 backdrop-blur shadow-sm border border-slate-100 rounded-2xl p-2.5">
          <button
            onClick={() => { triggerSound('tap'); resetLevel(); }}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 shadow-sm active:scale-95 transition-all"
            title="Reset Lesson"
          >
            <span className="text-xl">❮</span>
          </button>

          <div className="flex-grow">
            <div className="flex justify-between items-center mb-1 px-1">
              <span className={`text-xs font-bold tracking-wide uppercase ${level.isDemo ? 'text-amber-500' : 'text-indigo-600'}`}>
                {level.isDemo ? '🎓 ' : ''}{level.name}
              </span>
              <span className="text-xs font-medium text-slate-400">
                {level.isDemo ? 'Practice Round' : `${currentLevelIdx} / ${LEVELS.length - 1}`}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-[1px]">
              <div
                className={`h-full rounded-full transition-all duration-500 shadow-inner ${level.isDemo ? 'bg-gradient-to-r from-amber-400 to-yellow-400' : 'bg-gradient-to-r from-emerald-400 to-green-500'}`}
                style={{ width: level.isDemo ? '0%' : `${((currentLevelIdx - 1 + (success === true ? 1 : 0)) / (LEVELS.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-rose-50 border border-rose-100 rounded-xl px-2.5 py-1.5 shadow-sm text-sm font-bold text-rose-500">
              <span className="text-lg">❤️</span>
              <span>{hearts}</span>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 rounded-xl px-2.5 py-1.5 shadow-sm text-sm font-bold text-amber-500 animate-pulse">
              <span className="text-lg">⭐</span>
              <span>{stars}</span>
            </div>
          </div>
        </header>

        {/* Mascot banner instructions */}
        <div className="w-full bg-white border border-slate-100 shadow-md rounded-2xl p-3 flex gap-3 items-center mb-2 transition-all duration-300">
          <div className="relative w-12 h-12 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-xl flex items-center justify-center border-b-3 border-yellow-500 shadow-md flex-shrink-0">
            <img src="/images/lumi.png" alt="Lumi" className="w-9 h-9 object-contain" style={{ filter: 'url(#chroma-white)' }} />
          </div>
          <div className="flex-grow">
            <h2 className="text-sm font-extrabold text-slate-800 leading-tight mb-0.5">{level.subtitle}</h2>
            <p className="text-[11px] text-slate-500 leading-snug font-medium">{level.instructions}</p>
          </div>
          {/* Target displays */}
          <div className="flex flex-col items-center justify-center p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex-shrink-0 min-w-[70px]">
            {level.starPos ? (
              <>
                <img src="/images/star.png" alt="Star" className="w-6 h-6 object-contain animate-bounce" />
                <span className="text-[10px] font-black text-slate-500 mt-1 uppercase tracking-wide">
                  {collectedStar ? '1 / 1' : '0 / 1'}
                </span>
              </>
            ) : (
              <>
                <img src="/images/flag.png" alt="Flag" className="w-6 h-6 object-contain" />
                <span className="text-[10px] font-black text-slate-500 mt-1 uppercase tracking-wide">
                  {success === true ? '1 / 1' : '0 / 1'}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Board Arena container */}
        <div className="relative w-full bg-white/90 border-2 border-white backdrop-blur shadow-xl rounded-3xl p-3 mb-2 flex flex-col items-center">

          {/* Top Panel stats */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
            <div className={`pointer-events-auto text-white font-black text-xs px-3 py-1.5 rounded-full border-b-4 shadow-md ${level.isDemo
              ? 'bg-amber-500 border-amber-700'
              : 'bg-indigo-600 border-indigo-800'
              }`}>
              Steps left: {commands.filter(c => c === null).length}
            </div>

            <div className="pointer-events-auto flex gap-1.5">
              <button
                onClick={fillHint}
                disabled={isPlaying}
                className="flex items-center gap-1 bg-white hover:bg-amber-50 disabled:opacity-50 text-slate-700 hover:text-amber-600 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 hover:border-amber-300 shadow-sm active:translate-y-0.5 transition-all"
              >
                <span>💡</span> Hint
              </button>
              <button
                onClick={() => { triggerSound('tap'); setSoundEnabled(!soundEnabled); }}
                className={`w-8 h-8 flex items-center justify-center rounded-xl border shadow-sm transition-all active:translate-y-0.5 ${soundEnabled
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  : 'bg-slate-100 border-slate-300 text-slate-400 hover:bg-slate-200'
                  }`}
                title={soundEnabled ? "Mute sounds" : "Unmute sounds"}
              >
                <span>{soundEnabled ? '🔊' : '🔇'}</span>
              </button>
            </div>
          </div>

          {/* ── Platform-based Levels: 2×2 or 3×3 ── */}
          <div className="w-full flex items-center justify-center py-4 overflow-visible relative">
            {level.isDemo ? (
              <DemoPlatform
                playerPos={playerPos}
                playerDir={playerDir}
                isPlaying={isPlaying}
                executingStep={executingStep}
              />
            ) : (
              <Level1Platform
                playerPos={playerPos}
                playerDir={playerDir}
                isPlaying={isPlaying}
                executingStep={executingStep}
                collectedStar={collectedStar}
              />
            )}
          </div>

          {/* Program slots placement row */}
          <div className="w-full mt-1">
            <p className="text-[11px] font-black text-slate-400 tracking-wider uppercase text-center mb-2.5">Program Slots</p>
            <div className="flex flex-wrap justify-center gap-2 px-1">
              {commands.map((cmd, idx) => {
                const active = executingStep === idx && isPlaying;

                return (
                  <div key={idx} className="flex flex-col items-center">
                    <span className="text-[9px] font-black text-slate-400 mb-1">{idx + 1}</span>

                    {cmd ? (
                      <button
                        onClick={() => removeCommand(idx)}
                        disabled={isPlaying || success !== null}
                        className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all overflow-hidden p-0 border-0 bg-transparent ${active
                          ? 'scale-110 -translate-y-1 drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]'
                          : 'hover:scale-105 active:scale-95'
                          }`}
                      >
                        <img
                          src={COMMAND_DETAILS[cmd].imageSrc}
                          alt={COMMAND_DETAILS[cmd].label}
                          className="w-full h-full  object-contain"
                          draggable={false}
                        />
                      </button>
                    ) : (
                      <div className="w-11 h-11 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50/50">
                        {idx === 0 && commands.filter(c => c !== null).length === 0 && (
                          <div className="absolute w-3 h-1 bg-indigo-500 rounded-full animate-ping"></div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Command Library drawer */}
        <div className="w-full bg-white border border-slate-100 shadow-md rounded-2xl p-2 mb-2 select-none">
          <p className="text-[11px] font-black text-slate-400 tracking-wider uppercase text-center mb-2">Available Actions</p>
          <div className="flex justify-between gap-2 px-1">
            {(Object.keys(COMMAND_DETAILS) as CommandType[]).map((type) => {
              const details = COMMAND_DETAILS[type];
              const disabled = type === 'pickup' && !level.starPos;

              return (
                <button
                  key={type}
                  onClick={() => addCommand(type)}
                  disabled={isPlaying || success !== null || disabled}
                  className={`flex-1 p-0 shadow-lg rounded-2xl bg-transparent border-0 outline-none transition-all select-none ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
                    }`}
                >
                  <img
                    src={details.imageSrc}
                    alt={details.label}
                    className="w-full h-auto object-contain"
                    draggable={false}
                  />
                </button>
              );
            })}
          </div>

        </div>

        {/* Control buttons footer */}
        <footer className="w-full flex gap-3 mb-2">
          <button
            onClick={() => { triggerSound('tap'); resetLevel(); }}
            className="flex items-center gap-2 justify-center py-2.5 px-6 rounded-2xl border-2 border-b-4 border-slate-200 border-b-slate-350 hover:bg-slate-50 text-indigo-600 font-extrabold text-base shadow-sm active:translate-y-0.5 transition-all w-1/3"
          >
            <span>🔄</span> Reset
          </button>

          <button
            onClick={runSequence}
            disabled={isPlaying || success !== null || commands.filter(c => c !== null).length === 0}
            className={`flex-grow flex items-center justify-center gap-2 py-2.5 rounded-2xl border-2 border-b-4 text-white font-extrabold text-base shadow-md active:translate-y-0.5 transition-all ${commands.filter(c => c !== null).length === 0
              ? 'bg-slate-300 border-slate-400 border-b-slate-500 cursor-not-allowed shadow-none'
              : isPlaying
                ? 'bg-emerald-400 border-emerald-500 border-b-emerald-600 animate-pulse'
                : 'bg-emerald-500 border-emerald-400 border-b-emerald-700 hover:bg-emerald-400'
              }`}
          >
            {isPlaying ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Executing...</span>
              </>
            ) : (
              <>
                <span>▶️</span> Run Program
              </>
            )}
          </button>
        </footer>

        {/* Game completion status modal */}
        {success !== null && (
          <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center z-45 p-4 select-none">
            <div className={`w-full max-w-md border-b-8 rounded-3xl p-5 shadow-[0_-10px_35px_rgba(0,0,0,0.12)] flex flex-col items-center border border-white/50 ${success
              ? 'bg-[#d7f5c5] border-[#58cc02] text-[#58cc02]'
              : 'bg-[#ffdfe0] border-[#ff4b4b] text-[#ff4b4b]'
              }`}>
              <div className="flex items-center gap-3 w-full mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border-b-4 ${success
                  ? 'bg-emerald-500/10 border-emerald-500/20'
                  : 'bg-rose-500/10 border-rose-500/20'
                  }`}>
                  {success ? '🎉' : '💔'}
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-black leading-tight text-slate-800 font-extrabold">
                    {success ? 'Awesome Job!' : 'Oh No, Try Again!'}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 leading-normal mt-0.5">
                    {success
                      ? 'You successfully guided Lumi to the destination flag!'
                      : failureMsg || 'Lumi did not reach the flag. Adjust your commands.'}
                  </p>
                </div>
              </div>

              <div className="w-full flex gap-3">
                {success ? (
                  <button
                    onClick={() => { triggerSound('tap'); loadNextLevel(); }}
                    className="w-full py-3 bg-[#58cc02] hover:bg-[#61dd03] border-2 border-b-4 border-[#58cc02] border-b-[#46a302] hover:border-b-[#52be02] text-white font-extrabold rounded-2xl shadow-md active:translate-y-0.5 transition-all text-center"
                  >
                    {currentLevelIdx === LEVELS.length - 1 ? 'Start Over' : 'Next Level ➔'}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => { triggerSound('tap'); resetLevel(true); }}
                      className="w-1/2 py-3 bg-white hover:bg-rose-50 border-2 border-b-4 border-slate-200 border-b-slate-350 hover:border-slate-300 text-slate-700 font-extrabold rounded-2xl shadow-sm active:translate-y-0.5 transition-all text-center"
                    >
                      Retry Path
                    </button>
                    <button
                      onClick={() => { triggerSound('tap'); resetLevel(false); }}
                      className="w-1/2 py-3 bg-[#ff4b4b] hover:bg-[#ff5f5f] border-2 border-b-4 border-[#ff4b4b] border-b-[#ea2b2b] hover:border-b-[#f63838] text-white font-extrabold rounded-2xl shadow-md active:translate-y-0.5 transition-all text-center"
                    >
                      Clear & Start
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Chroma Key Filter SVG to key out pure white background of character and star sprites */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <filter id="chroma-white" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="
              1  0  0  0  0
              0  1  0  0  0
              0  0  1  0  0
             -2 -2 -2  6 -0.05
            " />
          </filter>
        </defs>
      </svg>
    </main>
  );
}