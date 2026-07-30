import { LevelConfig } from './index';

export const sortingLevel: LevelConfig = {
  name: "Level 3",
  subtitle: "3D Sorting",
  instructions: "Sort the blocks in ascending order! You can swap adjacent blocks, or run Auto Sort to watch the 3D crane sort them.",
  gridCols: 1,
  gridRows: 1,
  startPos: { r: 0, c: 0 },
  startDir: 'up',
  flagPos: { r: 0, c: 0 },
  obstacles: [],
  maxSlots: 0,
  hints: [],
  dimensions: {
    platformWidth: '100%',
    platformHeight: '100%',
    playerWidth: '0%',
    flagWidth: '0%',
    obstacleWidth: '0%',
    playerTransform: '',
    flagTransform: '',
    obstacleRockTransform: '',
    obstacleTreeTransform: '',
    tileHighlightScaleY: '1',
    tileHighlightRadius: '0px'
  }
};
