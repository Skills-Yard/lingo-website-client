import { Position, Direction, LevelConfig } from '../../config/levels';

export type CommandType = 'straight' | 'left' | 'right' | 'pickup' | 'back';

export interface CommandInfo {
  type: CommandType;
  label: string;
  imageSrc: string;
}

export interface FlyingStar {
  id: number;
  fromX: number;
  fromY: number;
}

export type { Position, Direction, LevelConfig };
