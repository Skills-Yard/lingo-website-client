import { useState, useCallback, useEffect, useRef } from 'react';

import { useBubbleSortSteps } from './useBubbleSortSteps';
import { useCraneAnimation } from './useCraneAnimation';
import { useWorkspaceSize } from './useWorkspaceSize';
import { BlockItem, SortStep } from '@/utils/types/Sorting';
import { DEFAULT_ARRAY } from '@/utils/constants/constants';
import { checkIfSorted } from '@/utils/constants/helpers';
import { UNIT_H } from '@/components/programming-basic/sorting-game/Cube';

interface UseSortingGameArgs {
  triggerSound: (type: 'tap' | 'step' | 'pickup' | 'win' | 'lose' | 'hint') => void;
  handleLevelSuccessContinue: () => void;
}

/**
 * Master game hook. Combines sub-hooks for steps, crane animation, and
 * workspace sizing, and implements all game handlers (play, auto, reset).
 */
export function useSortingGame({ triggerSound, handleLevelSuccessContinue }: UseSortingGameArgs) {
  // ── Mode ──────────────────────────────────────────────────────────────────
  const [mode, setMode] = useState<'play' | 'auto'>('play');

  // ── Game state ────────────────────────────────────────────────────────────
  const [array, setArray] = useState<BlockItem[]>(() =>
    DEFAULT_ARRAY.map((val, idx) => ({ id: val, value: val, originalIdx: idx }))
  );
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const [isSorted, setIsSorted] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);

  // ── Visualizer state ──────────────────────────────────────────────────────
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1400);

  // ── UI state ──────────────────────────────────────────────────────────────
  const [mascotMessage, setMascotMessage] = useState("Hey there! Let's learn Sorting! Swap adjacent cubes to order them, or watch the 3D crane sort them.");
  const [activeCodeLine, setActiveCodeLine] = useState(-1);

  // ── Sub-hooks ─────────────────────────────────────────────────────────────
  const { steps: builtinSteps, generateSteps } = useBubbleSortSteps();
  const [stepsOverride, setStepsOverride] = useState<SortStep[] | null>(null);
  // Derived: use user-run steps if available, otherwise built-in
  const steps = stepsOverride ?? builtinSteps;
  const crane = useCraneAnimation();
  const { workspaceRef, workspaceHeight } = useWorkspaceSize();
  // Ref to suppress stale closure issues in handleRunCode
  const stepsOverrideRef = useRef<SortStep[] | null>(null);

  // ── Sound helpers ─────────────────────────────────────────────────────────
  const playTap = useCallback(() => triggerSound('tap'), [triggerSound]);
  const playWin = useCallback(() => triggerSound('win'), [triggerSound]);
  const playStep = useCallback(() => triggerSound('step'), [triggerSound]);
  const playPickup = useCallback(() => triggerSound('pickup'), [triggerSound]);

  // ── Precise Wire Length Calculation ──────────────────────────────────────
  const targetVal = crane.targetBlockVal > 0 ? crane.targetBlockVal : 4;
  const effectiveWsH = workspaceHeight > 0 ? workspaceHeight : 320;
  // Lowered wire length calculation with hard safety limit so claw bottom never goes below 1-unit block height above platform
  const calcLowered = effectiveWsH - 80 - (targetVal * UNIT_H);
  const maxAllowedWire = effectiveWsH - 80 - UNIT_H;
  const loweredWireLength = Math.max(10, Math.min(maxAllowedWire, calcLowered));
  const wireLength = crane.clawLowered ? loweredWireLength : 15;
  const clawTop = 24 + wireLength;
  const slotWidthPercent = 100 / array.length;
  const isGrabbingAny = crane.liftedIndices.length > 0;

  // ── Manual swap animation sequence ────────────────────────────────────────
  const triggerManualSwap = useCallback((idxA: number, idxB: number) => {
    crane.setAnimatingSwap(true);
    setSelectedIdx(null);
    setMoveCount(prev => prev + 1);

    const firstIdx = Math.min(idxA, idxB);
    const secondIdx = Math.max(idxA, idxB);
    const valA = array[firstIdx].value;
    const valB = array[secondIdx].value;
    const slotWidth = 100 / array.length;
    const posA = firstIdx * slotWidth + slotWidth / 2;
    const posB = secondIdx * slotWidth + slotWidth / 2;

    // Set target block value explicitly for lowering math
    crane.setTargetBlockVal(valA);

    // 1. Move Crane to posA above Block A
    crane.setCraneX(posA);

    crane.scheduleTimeout(() => {
      // 2. Lower Claw to touch top of Block A
      crane.setTargetBlockVal(valA);
      crane.setClawLowered(true);
      playPickup();

      crane.scheduleTimeout(() => {
        // 3. Clamp Claw onto Block A
        crane.setClawGrabbing(true);
        crane.setLiftedIndices([firstIdx]);

        crane.scheduleTimeout(() => {
          // 4. Lift Block A UP high into the air
          crane.setClawLowered(false);

          crane.scheduleTimeout(() => {
            // 5. Block A is NOW HIGH IN THE AIR!
            // Crane + Block A travel TOGETHER to posB — liftedIndices stays on firstIdx
            // so block A follows craneX at identical speed (same 1.1s CSS transition).
            crane.setCraneX(posB);
            playStep();

            crane.scheduleTimeout(() => {
              // 5b. Crane has arrived at posB. NOW swap the array so Block B slides
              // from posB→posA in the background, and re-assign grab to secondIdx slot.
              const newArray = [...array];
              const temp = newArray[firstIdx];
              newArray[firstIdx] = newArray[secondIdx];
              newArray[secondIdx] = temp;
              setArray(newArray);
              crane.setLiftedIndices([secondIdx]);

              crane.scheduleTimeout(() => {
                // 6. Lower Block A DOWN into posB onto platform
                crane.setTargetBlockVal(valA);
                crane.setClawLowered(true);

                crane.scheduleTimeout(() => {
                  // 7. Release Claw arms
                  crane.setClawGrabbing(false);

                  crane.scheduleTimeout(() => {
                    // 8. Retract empty claw back UP & finish
                    crane.setClawLowered(false);
                    crane.setLiftedIndices([]);
                    crane.setAnimatingSwap(false);

                    const sorted = checkIfSorted(newArray);
                    if (sorted) {
                      setIsSorted(true);
                      playWin();
                      crane.scheduleTimeout(() => setShowWinModal(true), 800);
                      setMascotMessage("Awesome! You successfully sorted all the blocks! 🎉 Click Continue.");
                    } else {
                      setMascotMessage(`Swapped ${valA} and ${valB}. Keep sorting!`);
                    }
                  }, 350);
                }, 350);
              }, 1200);
            }, 1150);
          }, 450);
        }, 350);
      }, 400);
    }, 850);
  }, [array, crane, playPickup, playStep, playWin]);

  // ── Auto step runner ──────────────────────────────────────────────────────
  const runAutoStep = useCallback((stepIdx: number) => {
    if (stepIdx >= steps.length) {
      setIsPlaying(false);
      return;
    }

    const step = steps[stepIdx];
    setActiveCodeLine(step.codeLine);
    setMascotMessage(step.explanation);

    const slotWidth = 100 / array.length;

    if (step.type === 'compare') {
      const [idxA] = step.indices;
      const posA = idxA * slotWidth + slotWidth / 2;
      const valA = array[idxA]?.value ?? 4;

      crane.setTargetBlockVal(valA);
      crane.setClawLowered(false);
      crane.setClawGrabbing(false);
      crane.setLiftedIndices([]);
      crane.setCraneX(posA);

      crane.scheduleTimeout(() => {
        crane.setTargetBlockVal(valA);
        crane.setClawLowered(true);
        playPickup();

        crane.scheduleTimeout(() => {
          crane.setClawGrabbing(true);
          crane.setLiftedIndices([idxA]);
        }, 350);
      }, 850);
    } else if (step.type === 'swap') {
      const [idxA, idxB] = step.indices;
      const posB = idxB * slotWidth + slotWidth / 2;
      const valA = array[idxA]?.value ?? 4;

      crane.setTargetBlockVal(valA);
      crane.setAnimatingSwap(true);
      crane.setClawGrabbing(true);
      crane.setLiftedIndices([idxA]);
      playPickup();

      // Lift block high up
      crane.setClawLowered(false);

      crane.scheduleTimeout(() => {
        // Block A is NOW HIGH IN THE AIR!
        // Crane + Block A travel TOGETHER to posB — liftedIndices stays on idxA
        // so block A follows craneX at identical speed.
        crane.setCraneX(posB);
        playStep();

        crane.scheduleTimeout(() => {
          // Crane has arrived at posB. NOW swap array so Block B slides in background.
          const nextStep = steps[stepIdx + 1];
          if (nextStep) {
            const mappedArray = nextStep.arrayState.map((val) => {
              const match = array.find(item => item.value === val);
              return match || { id: val, value: val, originalIdx: val - 1 };
            });
            setArray(mappedArray);
            crane.setLiftedIndices([idxB]);
          }

          crane.scheduleTimeout(() => {
            // Lower block down onto platform
            crane.setTargetBlockVal(valA);
            crane.setClawLowered(true);

            crane.scheduleTimeout(() => {
              // Release & retract claw
              crane.setClawGrabbing(false);

              crane.scheduleTimeout(() => {
                crane.setClawLowered(false);
                crane.setLiftedIndices([]);
                crane.setAnimatingSwap(false);
              }, 350);
            }, 350);
          }, 1200);
        }, 1150);
      }, 450);
    } else {
      crane.setClawLowered(false);
      crane.setClawGrabbing(false);
      crane.setLiftedIndices([]);

      if (step.type === 'sorted') {
        setIsSorted(true);
        playWin();
        crane.scheduleTimeout(() => setShowWinModal(true), 800);
      }
    }

    setCurrentStepIdx(stepIdx);
  }, [steps, array, crane, playWin, playStep, playPickup]);

  // ── Auto-play timer ───────────────────────────────────────────────────────
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying && !crane.animatingSwap) {
      timer = setTimeout(() => {
        if (currentStepIdx < steps.length - 1) {
          runAutoStep(currentStepIdx + 1);
        } else {
          setIsPlaying(false);
        }
      }, speed);
    }
    return () => { if (timer) clearTimeout(timer); };
  }, [isPlaying, currentStepIdx, steps, speed, runAutoStep, crane.animatingSwap]);

  // ── Block click handler (play mode) ───────────────────────────────────────
  const handleBlockClick = useCallback((idx: number) => {
    if (mode !== 'play' || crane.animatingSwap || isSorted) return;
    playTap();

    if (selectedIdx === null) {
      setSelectedIdx(idx);
      setMascotMessage(`Selected cube ${array[idx].value}. Click its neighbor to swap!`);
      const slotWidth = 100 / array.length;
      crane.setCraneX(idx * slotWidth + slotWidth / 2);
    } else {
      const diff = Math.abs(selectedIdx - idx);
      if (diff === 1) {
        triggerManualSwap(selectedIdx, idx);
      } else if (selectedIdx === idx) {
        setSelectedIdx(null);
        setMascotMessage("Deselected. Click a cube to select it.");
      } else {
        setSelectedIdx(idx);
        setMascotMessage(`Can only swap adjacent cubes. Selected cube ${array[idx].value}.`);
        const slotWidth = 100 / array.length;
        crane.setCraneX(idx * slotWidth + slotWidth / 2);
      }
    }
  }, [mode, crane, isSorted, selectedIdx, array, playTap, triggerManualSwap]);

  // ── Reset ─────────────────────────────────────────────────────────────────
  const resetState = useCallback(() => {
    crane.clearAllTimeouts();
    const initialArr = DEFAULT_ARRAY.map((val, idx) => ({ id: val, value: val, originalIdx: idx }));
    setArray(initialArr);
    setSelectedIdx(null);
    setMoveCount(0);
    setIsSorted(false);
    setShowWinModal(false);
    setCurrentStepIdx(0);
    setIsPlaying(false);
    crane.resetCrane();
    setActiveCodeLine(-1);
    setStepsOverride(null); // restore built-in steps

    if (mode === 'play') {
      setMascotMessage("Swap adjacent cubes to sort them manually, or switch to Auto Sort!");
    } else {
      generateSteps(DEFAULT_ARRAY);
      setMascotMessage("Click 'Play' to watch the gantry crane run JavaScript Bubble Sort step-by-step.");
    }
  }, [crane, mode, generateSteps]);

  // ── Toggle mode ───────────────────────────────────────────────────────────
  const toggleMode = useCallback((newMode: 'play' | 'auto') => {
    playTap();
    setMode(newMode);
    crane.clearAllTimeouts();
    const initialArr = DEFAULT_ARRAY.map((val, idx) => ({ id: val, value: val, originalIdx: idx }));
    setArray(initialArr);
    setSelectedIdx(null);
    setMoveCount(0);
    setIsSorted(false);
    setShowWinModal(false);
    setCurrentStepIdx(0);
    setIsPlaying(false);
    crane.resetCrane();
    setActiveCodeLine(-1);
    setStepsOverride(null); // restore built-in steps

    if (newMode === 'play') {
      setMascotMessage("Swap adjacent cubes to sort them manually, or switch to Auto Sort!");
    } else {
      generateSteps(DEFAULT_ARRAY);
      setMascotMessage("Click 'Play' to watch the gantry crane run JavaScript Bubble Sort step-by-step.");
    }
  }, [crane, playTap, generateSteps]);

  // ── Run user code ─────────────────────────────────────────────────────────
  const handleRunCode = useCallback((newSteps: SortStep[]) => {
    // Stop any ongoing animation
    crane.clearAllTimeouts();
    // Reset game state
    const initialArr = DEFAULT_ARRAY.map((val, idx) => ({ id: val, value: val, originalIdx: idx }));
    setArray(initialArr);
    setSelectedIdx(null);
    setMoveCount(0);
    setIsSorted(false);
    setShowWinModal(false);
    setIsPlaying(false);
    crane.resetCrane();
    setActiveCodeLine(-1);
    // Switch to auto mode
    setMode('auto');
    // Inject user's generated steps
    stepsOverrideRef.current = newSteps;
    setStepsOverride(newSteps);
    setCurrentStepIdx(0);
    setMascotMessage('▶ Play dabao — crane aapke code ke steps follow karegi!');
  }, [crane]);

  return {
    // Mode
    mode,
    // Game
    array, selectedIdx, moveCount, isSorted, showWinModal,
    // Visualizer
    steps, currentStepIdx, setCurrentStepIdx, isPlaying, setIsPlaying, speed, setSpeed,
    // UI
    mascotMessage, activeCodeLine,
    // Crane (spread from sub-hook)
    ...crane,
    // Derived crane values
    wireLength, clawTop, slotWidthPercent, isGrabbingAny,
    // Workspace
    workspaceRef, workspaceHeight,
    // Handlers
    handleBlockClick, runAutoStep, toggleMode, resetState, handleRunCode,
    // Win
    handleLevelSuccessContinue,
    playTap,
  };
}
