'use client';
import { BlockItem, SortStep } from '@/utils/types/Sorting';
import React from 'react';

interface CubeProps {
  block: BlockItem;
  idx: number;
  craneX: number;
  slotWidthPercent: number;
  isGrabbing: boolean;
  clawLowered: boolean;
  wireLength: number;
  workspaceHeight: number;
  isSorted: boolean;
  mode: 'play' | 'auto';
  steps: SortStep[];
  currentStepIdx: number;
  selectedIdx: number | null;
  animatingSwap: boolean;
  onClick: () => void;
}

/** Height of each stacked 3D grid segment in pixels (compact height) */
export const UNIT_H = 14;

// ── Color Palettes matching the 3D Isometric screenshot ────────────────────────
interface ColorPalette {
  topLight: string;
  topBase: string;
  frontTop: string;
  frontBottom: string;
  leftTop: string;
  leftBottom: string;
  rightTop: string;
  rightBottom: string;
}

// 1. Default state: Warm Golden / Yellow Palette (like in user screenshot)
const PALETTE_DEFAULT: ColorPalette = {
  topLight: '#fef08a',    // yellow-200
  topBase: '#fde047',     // yellow-300
  frontTop: '#f59e0b',    // amber-500
  frontBottom: '#d97706', // amber-600
  leftTop: '#eab308',     // yellow-500
  leftBottom: '#ca8a04',  // yellow-600
  rightTop: '#d97706',    // amber-600
  rightBottom: '#b45309', // amber-700
};

// 2. Sorted state: Vibrant Emerald Green
const PALETTE_SORTED: ColorPalette = {
  topLight: '#a7f3d0',    // emerald-200
  topBase: '#6ee7b7',     // emerald-300
  frontTop: '#22c55e',    // green-500
  frontBottom: '#16a34a', // green-600
  leftTop: '#34d399',     // emerald-400
  leftBottom: '#059669',  // emerald-600
  rightTop: '#16a34a',    // green-600
  rightBottom: '#15803d', // green-700
};

// 3. Grabbed / Active state: Energetic Orange
const PALETTE_GRABBED: ColorPalette = {
  topLight: '#fed7aa',    // orange-200
  topBase: '#fb923c',     // orange-400
  frontTop: '#f97316',    // orange-500
  frontBottom: '#ea580c', // orange-600
  leftTop: '#fb923c',     // orange-400
  leftBottom: '#d97706',  // amber-600
  rightTop: '#ea580c',    // orange-600
  rightBottom: '#c2410c', // orange-700
};

// 4. Compared state: Vibrant Royal Purple
const PALETTE_COMPARED: ColorPalette = {
  topLight: '#e9d5ff',    // purple-200
  topBase: '#c084fc',     // purple-400
  frontTop: '#a855f7',    // purple-500
  frontBottom: '#9333ea', // purple-600
  leftTop: '#c084fc',     // purple-400
  leftBottom: '#7e22ce',  // purple-700
  rightTop: '#9333ea',    // purple-600
  rightBottom: '#6b21a8', // purple-800
};

/**
 * Render a 3D isometric tower of stacked grid blocks based on value.
 * Uses real CSS 3D transforms (preserve-3d) with true isometric projection.
 */
