import { demoLevel } from "./demo";
import { lesson1Level } from "./lesson1";

export interface Position {
  r: number;
  c: number;
}

export type Direction = 'up' | 'right' | 'down' | 'left';

export interface Obstacle {
  r: number;
  c: number;
  type: 'rock' | 'tree';
}

export interface Offset {
  x?: number;
  y?: number;
  transform?: string;
}

export interface TileCoordinate {
  x: number;
  y: number;
  width?: string;           // ✅ NEW: Individual tile width (overrides global)
  height?: string;          // ✅ NEW: Individual tile height (overrides global)
  playerOffset?: Offset;
  flagOffset?: Offset;
  obstacleOffset?: Offset;
  highlightOffset?: Offset;
}

export interface GridDimensions {
  platformWidth: string;
  platformHeight: string;
  playerWidth: string;
  flagWidth: string;
  obstacleWidth: string;
  playerTransform: string;
  flagTransform: string;
  obstacleRockTransform: string;
  obstacleTreeTransform: string;
  tileHighlightWidth?: string;  
  tileHighlightHeight?: string;   
  tileHighlightScaleY: string;
  tileHighlightRadius: string;
}

export interface LevelConfig {
  name: string;
  subtitle: string;
  instructions: string;
  gridCols: number;
  gridRows: number;
  startPos: Position;
  startDir: Direction;
  flagPos: Position;
  obstacles: Obstacle[];
  starPos?: Position;
  maxSlots: number;
  hints: string[];
  isDemo?: boolean;

  dimensions: GridDimensions;
  tileCoordinates: Record<string, TileCoordinate>; // key: "r,c"
}

export const LEVELS: LevelConfig[] = [
  demoLevel,
  lesson1Level
];