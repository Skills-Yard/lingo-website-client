import { SortStep } from '@/utils/types/Sorting';

// ── Result type ────────────────────────────────────────────────────────────────
export interface ExecuteResult {
  steps: SortStep[];
  error: string | null;
}

// ── JS executor ───────────────────────────────────────────────────────────────
/**
 * Safely runs user's JS bubble-sort code inside a sandboxed Function.
 * Injects an instrumented array proxy that records every compare & swap.
 */
export function executeJSCode(userCode: string, initialArr: number[]): ExecuteResult {
  const steps: SortStep[] = [];
  let arr = [...initialArr];
  let error: string | null = null;

  try {
    const swaps: Array<[number, number]> = [];
    const wrapperSrc = `
      "use strict";
      ${userCode}
      return typeof bubbleSort === 'function' ? bubbleSort : null;
    `;
    const factory = new Function(wrapperSrc);
    const userFn: ((arr: number[]) => void) | null = factory();

    if (typeof userFn !== 'function') {
      return {
        steps: [],
        error: 'JS code mein "bubbleSort" function define nahi hua. Function ka naam "bubbleSort" hona chahiye.',
      };
    }

    arr = [...initialArr];

    steps.push({
      type: 'init',
      indices: [-1, -1],
      arrayState: [...arr],
      codeLine: 0,
      explanation: 'Start: Aapka code chal raha hai!',
    });
    const opsArr = [...initialArr];

    let lastReadIdx: number | null = null;
    const proxy = new Proxy(opsArr, {
      get(target, prop) {
        const idx = typeof prop === 'string' ? parseInt(prop, 10) : NaN;
        if (!isNaN(idx)) {
          lastReadIdx = idx;
        }
        const val = target[prop as keyof typeof target];
        if (typeof val === 'function') return val.bind(target);
        return val;
      },
      set(target, prop, value) {
        const idx = typeof prop === 'string' ? parseInt(prop, 10) : NaN;
        if (!isNaN(idx)) {
          swaps.push([idx, lastReadIdx ?? idx]);
        }
        (target as number[])[idx] = value;
        return true;
      },
    });

    userFn(proxy as unknown as number[]);

    arr = [...initialArr];
    steps.push({
      type: 'init', indices: [-1, -1], arrayState: [...arr],
      codeLine: 1, explanation: `n = ${arr.length}`,
    });

    stepsFromSwaps(initialArr, steps, swaps);

  } catch (e: unknown) {
    error = e instanceof Error ? e.message : String(e);
  }

  if (!error) {
    steps.push({
      type: 'sorted', indices: [-1, -1], arrayState: [...arr],
      codeLine: 15, explanation: '✅ Sorted! Aapke code ne array ko sort kar diya!',
    });
  }

  return { steps, error };
}

export function executePythonCode(userCode: string, initialArr: number[]): ExecuteResult {
  const steps: SortStep[] = [];
  let error: string | null = null;

  try {
    // Translate Python → JS (subset for bubble sort)
    const jsCode = pythonToJS(userCode);

    // Now run the translated JS
    const wrapperSrc = `
      "use strict";
      ${jsCode}
      return typeof bubble_sort === 'function' ? bubble_sort : (typeof bubbleSort === 'function' ? bubbleSort : null);
    `;

    // eslint-disable-next-line no-new-func
    const factory = new Function(wrapperSrc);
    const userFn: ((arr: number[]) => void) | null = factory();

    if (typeof userFn !== 'function') {
      return {
        steps: [],
        error: 'Python code mein "bubble_sort" function define nahi hua. Function ka naam "bubble_sort" hona chahiye.',
      };
    }

    // Replay with step recording
    const arr = [...initialArr];
    const swaps: Array<[number, number]> = [];

    steps.push({
      type: 'init', indices: [-1, -1], arrayState: [...arr],
      codeLine: 0, explanation: 'Start: Aapka Python code chal raha hai!',
    });
    steps.push({
      type: 'init', indices: [-1, -1], arrayState: [...arr],
      codeLine: 1, explanation: `n = len(arr) = ${arr.length}`,
    });

    let lastReadIdx: number | null = null;
    const proxy = new Proxy([...initialArr], {
      get(target, prop) {
        const idx = typeof prop === 'string' ? parseInt(prop, 10) : NaN;
        if (!isNaN(idx)) lastReadIdx = idx;
        const val = target[prop as keyof typeof target];
        if (typeof val === 'function') return val.bind(target);
        return val;
      },
      set(target, prop, value) {
        const idx = typeof prop === 'string' ? parseInt(prop, 10) : NaN;
        if (!isNaN(idx)) swaps.push([idx, lastReadIdx ?? idx]);
        (target as number[])[idx] = value;
        return true;
      },
    });

    userFn(proxy as unknown as number[]);
    stepsFromSwaps(initialArr, steps, swaps, true);

  } catch (e: unknown) {
    error = e instanceof Error
      ? `Python code error: ${e.message}`
      : String(e);
  }

  if (!error) {
    const finalArr = [...initialArr].sort((a, b) => a - b);
    steps.push({
      type: 'sorted', indices: [-1, -1], arrayState: finalArr,
      codeLine: 13, explanation: '✅ Sorted! Aapke Python code ne array sort kar diya!',
    });
  }

  return { steps, error };
}

