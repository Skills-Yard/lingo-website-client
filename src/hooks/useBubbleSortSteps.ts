import { DEFAULT_ARRAY } from '@/utils/constants/constants';
import { SortStep } from '@/utils/types/Sorting';
import { useCallback, useState, useEffect } from 'react';

/**
 * Generates and stores all bubble sort steps for the visualizer.
 */
export function useBubbleSortSteps() {
  const [steps, setSteps] = useState<SortStep[]>([]);

  const generateSteps = useCallback((initialValues: number[]) => {
    let arr = [...initialValues];
    const n = arr.length;
    const s: SortStep[] = [];

    s.push({ type: 'init', indices: [-1, -1], arrayState: [...arr], codeLine: 0, explanation: "Start: Welcome to Bubble Sort! Let's sort the 3D blocks." });
    s.push({ type: 'init', indices: [-1, -1], arrayState: [...arr], codeLine: 1, explanation: `Initialize array length n = ${n}.` });

    for (let i = 0; i < n - 1; i++) {
      s.push({ type: 'check_loop', indices: [-1, -1], arrayState: [...arr], codeLine: 2, explanation: `Outer Loop: Pass ${i + 1} begins. Sorting elements up to index ${n - i - 1}.` });
      s.push({ type: 'init', indices: [-1, -1], arrayState: [...arr], codeLine: 3, explanation: "Set swapped = false. We haven't swapped anything yet in this pass." });

      let swappedInPass = false;

      for (let j = 0; j < n - i - 1; j++) {
        s.push({ type: 'compare', indices: [j, j + 1], arrayState: [...arr], codeLine: 4, explanation: `Inner Loop: Compare index ${j} and ${j + 1}.` });
        s.push({ type: 'compare', indices: [j, j + 1], arrayState: [...arr], codeLine: 5, explanation: `Check: Is ${arr[j]} > ${arr[j + 1]}?` });

        if (arr[j] > arr[j + 1]) {
          s.push({ type: 'swap', indices: [j, j + 1], arrayState: [...arr], codeLine: 7, explanation: `Yes! ${arr[j]} > ${arr[j + 1]}. The crane claw will swap them!` });
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swappedInPass = true;
          s.push({ type: 'init', indices: [j, j + 1], arrayState: [...arr], codeLine: 10, explanation: `Elements swapped successfully. Set swapped = true.` });
        }
      }

      s.push({ type: 'check_loop', indices: [-1, -1], arrayState: [...arr], codeLine: 13, explanation: `Check pass completion. Did we swap any elements? ${swappedInPass ? 'Yes' : 'No'}.` });

      if (!swappedInPass) {
        s.push({ type: 'break', indices: [-1, -1], arrayState: [...arr], codeLine: 13, explanation: "No elements were swapped in this pass. The array is fully sorted! Breaking early." });
        break;
      }
    }

    s.push({ type: 'sorted', indices: [-1, -1], arrayState: [...arr], codeLine: 15, explanation: "Sorted! All numbers are in perfect order." });
    setSteps(s);
  }, []);

  useEffect(() => {
    generateSteps(DEFAULT_ARRAY);
  }, [generateSteps]);

  return { steps, generateSteps };
}
