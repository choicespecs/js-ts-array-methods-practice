import type { Problem } from "../types";

export const problems: Problem[] = [
  // ---------------------------------------------------------------- forEach
  // forEach itself returns undefined, so these are written as an IIFE — an
  // expression that still lets you run forEach and see a real result.
  {
    id: "forEach-1",
    methodId: "forEach",
    title: "Sum with forEach",
    difficulty: "easy",
    prompt: "Using forEach inside the IIFE below, compute the sum of every number in `nums`.",
    context: { nums: [4, 8, 15, 16, 23, 42] },
    starterExpression: `(() => {
  let total = 0;
  // use nums.forEach(...) to add each number to total
  return total;
})()`,
    solutionExpression: `(() => {
  let total = 0;
  nums.forEach(n => { total += n; });
  return total;
})()`,
    reference: ({ nums }) => (nums as number[]).reduce((a, b) => a + b, 0),
    hints: [
      "forEach doesn't return anything useful — total has to be a variable declared before the call that the callback mutates.",
      "Inside the callback, add the current element to total: `total += n`.",
    ],
  },
  {
    id: "forEach-2",
    methodId: "forEach",
    title: "Word frequency counter",
    difficulty: "medium",
    prompt: "Using forEach inside the IIFE, build an object counting how many times each word in `words` appears.",
    context: { words: ["cat", "dog", "cat", "cat", "dog", "bird"] },
    starterExpression: `(() => {
  const counts = {};
  // for each word, increment counts[word]
  return counts;
})()`,
    solutionExpression: `(() => {
  const counts = {};
  words.forEach(w => { counts[w] = (counts[w] || 0) + 1; });
  return counts;
})()`,
    reference: ({ words }) => {
      const c: Record<string, number> = {};
      (words as string[]).forEach((w) => (c[w] = (c[w] || 0) + 1));
      return c;
    },
    hints: [
      "Start each word's count at 0 the first time you see it, then add 1 every time.",
      "`counts[w] = (counts[w] || 0) + 1` handles both 'first time' and 'seen before' in one line.",
    ],
  },

  // -------------------------------------------------------------------- map
  {
    id: "map-1",
    methodId: "map",
    title: "Double every number",
    difficulty: "easy",
    prompt: "Write an expression that returns a new array with every number in `nums` doubled.",
    context: { nums: [1, 2, 3, 4, 5] },
    starterExpression: "nums",
    solutionExpression: "nums.map(n => n * 2)",
    reference: ({ nums }) => (nums as number[]).map((n) => n * 2),
    hints: ["map takes a callback and returns a new array of the same length.", "The callback here is `n => n * 2`."],
  },
  {
    id: "map-2",
    methodId: "map",
    title: "Extract a property",
    difficulty: "medium",
    prompt: "Return an array of just the `name` values from `people`, in the same order.",
    context: {
      people: [
        { name: "Ada", age: 36 },
        { name: "Grace", age: 85 },
        { name: "Alan", age: 41 },
      ],
    },
    starterExpression: "people",
    solutionExpression: "people.map(p => p.name)",
    reference: ({ people }) => (people as { name: string }[]).map((p) => p.name),
    hints: ["Your callback receives each person object — pull `.name` off of it and return that."],
  },
  {
    id: "map-3",
    methodId: "map",
    title: "Label with position",
    difficulty: "hard",
    prompt: 'Return an array of strings like "1. Apple" — use the index argument map\'s callback receives.',
    context: { items: ["Apple", "Banana", "Cherry"] },
    starterExpression: "items.map((item, index) => item)",
    solutionExpression: "items.map((item, index) => `${index + 1}. ${item}`)",
    reference: ({ items }) => (items as string[]).map((it, i) => `${i + 1}. ${it}`),
    hints: [
      "The callback's second parameter is the zero-based index — add 1 to make it 1-based.",
      "Build the string with a template literal: `` `${index + 1}. ${item}` ``.",
    ],
  },

  // ---------------------------------------------------------------- filter
  {
    id: "filter-1",
    methodId: "filter",
    title: "Only even numbers",
    difficulty: "easy",
    prompt: "Return only the even numbers from `nums`, in their original order.",
    context: { nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    starterExpression: "nums",
    solutionExpression: "nums.filter(n => n % 2 === 0)",
    reference: ({ nums }) => (nums as number[]).filter((n) => n % 2 === 0),
    hints: ["A number is even when `n % 2 === 0`.", "filter's callback should return that boolean directly."],
  },
  {
    id: "filter-2",
    methodId: "filter",
    title: "Filter by property",
    difficulty: "medium",
    prompt: "Return only the products with `quantity` greater than 0.",
    context: {
      products: [
        { name: "Widget", quantity: 5 },
        { name: "Gadget", quantity: 0 },
        { name: "Gizmo", quantity: 2 },
      ],
    },
    starterExpression: "products",
    solutionExpression: "products.filter(p => p.quantity > 0)",
    reference: ({ products }) => (products as { quantity: number }[]).filter((p) => p.quantity > 0),
    hints: ["Access `.quantity` on each product inside the callback and compare it to 0."],
  },
  {
    id: "filter-3",
    methodId: "filter",
    title: "Remove duplicates",
    difficulty: "hard",
    prompt: "Remove duplicate values from `nums`, keeping only each value's first occurrence — using filter + indexOf.",
    context: { nums: [1, 2, 2, 3, 1, 4, 4, 5] },
    starterExpression: "nums",
    solutionExpression: "nums.filter((n, i) => nums.indexOf(n) === i)",
    reference: ({ nums }) => (nums as number[]).filter((n, i) => (nums as number[]).indexOf(n) === i),
    hints: [
      "`nums.indexOf(n)` always returns the *first* index where `n` appears.",
      "If that first index equals the current index `i`, this is the first time we've seen the value — keep it.",
    ],
  },

  // ---------------------------------------------------------------- reduce
  {
    id: "reduce-1",
    methodId: "reduce",
    title: "Sum with reduce",
    difficulty: "easy",
    prompt: "Return the sum of every number in `nums`, using reduce.",
    context: { nums: [1, 2, 3, 4, 5] },
    starterExpression: "nums",
    solutionExpression: "nums.reduce((sum, n) => sum + n, 0)",
    reference: ({ nums }) => (nums as number[]).reduce((s, n) => s + n, 0),
    hints: [
      "reduce's callback takes `(accumulator, element)` and must return the new accumulator.",
      "Start the accumulator at `0`, the second argument to reduce.",
    ],
  },
  {
    id: "reduce-2",
    methodId: "reduce",
    title: "Count occurrences",
    difficulty: "medium",
    prompt: "Return an object mapping each distinct item in `items` to how many times it occurs, built entirely with reduce.",
    context: { items: ["cat", "dog", "cat", "cat", "dog"] },
    starterExpression: `items.reduce((counts, item) => {
  return counts;
}, {})`,
    solutionExpression: `items.reduce((counts, item) => {
  counts[item] = (counts[item] || 0) + 1;
  return counts;
}, {})`,
    reference: ({ items }) => (items as string[]).reduce((c: Record<string, number>, i) => ((c[i] = (c[i] || 0) + 1), c), {}),
    hints: [
      "The accumulator is the object you're building — mutate it and then `return counts;` each time.",
      "`counts[item] = (counts[item] || 0) + 1` is the same increment trick as a frequency counter.",
    ],
  },
  {
    id: "reduce-3",
    methodId: "reduce",
    title: "Flatten with reduce",
    difficulty: "hard",
    prompt: "Flatten `groups` one level deep using reduce + concat — pretend `.flat()` doesn't exist.",
    context: { groups: [[1, 2], [3], [4, 5, 6]] },
    starterExpression: `groups.reduce((flat, sub) => {
  return flat;
}, [])`,
    solutionExpression: "groups.reduce((flat, sub) => flat.concat(sub), [])",
    reference: ({ groups }) => (groups as number[][]).reduce((flat: number[], sub) => flat.concat(sub), []),
    hints: [
      "Start the accumulator as an empty array `[]`.",
      "Each step, merge the running array with the current sub-array using `.concat(sub)`.",
    ],
  },

  // ------------------------------------------------------------------ find
  {
    id: "find-1",
    methodId: "find",
    title: "First even number",
    difficulty: "easy",
    prompt: "Return the first even number in `nums`, or `undefined` if there is none.",
    context: { nums: [1, 3, 4, 5, 6] },
    starterExpression: "nums",
    solutionExpression: "nums.find(n => n % 2 === 0)",
    reference: ({ nums }) => (nums as number[]).find((n) => n % 2 === 0),
    hints: ["find returns the element itself as soon as the callback is truthy — not an array."],
  },
  {
    id: "find-2",
    methodId: "find",
    title: "Find user by id",
    difficulty: "medium",
    prompt: "Return the user object whose `id` matches `targetId`, or `undefined`.",
    context: {
      users: [
        { id: 1, name: "Ada" },
        { id: 2, name: "Grace" },
      ],
      targetId: 2,
    },
    starterExpression: "users",
    solutionExpression: "users.find(u => u.id === targetId)",
    reference: ({ users, targetId }) => (users as { id: number }[]).find((u) => u.id === targetId),
    hints: ["Your callback receives each user — compare `u.id === targetId`."],
  },

  // ------------------------------------------------------------- findIndex
  {
    id: "findIndex-1",
    methodId: "findIndex",
    title: "Index of first negative",
    difficulty: "easy",
    prompt: "Return the index of the first negative number in `nums`, or `-1`.",
    context: { nums: [5, 3, -2, 8] },
    starterExpression: "nums",
    solutionExpression: "nums.findIndex(n => n < 0)",
    reference: ({ nums }) => (nums as number[]).findIndex((n) => n < 0),
    hints: ["findIndex already returns -1 for you when nothing matches — no need to handle that case yourself."],
  },
  {
    id: "findIndex-2",
    methodId: "findIndex",
    title: "Index of matching task",
    difficulty: "medium",
    prompt: "Return the index of the first completed task in `tasks`, or `-1`.",
    context: {
      tasks: [
        { title: "a", done: false },
        { title: "b", done: true },
        { title: "c", done: true },
      ],
    },
    starterExpression: "tasks",
    solutionExpression: "tasks.findIndex(t => t.done)",
    reference: ({ tasks }) => (tasks as { done: boolean }[]).findIndex((t) => t.done),
    hints: ["The callback can simply return `t.done` — it's already a boolean."],
  },

  // ----------------------------------------------------------------- some
  {
    id: "some-1",
    methodId: "some",
    title: "Any negative numbers?",
    difficulty: "easy",
    prompt: "Return `true` if any number in `nums` is negative.",
    context: { nums: [1, 2, -3] },
    starterExpression: "nums",
    solutionExpression: "nums.some(n => n < 0)",
    reference: ({ nums }) => (nums as number[]).some((n) => n < 0),
    hints: ["some short-circuits as soon as one element passes — perfect for yes/no questions."],
  },
  {
    id: "some-2",
    methodId: "some",
    title: "Any out-of-stock items?",
    difficulty: "medium",
    prompt: "Return `true` if any product in `products` has `quantity === 0`.",
    context: {
      products: [
        { name: "a", quantity: 3 },
        { name: "b", quantity: 0 },
      ],
    },
    starterExpression: "products",
    solutionExpression: "products.some(p => p.quantity === 0)",
    reference: ({ products }) => (products as { quantity: number }[]).some((p) => p.quantity === 0),
    hints: ["Same shape as the numeric version — just check `p.quantity === 0` instead."],
  },

  // ---------------------------------------------------------------- every
  {
    id: "every-1",
    methodId: "every",
    title: "All positive?",
    difficulty: "easy",
    prompt: "Return `true` only if every number in `nums` is greater than 0.",
    context: { nums: [1, 2, 3] },
    starterExpression: "nums",
    solutionExpression: "nums.every(n => n > 0)",
    reference: ({ nums }) => (nums as number[]).every((n) => n > 0),
    hints: ["Remember: every returns true on an empty array — that's expected, not a bug."],
  },
  {
    id: "every-2",
    methodId: "every",
    title: "All tasks done?",
    difficulty: "medium",
    prompt: "Return `true` only if every task in `tasks` is done.",
    context: {
      tasks: [
        { title: "a", done: true },
        { title: "b", done: true },
      ],
    },
    starterExpression: "tasks",
    solutionExpression: "tasks.every(t => t.done)",
    reference: ({ tasks }) => (tasks as { done: boolean }[]).every((t) => t.done),
    hints: ["Same idea as allPositive, but checking `t.done` on each task."],
  },

  // ------------------------------------------------------------- includes
  {
    id: "includes-1",
    methodId: "includes",
    title: "Contains value?",
    difficulty: "easy",
    prompt: "Return `true` if `nums` contains `target` — even when `target` is `NaN`.",
    context: { nums: [1, NaN, 3], target: NaN },
    contextCode: "const nums = [1, NaN, 3];\nconst target = NaN;",
    starterExpression: "nums",
    solutionExpression: "nums.includes(target)",
    reference: ({ nums, target }) => (nums as number[]).includes(target as number),
    hints: ["includes takes the value to search for directly — no callback needed.", "Unlike indexOf, includes correctly finds NaN."],
  },

  // -------------------------------------------------------------- indexOf
  {
    id: "indexOf-1",
    methodId: "indexOf",
    title: "First index of value",
    difficulty: "easy",
    prompt: "Return the first index of `target` in `arr`, or `-1`.",
    context: { arr: ["a", "b", "c"], target: "b" },
    starterExpression: "arr",
    solutionExpression: "arr.indexOf(target)",
    reference: ({ arr, target }) => (arr as unknown[]).indexOf(target),
    hints: ["indexOf compares with strict equality (===) and returns -1 automatically when nothing matches."],
  },
  {
    id: "indexOf-2",
    methodId: "indexOf",
    title: "Search starting from an index",
    difficulty: "medium",
    prompt: "Return the first index of `target` in `arr` at or after position `from`.",
    context: { arr: [1, 2, 1, 2, 1], target: 1, from: 1 },
    starterExpression: "arr",
    solutionExpression: "arr.indexOf(target, from)",
    reference: ({ arr, target, from }) => (arr as unknown[]).indexOf(target, from as number),
    hints: ["indexOf's second parameter tells it where in the array to start looking."],
  },

  // ----------------------------------------------------------------- sort
  {
    id: "sort-1",
    methodId: "sort",
    title: "Sort numbers ascending",
    difficulty: "easy",
    prompt: "Return a *new* array with `nums` sorted ascending, without mutating the original (copy first!).",
    context: { nums: [10, 1, 21, 2] },
    starterExpression: "[...nums].sort((a, b) => a - b)",
    solutionExpression: "[...nums].sort((a, b) => a - b)",
    reference: ({ nums }) => [...(nums as number[])].sort((a, b) => a - b),
    hints: [
      "Plain `.sort()` compares elements as strings — always pass a compare function for numbers.",
      "`(a, b) => a - b` sorts ascending: negative means a comes first.",
    ],
  },
  {
    id: "sort-2",
    methodId: "sort",
    title: "Sort strings by length",
    difficulty: "medium",
    prompt: "Return a new array of `words` sorted shortest to longest.",
    context: { words: ["banana", "fig", "apple"] },
    starterExpression: "[...words].sort((a, b) => a.length - b.length)",
    solutionExpression: "[...words].sort((a, b) => a.length - b.length)",
    reference: ({ words }) => [...(words as string[])].sort((a, b) => a.length - b.length),
    hints: ["Same pattern as sorting numbers, but compare `.length` instead of the values directly."],
  },
  {
    id: "sort-3",
    methodId: "sort",
    title: "Sort by two keys",
    difficulty: "hard",
    prompt: "Sort `players` by `score` descending; when scores tie, sort by `name` ascending (alphabetically).",
    context: {
      players: [
        { score: 10, name: "Zed" },
        { score: 30, name: "Amy" },
        { score: 20, name: "Bo" },
        { score: 10, name: "Amy" },
      ],
    },
    starterExpression: `[...players].sort((a, b) => {
  // first compare scores (descending), then fall back to names (ascending)
})`,
    solutionExpression: `[...players].sort((a, b) => {
  if (b.score !== a.score) return b.score - a.score;
  return a.name.localeCompare(b.name);
})`,
    reference: ({ players }) =>
      [...(players as { score: number; name: string }[])].sort((a, b) =>
        b.score !== a.score ? b.score - a.score : a.name.localeCompare(b.name)
      ),
    hints: [
      "Descending score means the higher score should come first: `b.score - a.score`.",
      "Only fall back to comparing names when the scores are equal.",
      "`a.name.localeCompare(b.name)` gives ascending alphabetical order for strings.",
    ],
  },

  // -------------------------------------------------------------- reverse
  {
    id: "reverse-1",
    methodId: "reverse",
    title: "Reverse without mutating",
    difficulty: "easy",
    prompt: "Return a new array with `arr`'s elements in reverse order, leaving `arr` itself untouched.",
    context: { arr: [1, 2, 3, 4] },
    starterExpression: "[...arr].reverse()",
    solutionExpression: "[...arr].reverse()",
    reference: ({ arr }) => [...(arr as unknown[])].reverse(),
    hints: ["`[...arr]` makes a shallow copy so the original array reference is never mutated."],
  },

  // ---------------------------------------------------------------- slice
  {
    id: "slice-1",
    methodId: "slice",
    title: "First n elements",
    difficulty: "easy",
    prompt: "Return the first `n` elements of `arr` as a new array.",
    context: { arr: [1, 2, 3, 4, 5], n: 3 },
    starterExpression: "arr",
    solutionExpression: "arr.slice(0, n)",
    reference: ({ arr, n }) => (arr as unknown[]).slice(0, n as number),
    hints: ["slice(start, end) — end is exclusive, so slice(0, n) gives exactly n elements (or fewer)."],
  },
  {
    id: "slice-2",
    methodId: "slice",
    title: "Last n elements",
    difficulty: "medium",
    prompt: "Return the last `n` elements of `arr` as a new array, using a negative index.",
    context: { arr: [1, 2, 3, 4, 5], n: 2 },
    starterExpression: "arr",
    solutionExpression: "arr.slice(-n)",
    reference: ({ arr, n }) => (arr as unknown[]).slice(-(n as number)),
    hints: ["`arr.slice(-n)` starts n elements from the end and takes everything after that."],
  },

  // --------------------------------------------------------------- splice
  {
    id: "splice-1",
    methodId: "splice",
    title: "Remove at index",
    difficulty: "easy",
    prompt: "Remove the element at `index` from `arr` in place. splice returns the removed elements as an array — return that.",
    context: { arr: [1, 2, 3, 4], index: 1 },
    starterExpression: "arr.splice(index, 1)",
    solutionExpression: "arr.splice(index, 1)",
    reference: ({ arr, index }) => {
      const copy = [...(arr as unknown[])];
      return copy.splice(index as number, 1);
    },
    hints: ["The second argument to splice is the delete count — 1 means remove exactly one element."],
  },
  {
    id: "splice-2",
    methodId: "splice",
    title: "Insert at index",
    difficulty: "medium",
    prompt: "Insert `value` into `arr` at `index` without removing anything, then return the mutated `arr`.",
    context: { arr: [1, 2, 4], index: 2, value: 3 },
    starterExpression: `(() => {
  // arr.splice(index, 0, value) inserts without removing
  return arr;
})()`,
    solutionExpression: `(() => {
  arr.splice(index, 0, value);
  return arr;
})()`,
    reference: ({ arr, index, value }) => {
      const copy = [...(arr as unknown[])];
      copy.splice(index as number, 0, value);
      return copy;
    },
    hints: ["Pass 0 as the deleteCount, then list the value(s) to insert afterward."],
  },

  // --------------------------------------------------------------- concat
  {
    id: "concat-1",
    methodId: "concat",
    title: "Merge two arrays",
    difficulty: "easy",
    prompt: "Return a new array with all elements of `a` followed by all elements of `b`.",
    context: { a: [1, 2], b: [3, 4] },
    starterExpression: "a",
    solutionExpression: "a.concat(b)",
    reference: ({ a, b }) => (a as unknown[]).concat(b as unknown[]),
    hints: ["concat doesn't mutate either input — it always returns a brand-new array."],
  },

  // ----------------------------------------------------------------- flat
  {
    id: "flat-1",
    methodId: "flat",
    title: "Flatten one level",
    difficulty: "easy",
    prompt: "Flatten `arr` one level deep.",
    context: { arr: [1, [2, 3], [4]] },
    starterExpression: "arr",
    solutionExpression: "arr.flat()",
    reference: ({ arr }) => (arr as unknown[]).flat(),
    hints: ["flat()'s default depth is exactly 1."],
  },
  {
    id: "flat-2",
    methodId: "flat",
    title: "Fully flatten",
    difficulty: "medium",
    prompt: "Flatten `arr` completely, however deeply nested it is.",
    context: { arr: [1, [2, [3, [4, [5]]]]] },
    starterExpression: "arr.flat()",
    solutionExpression: "arr.flat(Infinity)",
    reference: ({ arr }) => (arr as unknown[]).flat(Infinity),
    hints: ["Pass `Infinity` as the depth to flatten every level, however deep the nesting goes."],
  },

  // -------------------------------------------------------------- flatMap
  {
    id: "flatMap-1",
    methodId: "flatMap",
    title: "Duplicate each element",
    difficulty: "easy",
    prompt: "Return each number in `nums` twice in a row: `[1, 2]` becomes `[1, 1, 2, 2]`.",
    context: { nums: [1, 2, 3] },
    starterExpression: "nums",
    solutionExpression: "nums.flatMap(n => [n, n])",
    reference: ({ nums }) => (nums as number[]).flatMap((n) => [n, n]),
    hints: ["Return a small array `[n, n]` from the callback — flatMap flattens that one level automatically."],
  },
  {
    id: "flatMap-2",
    methodId: "flatMap",
    title: "Split sentences into words",
    difficulty: "medium",
    prompt: "Return a single flat array of every word across all of `sentences`.",
    context: { sentences: ["hello world", "foo bar baz"] },
    starterExpression: "sentences",
    solutionExpression: 'sentences.flatMap(s => s.split(" "))',
    reference: ({ sentences }) => (sentences as string[]).flatMap((s) => s.split(" ")),
    hints: ['`s.split(" ")` turns one sentence into an array of words; flatMap merges all of those arrays into one.'],
  },

  // ------------------------------------------------------------------ join
  {
    id: "join-1",
    methodId: "join",
    title: "Join with comma",
    difficulty: "easy",
    prompt: 'Join `items` into a single string separated by `", "`.',
    context: { items: ["apple", "banana", "cherry"] },
    starterExpression: "items",
    solutionExpression: 'items.join(", ")',
    reference: ({ items }) => (items as string[]).join(", "),
    hints: ["join's argument is the separator string placed between each element."],
  },
  {
    id: "join-2",
    methodId: "join",
    title: "Build a CSV row",
    difficulty: "medium",
    prompt: 'Join `fields` with commas and no spaces, e.g. `"1,2,3"`.',
    context: { fields: [1, 2, 3] },
    starterExpression: "fields",
    solutionExpression: 'fields.join(",")',
    reference: ({ fields }) => (fields as unknown[]).join(","),
    hints: ["Just a plain comma this time — no space after it."],
  },

  // ======================================================= chain: numbers
  {
    id: "chain-numbers-1",
    methodId: "chaining",
    chainGroup: "numbers-pipeline",
    chainTitle: "Numbers Pipeline",
    title: "Step 1 — filter to evens",
    difficulty: "easy",
    prompt: "Filter `nums` down to only the even numbers.",
    context: { nums: [5, 12, 8, 130, 44, 3, 21, 9, 16] },
    starterExpression: "nums",
    solutionExpression: "nums.filter(n => n % 2 === 0)",
    reference: ({ nums }) => (nums as number[]).filter((n) => n % 2 === 0),
    hints: ["`n % 2 === 0` is true for even numbers."],
  },
  {
    id: "chain-numbers-2",
    methodId: "chaining",
    chainGroup: "numbers-pipeline",
    chainTitle: "Numbers Pipeline",
    title: "Step 2 — chain on map",
    difficulty: "easy",
    prompt: "Continuing from the evens, chain on `.map()` to double each one.",
    context: { nums: [5, 12, 8, 130, 44, 3, 21, 9, 16] },
    starterExpression: "nums.filter(n => n % 2 === 0)",
    solutionExpression: "nums.filter(n => n % 2 === 0).map(n => n * 2)",
    reference: ({ nums }) => (nums as number[]).filter((n) => n % 2 === 0).map((n) => n * 2),
    hints: ["Add `.map(n => n * 2)` right after the filter call — no need to touch what's already there."],
  },
  {
    id: "chain-numbers-3",
    methodId: "chaining",
    chainGroup: "numbers-pipeline",
    chainTitle: "Numbers Pipeline",
    title: "Step 3 — chain on reduce",
    difficulty: "medium",
    prompt: "Continuing from the doubled evens, chain on `.reduce()` to sum them into a single total.",
    context: { nums: [5, 12, 8, 130, 44, 3, 21, 9, 16] },
    starterExpression: "nums.filter(n => n % 2 === 0).map(n => n * 2)",
    solutionExpression: "nums.filter(n => n % 2 === 0).map(n => n * 2).reduce((sum, n) => sum + n, 0)",
    reference: ({ nums }) =>
      (nums as number[])
        .filter((n) => n % 2 === 0)
        .map((n) => n * 2)
        .reduce((s, n) => s + n, 0),
    hints: ["Append `.reduce((sum, n) => sum + n, 0)` to the chain you already have."],
  },

  // ========================================================= chain: roster
  {
    id: "chain-roster-1",
    methodId: "chaining",
    chainGroup: "roster-pipeline",
    chainTitle: "Team Roster Pipeline",
    title: "Step 1 — filter to active",
    difficulty: "easy",
    prompt: "Filter `people` down to only the active members.",
    context: {
      people: [
        { name: "Ada", age: 36, active: true },
        { name: "Grace", age: 85, active: false },
        { name: "Alan", age: 41, active: true },
        { name: "Rosalind", age: 37, active: true },
        { name: "Barbara", age: 68, active: false },
      ],
    },
    starterExpression: "people",
    solutionExpression: "people.filter(p => p.active)",
    reference: ({ people }) => (people as { active: boolean }[]).filter((p) => p.active),
    hints: ["`p.active` is already a boolean — return it directly from the filter callback."],
  },
  {
    id: "chain-roster-2",
    methodId: "chaining",
    chainGroup: "roster-pipeline",
    chainTitle: "Team Roster Pipeline",
    title: "Step 2 — chain on map",
    difficulty: "easy",
    prompt: "Continuing from the active members, chain on `.map()` to get just their names.",
    context: {
      people: [
        { name: "Ada", age: 36, active: true },
        { name: "Grace", age: 85, active: false },
        { name: "Alan", age: 41, active: true },
        { name: "Rosalind", age: 37, active: true },
        { name: "Barbara", age: 68, active: false },
      ],
    },
    starterExpression: "people.filter(p => p.active)",
    solutionExpression: "people.filter(p => p.active).map(p => p.name)",
    reference: ({ people }) =>
      (people as { active: boolean; name: string }[]).filter((p) => p.active).map((p) => p.name),
    hints: ["Add `.map(p => p.name)` right after the filter call."],
  },
  {
    id: "chain-roster-3",
    methodId: "chaining",
    chainGroup: "roster-pipeline",
    chainTitle: "Team Roster Pipeline",
    title: "Step 3 — chain on sort",
    difficulty: "medium",
    prompt: "Continuing from the list of names, chain on `.sort()` to put them in alphabetical order.",
    context: {
      people: [
        { name: "Ada", age: 36, active: true },
        { name: "Grace", age: 85, active: false },
        { name: "Alan", age: 41, active: true },
        { name: "Rosalind", age: 37, active: true },
        { name: "Barbara", age: 68, active: false },
      ],
    },
    starterExpression: "people.filter(p => p.active).map(p => p.name)",
    solutionExpression: "people.filter(p => p.active).map(p => p.name).sort((a, b) => a.localeCompare(b))",
    reference: ({ people }) =>
      (people as { active: boolean; name: string }[])
        .filter((p) => p.active)
        .map((p) => p.name)
        .sort((a, b) => a.localeCompare(b)),
    hints: ["`.sort((a, b) => a.localeCompare(b))` sorts strings alphabetically."],
  },
  {
    id: "chain-roster-4",
    methodId: "chaining",
    chainGroup: "roster-pipeline",
    chainTitle: "Team Roster Pipeline",
    title: "Step 4 — chain on slice",
    difficulty: "hard",
    prompt: "Continuing from the sorted names, chain on `.slice()` to keep only the first 2.",
    context: {
      people: [
        { name: "Ada", age: 36, active: true },
        { name: "Grace", age: 85, active: false },
        { name: "Alan", age: 41, active: true },
        { name: "Rosalind", age: 37, active: true },
        { name: "Barbara", age: 68, active: false },
      ],
    },
    starterExpression: "people.filter(p => p.active).map(p => p.name).sort((a, b) => a.localeCompare(b))",
    solutionExpression: "people.filter(p => p.active).map(p => p.name).sort((a, b) => a.localeCompare(b)).slice(0, 2)",
    reference: ({ people }) =>
      (people as { active: boolean; name: string }[])
        .filter((p) => p.active)
        .map((p) => p.name)
        .sort((a, b) => a.localeCompare(b))
        .slice(0, 2),
    hints: ["`.slice(0, 2)` takes just the first two elements of the sorted array."],
  },
];

export const problemsByMethod = (methodId: string) => problems.filter((p) => p.methodId === methodId);

export const problemById = new Map(problems.map((p) => [p.id, p]));

export interface ChainGroupInfo {
  id: string;
  title: string;
  steps: Problem[];
}

/** Chain groups in first-appearance order, each with its steps in array order. */
export function chainGroups(): ChainGroupInfo[] {
  const groups = new Map<string, ChainGroupInfo>();
  for (const p of problems) {
    if (!p.chainGroup) continue;
    if (!groups.has(p.chainGroup)) {
      groups.set(p.chainGroup, { id: p.chainGroup, title: p.chainTitle ?? p.chainGroup, steps: [] });
    }
    groups.get(p.chainGroup)!.steps.push(p);
  }
  return Array.from(groups.values());
}
