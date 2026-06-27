import { LevelConfig } from './index';

export const demoLevel: LevelConfig = {
  name: "Demo",
  subtitle: "Welcome! Let's Learn",
  instructions: "Namaste! 👋 Yeh ek chhoti si practice hai. Lumi ko seedha upar bhejo, phir daayein mudo aur seedha chalo — flag wahan hai!",
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
    playerTransform: 'translate(-57%, -60%)',
    flagTransform: 'translate(-35%, -88%)',
    obstacleRockTransform: 'translate(-55%, -55%)',
    obstacleTreeTransform: 'translate(-50%, -85%)',
    tileHighlightWidth: '43.2%',
    tileHighlightHeight: '47.2%',
    tileHighlightScaleY: '0.83',
    tileHighlightRadius: '9px',
  },

  tileCoordinates: {
    // Top-Left cell
    '0,0': {
      x: 31,
      y: 21,
      width: '41%',
      height: '43%',
      playerOffset: { x: 0, y: 0 },
      flagOffset: { x: 0, y: 0 },
      highlightOffset: { x: 0, y: 0 },
    },
    // Top-Right cell (Flag target)
    '0,1': {
      x: 71,
      y: 21,
      width: '41%',
      height: '43%',
      playerOffset: { x: 0, y: 0 },
      flagOffset: { x: 0, y: 0 },
      highlightOffset: { x: 0, y: 0 },
    },
    // Bottom-Left cell (Start Position)
    '1,0': {
      x: 29,
      y: 58,
      width: '43.2%',
      height: '47.2%',
      playerOffset: { x: 0, y: 0 },
      flagOffset: { x: 0, y: 0 },
      highlightOffset: { x: 0, y: 0 },
    },
    // Bottom-Right cell
    '1,1': {
      x: 74,
      y: 58,
      width: '43.2%',
      height: '47.2%',
      playerOffset: { x: 0, y: 0 },
      flagOffset: { x: 0, y: 0 },
      highlightOffset: { x: 0, y: 0 },
      obstacleOffset: { x: 0, y: 0 },
    },
  },
};
