import React from 'react';

export interface BlockItem {
  id: number;        // unique identifier based on original value
  value: number;     // value to sort (1 to 8)
  originalIdx: number;
}

export interface SortStep {
  type: 'init' | 'compare' | 'swap' | 'check_loop' | 'break' | 'sorted';
  indices: [number, number];
  arrayState: number[];
  codeLine: number;
  explanation: string;
}

export interface SortingGameViewProps {
  hearts: number;
  setHearts: React.Dispatch<React.SetStateAction<number>>;
  stars: number;
  setStars: React.Dispatch<React.SetStateAction<number>>;
  visualStars: number;
  setView: (view: 'map' | 'lesson1_theory' | 'game' | 'sorting_game') => void;
  levelStates: Record<string, 'locked' | 'unlocked' | 'completed' | 'demo_completed'>;
  setLevelStates: React.Dispatch<React.SetStateAction<Record<string, 'locked' | 'unlocked' | 'completed' | 'demo_completed'>>>;
  currentLevelIdx: number;
  setCurrentLevelIdx: (idx: number) => void;
  handleLevelSuccessContinue: () => void;
  triggerSound: (type: 'tap' | 'step' | 'pickup' | 'win' | 'lose' | 'hint') => void;
}
