import React from 'react';
import { Position, Direction, Obstacle } from '../../config/levels';
import { lesson1Level } from '../../config/levels/lesson1';

interface Level1PlatformProps {
  playerPos: Position;
  playerDir: Direction;
  isPlaying: boolean;
  executingStep: number | null;
  collectedStar: boolean;
}

export const Level1Platform: React.FC<Level1PlatformProps> = ({
  playerPos,
  playerDir,
  isPlaying,
  executingStep,
  collectedStar,
}) => {
  const dims = lesson1Level.dimensions;

  const getTileConfig = (r: number, c: number) => {
    return lesson1Level.tileCoordinates[`${r},${c}`] || { x: 50, y: 50 };
  };

  // ✅ Helper: Get tile width (per-tile or global fallback)
  const getTileWidth = (tile: any) => {
    return tile.width ?? dims.tileHighlightWidth ?? '31%';
  };

  // ✅ Helper: Get tile height (per-tile or global fallback)
  const getTileHeight = (tile: any) => {
    return tile.height ?? dims.tileHighlightHeight ?? '22%';
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="relative select-none animate-fade-in"
        style={{
          width: dims.platformWidth,
          height: dims.platformHeight,
        }}
      >
        {/* Game Platform Background */}
        <img
          src="/images/platformlayers/3layer-platform.png"
          alt="Game Platform"
          className="w-full h-full object-contain transition-all duration-500"
          draggable={false}
        />


        {/* ── 9 Static Tile Glows ── one per grid cell, only active tile shows */}
        {Array.from({ length: lesson1Level.gridRows }, (_, r) =>
          Array.from({ length: lesson1Level.gridCols }, (_, c) => {
            const tile = getTileConfig(r, c);
            const isActive = playerPos.r === r && playerPos.c === c;
            return (
              <div
                key={`glow-${r}-${c}`}
                className="absolute pointer-events-none"
                style={{
                  left: `${tile.x}%`,
                  top: `${tile.y}%`,
                  width: getTileWidth(tile),
                  height: getTileHeight(tile),
                  transform: 'translate(-50%, -50%)',
                  borderRadius: dims.tileHighlightRadius,
                  border: '3px solid #fbbf24',
                  backgroundColor: 'rgba(251, 191, 36, 0.18)',
                  boxShadow: isActive ? '0 0 14px 3px #fbbf2488' : 'none',
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
          const tile = getTileConfig(lesson1Level.flagPos.r, lesson1Level.flagPos.c);
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

        {/* Render Obstacles (Rocks/Trees) */}
        {lesson1Level.obstacles.map((obs, idx) => {
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
              {/* Direction indicator (only for main levels) */}
              <div
                className="absolute bottom-0 left-1/2 w-5 h-5 rounded-full bg-emerald-500/30 border border-emerald-400 flex items-center justify-center shadow-[0_0_8px_#34d399] transition-transform duration-300 z-0"
                style={{
                  transform: `translate(-50%, 50%) scaleY(0.5) rotate(${playerDir === 'up' ? -90 :
                    playerDir === 'right' ? 0 :
                      playerDir === 'down' ? 90 :
                        180
                    }deg)`,
                }}
              >
                <span className="text-emerald-500 text-[8px] font-black leading-none">➔</span>
              </div>

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