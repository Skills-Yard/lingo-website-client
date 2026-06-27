import { LevelConfig } from './index';

export const demoLevel: LevelConfig = {
  name: "Demo",
  subtitle: "Welcome! Let's Learn",
  instructions: "Namaste! 👋 Yeh ek chhoti si practice hai. Lumi ko seedha upar bhejo, phir daayein side move karo — flag wahan hai!",
  gridCols: 2,
  gridRows: 2,
  startPos: { r: 1, c: 0 },
  startDir: 'up',
  flagPos: { r: 0, c: 1 },
  obstacles: [],
  maxSlots: 2,
  hints: ["straight", "right"],
  isDemo: true,

  dimensions: {
    platformWidth: '240px',
    platformHeight: '200px',
    playerWidth: '22%',
    flagWidth: '16%',
    obstacleWidth: '16%',
    playerTransform: 'translate(-57%, -98%)',
    flagTransform: 'translate(-35%, -88%)',
    obstacleRockTransform: 'translate(-50%, -75%)',
    obstacleTreeTransform: 'translate(-50%, -85%)',
    tileHighlightWidth: '30.2%',
    tileHighlightHeight: '34.2%',
    tileHighlightScaleY: '0.83',
    tileHighlightRadius: '9px',
  },

  tileCoordinates: {
    // Top-Left cell
    '0,0': {
      x: 35,
      y: 36,
      playerOffset: { x: 0, y: 0 },
      flagOffset: { x: 0, y: 0 },
      highlightOffset: { x: 0, y: 0 },
    },
    // Top-Right cell (Flag target)
    '0,1': {
      x: 65,
      y: 36,
      playerOffset: { x: 0, y: 0 },
      flagOffset: { x: 0, y: 0 },
      highlightOffset: { x: 0, y: 0 },
    },
    // Bottom-Left cell (Start Position)
    '1,0': {
      x: 35,
      y: 61,
      playerOffset: { x: 0, y: 0 },
      flagOffset: { x: 0, y: 0 },
      highlightOffset: { x: 0, y: 0 },
    },
    // Bottom-Right cell
    '1,1': {
      x: 65,
      y: 61,
      playerOffset: { x: 0, y: 0 },
      flagOffset: { x: 0, y: 0 },
      highlightOffset: { x: 0, y: 0 },
    },
  },
};
