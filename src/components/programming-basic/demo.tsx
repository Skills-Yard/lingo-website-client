import React from 'react';
import { Position, Direction, TileCoordinate } from '../../config/levels';
import { demoLevel } from '../../config/levels/demo';

interface DemoPlatformProps {
  playerPos: Position;
  playerDir: Direction;
  isPlaying: boolean;
  executingStep: number | null;
}

export const DemoPlatform: React.FC<DemoPlatformProps> = ({
  playerPos,
  playerDir: _playerDir,
  isPlaying: _isPlaying,
  executingStep: _executingStep,
}) => {
  const dims = demoLevel.dimensions;

  const getTileConfig = (r: number, c: number) => {
    return demoLevel.tileCoordinates[`${r},${c}`] || { x: 50, y: 50 };
  };

  const getTileWidth = (tile: TileCoordinate) => {
    return tile.width ?? dims.tileHighlightWidth ?? '43.2%';
  };

  const getTileHeight = (tile: TileCoordinate) => {
    return tile.height ?? dims.tileHighlightHeight ?? '47.2%';
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/platformlayers/2layer-platform.webp"
          alt="Game Platform"
          className="w-full h-full object-contain transition-all duration-500"
          draggable={false}
        />

        {/* Static Tile Glows ── one per grid cell, only active tile shows */}
        {Array.from({ length: demoLevel.gridRows }, (_, r) =>
          Array.from({ length: demoLevel.gridCols }, (_, c) => {
            const tile = getTileConfig(r, c);
            const isActive = playerPos.r === r && playerPos.c === c;
            const offset = tile.highlightOffset || {};
            return (
              <div
                key={`glow-${r}-${c}`}
                className="absolute pointer-events-none border-4 border-[#FFFEFF]  bg-yellow-400/5 shadow-[0_0_22px_#fbbf24] transition-all duration-300"
                style={{
                  left: `${tile.x + (offset.x ?? 0)}%`,
                  top: `${tile.y + (offset.y ?? 0)}%`,
                  width: getTileWidth(tile),
                  height: getTileHeight(tile),
                  transform: offset.transform || `translate(-54%, -42%) rotate(1deg) scaleY(${dims.tileHighlightScaleY})`,
                  borderRadius: dims.tileHighlightRadius,
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.25s ease, box-shadow 0.25s ease',
                  zIndex: 5,
                }}
              />
            );
          })
        )}

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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/red-flag.webp"
                alt="Flag"
                className="w-full h-14 object-contain drop-shadow-[0_3px_5px_rgba(0,0,0,0.25)]"
                style={{ filter: 'url(#chroma-white)' }}
              />
            </div>
          );
        })()}

        {/* Render Obstacles (Rocks/Trees) */}
        {demoLevel.obstacles.map((obs, idx) => {
          const tile = getTileConfig(obs.r, obs.c);
          const offset = tile.obstacleOffset || {};
          return (
            <div
              key={idx}
              className="absolute z-20"
              style={{
                left: `${tile.x + (offset.x ?? 0)}%`,
                top: `${tile.y + (offset.y ?? 0)}%`,
                width: dims.obstacleWidth,
                transform: offset.transform || (obs.type === 'rock' ? dims.obstacleRockTransform : dims.obstacleTreeTransform),
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={obs.type === 'rock' ? '/images/rock.png' : '/images/tree.png'}
                alt={obs.type}
                className="w-full h-auto object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.2)]"
                style={{ filter: 'url(#chroma-white)' }}
              />
            </div>
          );
        })}

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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/running-lumi.webp"
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