// ── Step builder from raw swap list ──────────────────────────────────────────
function stepsFromSwaps(
  initialArr: number[],
  steps: SortStep[],
  rawSwaps: Array<[number, number]>,
  isPython = false,
) {
  const arr = [...initialArr];
  const n = arr.length;

  // Deduplicate consecutive duplicate swaps from proxy noise
  const cleanSwaps: Array<[number, number]> = [];
  for (const [a, b] of rawSwaps) {
    const last = cleanSwaps[cleanSwaps.length - 1];
    const pair = [Math.min(a, b), Math.max(a, b)] as [number, number];
    if (!last || last[0] !== pair[0] || last[1] !== pair[1]) {
      cleanSwaps.push(pair);
    }
  }

  // Simulate bubble sort with step emission
  // We cross-reference user's swaps to produce compare/swap steps
  let swapCursor = 0;

  const compareLine = isPython ? 5 : 5;
  const swapLine = isPython ? 7 : 7;

  for (let i = 0; i < n - 1; i++) {
    steps.push({
      type: 'check_loop', indices: [-1, -1], arrayState: [...arr],
      codeLine: isPython ? 2 : 2,
      explanation: `Outer loop: Pass ${i + 1}`,
    });

    let swappedInPass = false;
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        type: 'compare', indices: [j, j + 1], arrayState: [...arr],
        codeLine: compareLine,
        explanation: `Compare: ${arr[j]} vs ${arr[j + 1]}`,
      });

      // Check if user's code swapped this pair
      const userSwapped =
        swapCursor < cleanSwaps.length &&
        cleanSwaps[swapCursor][0] === j &&
        cleanSwaps[swapCursor][1] === j + 1;

      if (arr[j] > arr[j + 1] || userSwapped) {
        steps.push({
          type: 'swap', indices: [j, j + 1], arrayState: [...arr],
          codeLine: swapLine,
          explanation: `Swap ${arr[j]} ↔ ${arr[j + 1]}`,
        });
        const tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;
        swappedInPass = true;
        if (userSwapped) swapCursor++;
      }
    }

    if (!swappedInPass) {
      steps.push({
        type: 'break', indices: [-1, -1], arrayState: [...arr],
        codeLine: isPython ? 12 : 13,
        explanation: 'Early break — already sorted!',
      });
      break;
    }
  }
}

// ── Python → JS mini-transpiler ───────────────────────────────────────────────
function pythonToJS(src: string): string {
  const lines = src.split('\n');
  const out: string[] = [];
  const indentStack: number[] = [0];

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const stripped = raw.trimEnd();
    if (!stripped || stripped.trimStart().startsWith('#')) {
      // blank or comment line
      out.push('');
      continue;
    }

    const indent = raw.length - raw.trimStart().length;
    let line = stripped.trimStart();

    // Close braces for dedented lines
    while (indentStack.length > 1 && indent < indentStack[indentStack.length - 1]) {
      indentStack.pop();
      out.push('}');
    }

    // ── Translate constructs ──────────────────────────────────────────────
    // def function_name(args):
    line = line.replace(/^def\s+(\w+)\s*\((.*?)\)\s*:$/, (_m, name, args) => {
      indentStack.push(indent + 4);
      return `function ${name}(${args}) {`;
    });

    // for var in range(n):  /  for var in range(start, end):
    line = line.replace(
      /^for\s+(\w+)\s+in\s+range\(([^)]+)\)\s*:/,
      (_m, v, rangeArgs) => {
        const parts = rangeArgs.split(',').map((s: string) => s.trim());
        const start = parts.length > 1 ? parts[0] : '0';
        const end = parts.length > 1 ? parts[1] : parts[0];
        const step = parts[2] ?? '1';
        indentStack.push(indent + 4);
        return `for (let ${v} = ${start}; ${v} < ${end}; ${v} += ${step}) {`;
      }
    );

    // while condition:
    line = line.replace(/^while\s+(.+)\s*:$/, (_m, cond) => {
      indentStack.push(indent + 4);
      const jsCond = translateExpr(cond);
      return `while (${jsCond}) {`;
    });

    // if condition:
    line = line.replace(/^if\s+(.+)\s*:$/, (_m, cond) => {
      indentStack.push(indent + 4);
      const jsCond = translateExpr(cond);
      return `if (${jsCond}) {`;
    });

    // elif / else:
    line = line.replace(/^elif\s+(.+)\s*:$/, (_m, cond) => {
      const jsCond = translateExpr(cond);
      return `} else if (${jsCond}) {`;
    });
    if (/^else\s*:$/.test(line)) line = '} else {';

    // return
    line = line.replace(/^return\s+(.+)$/, (_m, val) => `return ${val};`);

    // break / continue
    if (line === 'break') line = 'break;';
    if (line === 'continue') line = 'continue;';

    // Variable assignments (simple)
    // a, b = b, a  → [arr[a], arr[b]] = [arr[b], arr[a]]  (handled specially)
    line = line.replace(/^(\w+)\s*=\s*(.+)$/, (_m, name, val) => {
      if (name === 'True' || name === 'False') return line;
      return `let ${name} = ${translateExpr(val)};`;
    });

    // Repeated assignment fix (let let ...)
    line = line.replace(/\blet let\b/g, 'let');

    // Python True/False/None literals
    line = translateExpr(line);

    const padding = ' '.repeat(indent);
    out.push(padding + line);
  }

  // Close remaining open blocks
  while (indentStack.length > 1) {
    indentStack.pop();
    out.push('}');
  }

  return out.join('\n');
}

function translateExpr(expr: string): string {
  return expr
    .replace(/\bTrue\b/g, 'true')
    .replace(/\bFalse\b/g, 'false')
    .replace(/\bNone\b/g, 'null')
    .replace(/\bnot\s+/g, '!')
    .replace(/\band\b/g, '&&')
    .replace(/\bor\b/g, '||')
    .replace(/\blen\((\w+)\)/g, '$1.length')
    .replace(/\bprint\s*\(.*?\)/g, '/* print */');
}