export function Cube({
  block,
  idx,
  craneX,
  slotWidthPercent,
  isGrabbing,
  wireLength,
  workspaceHeight,
  isSorted,
  mode,
  steps,
  currentStepIdx,
  selectedIdx,
  animatingSwap,
  onClick,
}: CubeProps) {
  const val = block.value;

  const currentIndices = steps[currentStepIdx]?.indices ?? [-1, -1];
  const isCompared = mode === 'auto' && currentIndices.includes(idx);
  const minIdx = Math.min(...currentIndices.filter(i => i !== -1));
  const maxIdx = Math.max(...currentIndices.filter(i => i !== -1));
  const isFirstCompared = isCompared && idx === minIdx;
  const isSecondCompared = isCompared && idx === maxIdx && !isFirstCompared;
  const isSelected = selectedIdx === idx;

  // Determine current color palette for the entire block column
  let palette = PALETTE_DEFAULT;
  if (isSorted || (!isSorted && block.value - 1 === idx)) {
    palette = PALETTE_SORTED;
  } else if (isGrabbing || isFirstCompared || isSelected) {
    palette = PALETTE_GRABBED;
  } else if (isSecondCompared) {
    palette = PALETTE_COMPARED;
  }

  const totalH = val * UNIT_H;
  const defaultLeftPos = idx * slotWidthPercent + slotWidthPercent / 2;
  const leftPos = isGrabbing ? craneX : defaultLeftPos;

  // Exact physics formula locking box top to claw bottom at all times:
  // clawBottomY = wireLength + 34px from workspace top.
  // groundBoxTopY = workspaceHeight - 46px - totalH from workspace top.
  // yTranslation = -(groundBoxTopY - clawBottomY) = -(workspaceHeight - 80 - totalH - wireLength)
  const effectiveWsH = workspaceHeight > 0 ? workspaceHeight : 320;
  const targetLiftY = effectiveWsH - 80 - totalH - wireLength;

  const yTranslation = isGrabbing ? -Math.max(0, targetLiftY) : 0;
  // Constant Z offset = 0 so block stays locked in plane without popping forward/backward
  const zTranslation = 0;

  return (
    <React.Fragment>
      {/* Platform Drop Shadow */}
      <div
        className="absolute  bg-black/60 rounded-full blur-[4px] pointer-events-none"
        style={{
          left: `calc(${leftPos}% - 16px)`,
          width: '32px',
          height: '14px',
          bottom: '44px',
          transform: 'rotateX(90deg)',
          opacity: isGrabbing ? 0.15 : 0.75,
          scale: isGrabbing ? 0.5 : 1.0,
          transition: 'opacity 0.4s ease, scale 0.4s ease, left 1.1s cubic-bezier(0.45, 0, 0.55, 1)',
          willChange: 'left',
          zIndex: 9,
        }}
      />

      {/* Main 3D Cube Stack Container */}
      <div
        onClick={onClick}
        className={`cube-3d absolute select-none origin-bottom transform-style-3d ${animatingSwap ? 'pointer-events-none' : 'cursor-pointer'}`}
        style={{
          left: `calc(${leftPos}% - 16px)`,
          bottom: '46px',
          height: `${totalH}px`,
          transform: `translate3d(0, ${yTranslation}px, ${zTranslation}px)`,
          zIndex: isGrabbing ? 50 : 20 - idx,
          transition: 'left 1.1s cubic-bezier(0.45, 0, 0.55, 1), transform 0.45s cubic-bezier(0.33, 1, 0.68, 1)',
          willChange: 'left, transform',
        }}
      >
        {/* Render each grid unit from bottom (0) to top (val - 1) */}
        {Array.from({ length: val }, (_, layerIdx) => {
          const isTopSegment = layerIdx === val - 1;
          const bottomOffset = layerIdx * UNIT_H;

          return (
            <div
              key={layerIdx}
              className="absolute left-0 right-0 transform-style-3d"
              style={{
                bottom: `${bottomOffset}px`,
                height: `${UNIT_H}px`,
              }}
            >
              {/* Front Face */}
              <div
                className="face-3d cube-face-front rounded-xs flex items-center justify-center font-black text-xs select-none shadow-sm"
                style={{
                  height: `${UNIT_H}px`,
                  background: `linear-gradient(180deg, ${palette.frontTop} 0%, ${palette.frontBottom} 100%)`,
                  borderTop: '1px solid rgba(255, 255, 255, 0.35)',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.35)',
                  borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRight: '1px solid rgba(0, 0, 0, 0.2)',
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.3)',
                }}
              >
                {/* Number text displayed cleanly on the top-most grid face */}
                {isTopSegment && (
                  <span
                    className="text-white font-extrabold text-[11px] tracking-tight"
                    style={{
                      textShadow: '0 1px 3px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.9)',
                      lineHeight: 1,
                    }}
                  >
                    {val}
                  </span>
                )}
              </div>

              {/* Back Face */}
              <div
                className="face-3d cube-face-back rounded-xs"
                style={{
                  height: `${UNIT_H}px`,
                  background: palette.frontBottom,
                }}
              />

              {/* Left Face */}
              <div
                className="face-3d cube-face-left rounded-xs"
                style={{
                  height: `${UNIT_H}px`,
                  background: `linear-gradient(180deg, ${palette.leftTop} 0%, ${palette.leftBottom} 100%)`,
                  borderTop: '1px solid rgba(255, 255, 255, 0.25)',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.35)',
                }}
              />

              {/* Right Face */}
              <div
                className="face-3d cube-face-right rounded-xs"
                style={{
                  height: `${UNIT_H}px`,
                  background: `linear-gradient(180deg, ${palette.rightTop} 0%, ${palette.rightBottom} 100%)`,
                  borderTop: '1px solid rgba(255, 255, 255, 0.25)',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.35)',
                }}
              />

              {/* Top Face (Only rendered on the topmost grid segment) */}
              {isTopSegment && (
                <div
                  className="face-3d cube-face-top rounded-xs flex items-center justify-center shadow-[inset_0_1px_3px_rgba(255,255,255,0.6)]"
                  style={{
                    background: `linear-gradient(135deg, ${palette.topLight} 0%, ${palette.topBase} 100%)`,
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}
