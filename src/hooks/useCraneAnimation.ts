import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Manages all crane/claw animation state and the robust timeout scheduler
 * that prevents animation conflicts during rapid interactions.
 */
export function useCraneAnimation() {
  const [craneX, setCraneX] = useState(50);
  const [clawLowered, setClawLowered] = useState(false);
  const [clawGrabbing, setClawGrabbing] = useState(false);
  const [targetBlockVal, setTargetBlockVal] = useState(4);
  const [liftedIndices, setLiftedIndices] = useState<number[]>([]);
  const [liftedHeight, setLiftedHeight] = useState(0);
  const [animatingSwap, setAnimatingSwap] = useState(false);

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const scheduleTimeout = useCallback((fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  // Cleanup pending timeouts on unmount
  useEffect(() => {
    return () => clearAllTimeouts();
  }, [clearAllTimeouts]);

  const resetCrane = useCallback(() => {
    setCraneX(50);
    setClawLowered(false);
    setClawGrabbing(false);
    setTargetBlockVal(4);
    setLiftedIndices([]);
    setLiftedHeight(0);
    setAnimatingSwap(false);
  }, []);

  return {
    craneX, setCraneX,
    clawLowered, setClawLowered,
    clawGrabbing, setClawGrabbing,
    targetBlockVal, setTargetBlockVal,
    liftedIndices, setLiftedIndices,
    liftedHeight, setLiftedHeight,
    animatingSwap, setAnimatingSwap,
    scheduleTimeout,
    clearAllTimeouts,
    resetCrane,
  };
}
