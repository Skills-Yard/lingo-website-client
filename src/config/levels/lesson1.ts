import { LevelConfig } from './index';

export const lesson1Level: LevelConfig = {
  name: "Lesson 1",
  subtitle: "Lumi Commands",
  instructions: "Guide Lumi to the flag! Help Lumi navigate straight up and turn right to reach the flag.",
  gridCols: 3,
  gridRows: 3,
  startPos: { r: 2, c: 0 },
  startDir: 'up',
  flagPos: { r: 0, c: 2 },
  obstacles: [
    { r: 1, c: 1, type: 'rock' },
    { r: 2, c: 1, type: 'tree' },
  ],
  maxSlots: 5,
  hints: ["straight", "straight", "right", "straight", "straight"],

  dimensions: {
    platformWidth: '320px',
    platformHeight: '270px',
    playerWidth: '17%',
    flagWidth: '17%',
    obstacleWidth: '13%',
    playerTransform: 'translate(-55%, -98%)',
    flagTransform: 'translate(-35%, -95%)',
    obstacleRockTransform: 'translate(-50%, -50%)',
    obstacleTreeTransform: 'translate(-50%, -75%)',
    tileHighlightScaleY: '1',
    tileHighlightRadius: '13px',
  },
};