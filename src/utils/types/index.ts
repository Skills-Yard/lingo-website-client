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

export interface TheoryOption {
  text: string;
  isCorrect: boolean;
  commandType?: CommandType;
  explanation?: string;
}

export interface TheorySlideType {
  title: string;
  text: string;
  instruction?: string;
  hasQuiz?: boolean;
  showCommandsIllustration?: boolean;
  isEnd?: boolean;
  question?: string;
  options?: TheoryOption[];
  quizIllustration?: {
    type: 'command_demonstration';
    commandType: CommandType;
  };
  imageSrc?: string;
  explanation?: {
    correctTitle?: string;
    correctText?: string;
    incorrectTitle?: string;
    incorrectText?: string;
    rememberText?: string;
  };
}

export type { Position, Direction, LevelConfig };
