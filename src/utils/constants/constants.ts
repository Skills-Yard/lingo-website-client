export const DEFAULT_ARRAY = [6, 2, 8, 3, 5, 7, 4, 1];

export const CODE_LINES = [
  "function bubbleSort(arr) {",   // 0
  "  let n = arr.length;",         // 1
  "  for (let i = 0; i < n - 1; i++) {",    // 2
  "    let swapped = false;",      // 3
  "    for (let j = 0; j < n - i - 1; j++) {", // 4
  "      if (arr[j] > arr[j + 1]) {",        // 5
  "        // Swap elements",      // 6
  "        let temp = arr[j];",    // 7
  "        arr[j] = arr[j + 1];", // 8
  "        arr[j + 1] = temp;",   // 9
  "        swapped = true;",       // 10
  "      }",                       // 11
  "    }",                         // 12
  "    if (!swapped) break;",      // 13
  "  }",                           // 14
  "}",                             // 15
];

export const PYTHON_CODE_LINES = [
  "def bubble_sort(arr):",            // 0
  "    n = len(arr)",                 // 1
  "    for i in range(n - 1):",       // 2
  "        swapped = False",          // 3
  "        for j in range(n-i-1):",   // 4
  "            if arr[j] > arr[j+1]:", // 5
  "                # Swap elements",  // 6
  "                temp = arr[j]",    // 7
  "                arr[j] = arr[j+1]", // 8
  "                arr[j+1] = temp",  // 9
  "                swapped = True",   // 10
  "",                                 // 11
  "        if not swapped:",          // 12
  "            break",                // 13
];
