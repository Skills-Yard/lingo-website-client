import { BlockItem, SortStep } from '../types/Sorting';

// ── Sorted check ─────────────────────────────────────────────────────────────
export function checkIfSorted(arr: BlockItem[]): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].value > arr[i + 1].value) return false;
  }
  return true;
}

// ── Per-slab vibrant color palette (index 0 = bottom slab) ───────────────────
/** Each entry is [base, top-highlight, side-shadow] */
export const SLAB_COLORS: [string, string, string][] = [
  ['#e53e3e', '#fc8181', '#c53030'], // red
  ['#dd6b20', '#f6ad55', '#c05621'], // orange
  ['#d69e2e', '#f6e05e', '#b7791f'], // yellow
  ['#38a169', '#68d391', '#2f855a'], // green
  ['#3182ce', '#63b3ed', '#2b6cb0'], // blue
  ['#6b46c1', '#b794f4', '#553c9a'], // purple
  ['#d53f8c', '#f687b3', '#b83280'], // pink
  ['#319795', '#81e6d9', '#2c7a7b'], // teal
];

/** Returns [base, top, side] for a slab at the given layer index. */
export function getSlabColor(layerIdx: number): [string, string, string] {
  return SLAB_COLORS[layerIdx % SLAB_COLORS.length];
}

// ── Cube color computation ────────────────────────────────────────────────────
export interface CubeColors {
  cubeBaseColor: string;
  cubeTopColor: string;
  cubeSideColor: string;
}

export function getCubeColors(params: {
  isSorted: boolean;
  isGrabbing: boolean;
  isFirstCompared: boolean;
  isSecondCompared: boolean;
  isSelected: boolean;
  isInFinalPosition: boolean;
}): CubeColors {
  const { isSorted, isGrabbing, isFirstCompared, isSecondCompared, isSelected, isInFinalPosition } = params;

  if (isSorted || isInFinalPosition) {
    return { cubeBaseColor: '#38a169', cubeTopColor: '#68d391', cubeSideColor: '#2f855a' };
  }
  if (isGrabbing || isFirstCompared) {
    return { cubeBaseColor: '#ed8936', cubeTopColor: '#f6ad55', cubeSideColor: '#dd6b20' };
  }
  if (isSecondCompared) {
    return { cubeBaseColor: '#3182ce', cubeTopColor: '#63b3ed', cubeSideColor: '#2b6cb0' };
  }
  if (isSelected) {
    return { cubeBaseColor: '#ed8936', cubeTopColor: '#f6ad55', cubeSideColor: '#dd6b20' };
  }
  return { cubeBaseColor: '#2d3748', cubeTopColor: '#4a5568', cubeSideColor: '#1a202c' };
}

// ── Action text overlay ───────────────────────────────────────────────────────
export function getActionText(params: {
  isSorted: boolean;
  mode: 'play' | 'auto';
  currentStep?: SortStep;
  animatingSwap: boolean;
  liftedIndices: number[];
  arrayLength: number;
}): string {
  const { isSorted, mode, currentStep, animatingSwap, liftedIndices, arrayLength } = params;

  if (isSorted) return 'sorted!';

  if (mode === 'auto' && currentStep) {
    if (currentStep.type === 'compare' && currentStep.indices[0] !== -1) {
      return `comparing a[${currentStep.indices[0]}], a[${currentStep.indices[1]}]`;
    }
    if (currentStep.type === 'swap' && currentStep.indices[0] !== -1) {
      return `swap a[${currentStep.indices[0]}], a[${currentStep.indices[1]}]`;
    }
  }

  if (mode === 'play' && animatingSwap && liftedIndices.length === 1) {
    const first = Math.min(arrayLength - 1, liftedIndices[0]);
    return `swap a[${first === 0 ? 0 : first - 1}], a[${first}]`;
  }

  return '';
}
