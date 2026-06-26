import React from 'react';
import { Position, Direction } from '../../config/levels';
import { demoLevel } from '../../config/levels/demo';

interface DemoPlatformProps {
  playerPos: Position;
  playerDir: Direction;
  isPlaying: boolean;
  executingStep: number | null;
}

export const DemoPlatform: React.FC<DemoPlatformProps> = ({
  playerPos,
  playerDir,
  isPlaying,
  executingStep,
}) => {
  const dims = demoLevel.dimensions;

  const getTileConfig = (r: number, c: number) => {
    return demoLevel.tileCoordinates[`${r},${c}`] || { x: 50, y: 50 };
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-2 bg-amber-100 border border-amber-300 rounded-full px-3 py-0.5 mb-1 select-none">
        <span className="text-amber-600 text-[10px] font-black uppercase tracking-widest">🎓 Practice Level</span>
      </div>
      <div
        className="relative select-none animate-fade-in"
        style={{
          width: dims.platformWidth,
          height: dims.platformHeight,
        }}
      >
        {/* Game Platform Background */}
        <img
          src="/images/platformlayers/2layer-platform.png"
          alt="Game Platform"
          className="w-full h-full object-contain transition-all duration-500"
          draggable={false}
        />

        {/* Active tile highlight (perfect isometric diamond shape matching the grass tile border) */}
        {(() => {
          const tile = getTileConfig(playerPos.r, playerPos.c);
          const offset = tile.highlightOffset || {};
          return (
            <div
              className="absolute border-[3px] border-yellow-400 bg-yellow-400/15 shadow-[0_0_12px_#fbbf24] transition-all duration-300"
              style={{
                left: `${tile.x + (offset.x ?? 0)}%`,
                top: `${tile.y + (offset.y ?? 0)}%`,
                width: dims.tileHighlightWidth,
                height: dims.tileHighlightHeight,
                transform: offset.transform || `translate(-54%, -42%) rotate(0.5deg) scaleY(${dims.tileHighlightScaleY})`,
                borderRadius: dims.tileHighlightRadius,
              }}
            />
          );
        })()}

        {/* Render dynamic Flag item */}
        {(() => {
          const tile = getTileConfig(demoLevel.flagPos.r, demoLevel.flagPos.c);
          const offset = tile.flagOffset || {};
          return (
            <div
              className="absolute z-10 transition-all duration-300"
              style={{
                left: `${tile.x + (offset.x ?? 0)}%`,
                top: `${tile.y + (offset.y ?? 0)}%`,
                width: dims.flagWidth,
                transform: offset.transform || dims.flagTransform,
              }}
            >
              <img
                src="/images/flag.png"
                alt="Flag"
                className="w-full h-auto object-contain drop-shadow-[0_3px_5px_rgba(0,0,0,0.25)]"
                style={{ filter: 'url(#chroma-white)' }}
              />
            </div>
          );
        })()}

        {/* Player Lumi */}
        {(() => {
          const tile = getTileConfig(playerPos.r, playerPos.c);
          const offset = tile.playerOffset || {};
          return (
            <div
              className="absolute z-30 transition-all duration-500 ease-out flex flex-col items-center overflow-visible"
              style={{
                left: `${tile.x + (offset.x ?? 0)}%`,
                top: `${tile.y + (offset.y ?? 0)}%`,
                width: dims.playerWidth,
                transform: offset.transform || dims.playerTransform,
              }}
            >
              <img
                src="/images/lumi.png"
                alt="Lumi"
                className="w-full h-auto object-contain drop-shadow-[0_5px_6px_rgba(0,0,0,0.3)] animate-bounce-slow z-10"
                style={{ filter: 'url(#chroma-white)' }}
              />
            </div>
          );
        })()}
      </div>
    </div>
  );
};
