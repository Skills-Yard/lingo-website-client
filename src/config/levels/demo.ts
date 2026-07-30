import { LevelConfig } from './index';

export const demoLevel: LevelConfig = {
  name: "Demo",
  subtitle: "Welcome! Let's Learn",
  instructions: "Hello! 👋 This is a quick practice level. Guide Lumi straight up, then turn right and keep moving straight—the flag is waiting there!",
  gridCols: 2,
  gridRows: 2,
  startPos: { r: 1, c: 0 },
  startDir: 'up',
  flagPos: { r: 0, c: 1 },
  obstacles: [
    { r: 1, c: 1, type: 'rock' }
  ],
  maxSlots: 3,
  hints: ["straight", "right", "straight"],
  isDemo: true,

  dimensions: {
    platformWidth: '240px',
    platformHeight: '200px',
    playerWidth: '25%',
    flagWidth: '16%',
    obstacleWidth: '16%',
    playerTransform: 'translate(-57%, -80%)',
    flagTransform: 'translate(-35%, -88%)',
    obstacleRockTransform: 'translate(-55%, -55%)',
    obstacleTreeTransform: 'translate(-50%, -85%)',
    tileHighlightWidth: '43.2%',
    tileHighlightHeight: '47.2%',
    tileHighlightScaleY: '0.83',
    tileHighlightRadius: '9px',
  },
};
