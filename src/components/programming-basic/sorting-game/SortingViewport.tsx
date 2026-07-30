'use client';
import React from 'react';
import { Platform } from './Platform';
import { Crane } from './Crane';
import { Cube } from './Cube';
import { BlockItem, SortStep } from '@/utils/types/Sorting';

interface SortingViewportProps {
  // Array & game state
  array: BlockItem[];
  mode: 'play' | 'auto';
  steps: SortStep[];
  currentStepIdx: number;
  isSorted: boolean;
  selectedIdx: number | null;
  animatingSwap: boolean;
  liftedIndices: number[];
  moveCount: number;
  // Crane values
  craneX: number;
  clawGrabbing: boolean;
  clawLowered: boolean;
  wireLength: number;
  clawTop: number;
  slotWidthPercent: number;
  // Workspace ref & height
  workspaceRef: React.RefObject<HTMLDivElement | null>;
  workspaceHeight: number;
  // Handlers
  handleBlockClick: (idx: number) => void;
}

export function SortingViewport({
  array, mode, steps, currentStepIdx, isSorted, selectedIdx, animatingSwap,
  liftedIndices, moveCount, craneX, clawGrabbing, clawLowered, wireLength, clawTop,
  slotWidthPercent, workspaceRef, workspaceHeight, handleBlockClick,
}: SortingViewportProps) {
  return (
    <div className="relative w-full aspect-video min-h-[350px] bg-slate-950 border-4 border-slate-800 rounded-[32px] overflow-hidden shadow-2xl p-4 flex flex-col justify-between select-none">

      <div className="absolute inset-0 bg-radial-gradient(circle at center, #111827 0%, #000000 100%) opacity-95 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 150px, #3b82f6 0%, transparent 60%)' }}
      />

      {/* 3D Scene Wrapper */}
      <div className="viewport-3d w-full h-full relative z-10 flex items-center justify-center">
        <div className="stage-3d w-[92%] h-[85%] relative flex justify-center">

          {/* Background Watermark */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 animate-pulse"
            style={{ transform: 'translate3d(0, -10px, -50px)' }}
          >
            <span className="font-mono text-xl font-bold tracking-widest text-slate-700/10">
              algomaster.io
            </span>
          </div>

          {/* Vertical Gantry Pillars */}
          <div
            className="absolute left-[4%] w-2 bg-gradient-to-r from-slate-700 via-slate-500 to-slate-800 rounded-sm z-20 border-r border-slate-900/30 shadow-md"
            style={{ top: '15px', bottom: '30px' }}
          />
          <div
            className="absolute right-[4%] w-2 bg-gradient-to-r from-slate-700 via-slate-500 to-slate-800 rounded-sm z-20 border-r border-slate-900/30 shadow-md"
            style={{ top: '15px', bottom: '30px' }}
          />

          {/* Pillar Base Feet */}
          <div
            className="absolute left-[3.25%] w-3.5 h-1 bg-slate-800 border border-slate-700 rounded-xs z-25 shadow-sm"
            style={{ bottom: '30px' }}
          />
          <div
            className="absolute right-[3.25%] w-3.5 h-1 bg-slate-800 border border-slate-700 rounded-xs z-25 shadow-sm"
            style={{ bottom: '30px' }}
          />

          {/* Diagonal Corner Braces */}
          <div
            className="absolute w-[28px] h-1.5 bg-gradient-to-r from-slate-600 to-slate-500 border border-slate-700/50 shadow-sm z-1 origin-top-left -rotate-45"
            style={{ left: 'calc(4% + 4px)', top: '42px' }}
          />
          <div
            className="absolute w-[28px] h-1.5 bg-gradient-to-l from-slate-600 to-slate-500 border border-slate-700/50 shadow-sm z-1 origin-top-right rotate-45"
            style={{ right: 'calc(4% + 4px)', top: '42px' }}
          />

          {/* Horizontal Rail */}
          <div
            className="absolute left-[4%] right-[4%] h-3 bg-gradient-to-b from-slate-700 via-slate-600 to-slate-850 border border-slate-950 rounded-sm shadow-[0_4px_8px_rgba(0,0,0,0.6)] z-30"
            style={{ top: '15px' }}
          />

          {/* Platform */}
          <Platform />

          {/* Active Workspace — cubes and crane live here */}
          <div
            ref={workspaceRef}
            className="absolute left-[9%] right-[9%] top-0 bottom-0 z-50 transform-style-3d"
          >
            {/* Crane Carriage */}
            <Crane
              craneX={craneX}
              clawGrabbing={clawGrabbing}
              wireLength={wireLength}
              clawTop={clawTop}
            />

            {/* 3D Cubes */}
            {array.map((block, idx) => (
              <Cube
                key={block.id}
                block={block}
                idx={idx}
                craneX={craneX}
                slotWidthPercent={slotWidthPercent}
                isGrabbing={liftedIndices.includes(idx)}
                clawLowered={clawLowered}
                wireLength={wireLength}
                workspaceHeight={workspaceHeight}
                isSorted={isSorted}
                mode={mode}
                steps={steps}
                currentStepIdx={currentStepIdx}
                selectedIdx={selectedIdx}
                animatingSwap={animatingSwap}
                onClick={() => handleBlockClick(idx)}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Visualizer Status Bar */}
      <div className="relative z-20 flex justify-between items-center text-[10px] text-slate-400 font-bold px-2">
        <div>
          {mode === 'play' ? (
            <span>Swaps: <strong className="text-white text-xs">{moveCount}</strong></span>
          ) : (
            <span>Step: <strong className="text-white text-xs">{currentStepIdx + 1}</strong> / {steps.length}</span>
          )}
        </div>
        <div>
          {isSorted ? (
            <span className="text-emerald-400 font-black animate-pulse">✓ sorted!</span>
          ) : (
            <span>Ascending Order</span>
          )}
        </div>
      </div>
    </div>
  );
}
