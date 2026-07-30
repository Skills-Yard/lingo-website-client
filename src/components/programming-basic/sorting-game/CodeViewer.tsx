'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { CODE_LINES, PYTHON_CODE_LINES } from '@/utils/constants/constants';
import { executeJSCode, executePythonCode } from '@/utils/constants/codeExecutor';
import { SortStep } from '@/utils/types/Sorting';
import { DEFAULT_ARRAY } from '@/utils/constants/constants';

interface CodeViewerProps {
  activeCodeLine: number;
  /** Called when user clicks ▶ Run — passes generated steps to the game */
  onRun?: (steps: SortStep[]) => void;
}

type Lang = 'js' | 'python';

const DEFAULT_CODE: Record<Lang, string> = {
  js: CODE_LINES.join('\n'),
  python: PYTHON_CODE_LINES.join('\n'),
};

const LANG_META: Record<Lang, { label: string; filename: string; accent: string }> = {
  js:     { label: 'JavaScript', filename: 'bubbleSort.js',    accent: 'text-amber-400' },
  python: { label: 'Python',     filename: 'bubble_sort.py',   accent: 'text-sky-400'  },
};

export function CodeViewer({ activeCodeLine, onRun }: CodeViewerProps) {
  const [lang, setLang]         = useState<Lang>('python');
  const [code, setCode]         = useState<Record<Lang, string>>(DEFAULT_CODE);
  const [isEditing, setIsEditing] = useState(false);
  const [runStatus, setRunStatus] = useState<'idle' | 'running' | 'ok' | 'error'>('idle');
  const [errorMsg,  setErrorMsg]  = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumRef  = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);

  const lines = code[lang].split('\n');
  const meta  = LANG_META[lang];

  /* ── sync line-num scroll with textarea ─────────────────────── */
  const syncScroll = useCallback(() => {
    if (textareaRef.current && lineNumRef.current)
      lineNumRef.current.scrollTop = textareaRef.current.scrollTop;
  }, []);

  /* ── auto-scroll active line into view (view mode) ──────────── */
  useEffect(() => {
    if (!isEditing && scrollRef.current && activeCodeLine >= 0) {
      const top = activeCodeLine * 20;
      scrollRef.current.scrollTop = Math.max(0, top - 60);
    }
  }, [activeCodeLine, isEditing]);

  /* ── focus textarea when edit starts ────────────────────────── */
  useEffect(() => {
    if (isEditing && textareaRef.current) textareaRef.current.focus();
  }, [isEditing]);

  /* ── language switch ─────────────────────────────────────────── */
  const handleLangSwitch = (next: Lang) => {
    setIsEditing(false);
    setRunStatus('idle');
    setErrorMsg(null);
    setLang(next);
  };

  /* ── code change ────────────────────────────────────────────── */
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(prev => ({ ...prev, [lang]: e.target.value }));
    setRunStatus('idle');
    setErrorMsg(null);
  };

  /* ── reset code ─────────────────────────────────────────────── */
  const handleReset = () => {
    setCode(prev => ({ ...prev, [lang]: DEFAULT_CODE[lang] }));
    setRunStatus('idle');
    setErrorMsg(null);
  };

  /* ── RUN ────────────────────────────────────────────────────── */
  const handleRun = () => {
    setIsEditing(false);
    setRunStatus('running');
    setErrorMsg(null);

    // Defer so UI updates first
    setTimeout(() => {
      try {
        const result =
          lang === 'js'
            ? executeJSCode(code[lang], [...DEFAULT_ARRAY])
            : executePythonCode(code[lang], [...DEFAULT_ARRAY]);

        if (result.error) {
          setRunStatus('error');
          setErrorMsg(result.error);
        } else {
          setRunStatus('ok');
          onRun?.(result.steps);
        }
      } catch (e) {
        setRunStatus('error');
        setErrorMsg(e instanceof Error ? e.message : String(e));
      }
    }, 80);
  };

  /* ── run status colors ──────────────────────────────────────── */
  const runBtnClass =
    runStatus === 'ok'      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
    runStatus === 'error'   ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' :
    runStatus === 'running' ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40 animate-pulse' :
                              'bg-violet-500/20 text-violet-400 border-violet-500/40 hover:bg-violet-500/30';

  return (
    <div className="w-full bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex justify-between items-center border-b border-slate-800 px-4 py-2.5 bg-slate-900/60">

        {/* Language pills */}
        <div className="flex gap-1.5">
          {(['js', 'python'] as Lang[]).map(l => (
            <button
              key={l}
              onClick={() => handleLangSwitch(l)}
              className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-200
                ${lang === l
                  ? l === 'js'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                  : 'text-slate-500 border border-slate-700/60 hover:border-slate-600 hover:text-slate-300'
                }`}
            >
              {LANG_META[l].label}
            </button>
          ))}
        </div>

        {/* Right: filename | Edit | Reset | Run */}
        <div className="flex items-center gap-1.5">
          <span className={`text-[10px] font-bold font-mono ${meta.accent}`}>{meta.filename}</span>

          <button
            onClick={() => setIsEditing(v => !v)}
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all duration-200
              ${isEditing
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-slate-700/40 text-slate-400 border-slate-600/50 hover:text-slate-200 hover:bg-slate-700/70'
              }`}
          >
            {isEditing ? '✓ Done' : 'Edit'}
          </button>

          {isEditing && (
            <button
              onClick={handleReset}
              className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-rose-500/40 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all"
            >
              Reset
            </button>
          )}

          {/* ▶ Run button — always visible */}
          <button
            onClick={handleRun}
            disabled={runStatus === 'running'}
            className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border transition-all duration-200 ${runBtnClass}`}
          >
            {runStatus === 'running' ? '⏳ Running…' :
             runStatus === 'ok'      ? '✅ Ran!' :
             runStatus === 'error'   ? '❌ Error' :
                                       '▶ Run'}
          </button>
        </div>
      </div>

      {/* ── Error banner ────────────────────────────────────────── */}
      {errorMsg && (
        <div className="px-4 py-2 bg-rose-950/60 border-b border-rose-800/50 text-[10px] text-rose-300 font-mono leading-relaxed">
          <span className="font-black text-rose-400">Error: </span>{errorMsg}
        </div>
      )}

      {/* ── Code area ───────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="relative flex font-mono text-xs leading-5 overflow-auto max-h-[220px] scrollbar-thin"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Line numbers */}
        <div
          ref={lineNumRef}
          aria-hidden="true"
          className="select-none sticky left-0 z-10 bg-slate-950 flex-shrink-0 overflow-hidden"
          style={{ maxHeight: '220px' }}
        >
          {lines.map((_, i) => (
            <div
              key={i}
              className={`w-8 text-right pr-3 transition-colors duration-150 leading-5
                ${!isEditing && i === activeCodeLine
                  ? 'text-amber-500 font-black'
                  : 'text-slate-600 font-light'
                }`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* View mode */}
        {!isEditing && (
          <div className="flex-1 overflow-x-auto pr-4">
            {lines.map((line, i) => (
              <div
                key={i}
                className={`whitespace-pre leading-5 px-1 rounded-sm transition-all duration-150
                  ${i === activeCodeLine
                    ? 'bg-amber-950/60 border-l-2 border-amber-500 text-amber-200 -ml-1 pl-2'
                    : 'text-slate-300'
                  }`}
              >
                {line || ' '}
              </div>
            ))}
          </div>
        )}

        {/* Edit mode */}
        {isEditing && (
          <textarea
            ref={textareaRef}
            value={code[lang]}
            onChange={handleCodeChange}
            onScroll={syncScroll}
            spellCheck={false}
            className="flex-1 bg-transparent text-slate-200 caret-amber-400 resize-none outline-none leading-5 pr-4 py-0 overflow-auto"
            style={{
              fontFamily: 'inherit',
              fontSize: 'inherit',
              lineHeight: '1.25rem',
              minHeight: `${lines.length * 20}px`,
              whiteSpace: 'pre',
              overflowX: 'auto',
            }}
          />
        )}
      </div>

      {/* ── Footer hint ─────────────────────────────────────────── */}
      <div className="border-t border-slate-800 px-4 py-1.5 bg-slate-900/40 text-[9px] text-slate-500 font-mono flex justify-between">
        <span>
          {isEditing
            ? 'Code edit karo → ▶ Run dabao → crane naye steps follow karegi!'
            : '✏ Edit dabao code change karne ke liye → ▶ Run se game update hoga'}
        </span>
        <span>{lines.length} lines</span>
      </div>
    </div>
  );
}
