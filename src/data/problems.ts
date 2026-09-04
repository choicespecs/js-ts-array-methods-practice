import type { Problem } from "../types";

/**
 * Every problem asks the learner to implement a named function.
 * We don't statically enforce which built-in method they use inside it —
 * the prompt/hints steer them toward the method being taught, and the
 * runner gives a friendly (non-blocking) nudge if it doesn't spot that
 * method's name anywhere in their code.
 */
export const problems: Problem[] = [
  // ---------------------------------------------------------------- forEach
  {
    id: "forEach-1",
    methodId: "forEach",
    title: "Sum with forEach",
    difficulty: "easy",
    prompt:
      "Implement `sumAll(nums)` that returns the sum of every number in `nums`, using `forEach` to accumulate into a variable declared outside the callback.",
    functionName: "sumAll",
    starterCode: `function sumAll(nums) {
  let total = 0;
  // use nums.forEach(...) to add each number to total
  return total;
}`,
    solutionCode: `function sumAll(nums) {
  let total = 0;
  nums.forEach(n => { total += n; });
  return total;
}`,
    hints: [
      "forEach doesn't return anything useful — you need a variable declared before the call that the callback mutates.",
      "Inside the callback, add the current element to your outer `total` variable: `total += n`.",
      "Full shape: `nums.forEach(n => { total += n; }); return total;`",
    ],
    testCases: [
      { label: "a few positive numbers", args: [[1, 2, 3, 4]] },
      { label: "empty array", args: [[]] },
      { label: "negative numbers", args: [[-5, 5, 10]] },
    ],
    reference: (nums: number[]) => nums.reduce((a, b) => a + b, 0),
  },
  {
    id: "forEach-2",
    methodId: "forEach",
    title: "Word frequency counter",
    difficulty: "medium",
    prompt:
      "Implement `wordCounts(words)` that returns an object mapping each word to how many times it appears in `words`, built up with `forEach`.",
    functionName: "wordCounts",
    starterCode: `function wordCounts(words) {
  const counts = {};
  // for each word, increment counts[word]
  return counts;
}`,
    solutionCode: `function wordCounts(words) {
  const counts = {};
  words.forEach(w => {
    counts[w] = (counts[w] || 0) + 1;
  });
  return counts;
}`,
    hints: [
      "Start each word's count at 0 the first time you see it, then add 1 every time.",
      "`counts[w] = (counts[w] || 0) + 1` handles both 'first time' and 'seen before' in one line.",
    ],
    testCases: [
      { label: "repeated words", args: [["a", "b", "a", "c", "b", "a"]] },
      { label: "all unique", args: [["x", "y", "z"]] },
      { label: "empty array", args: [[]] },
    ],
    reference: (words: string[]) => {
      const c: Record<string, number> = {};
      words.forEach((w) => (c[w] = (c[w] || 0) + 1));
      return c;
    },
  },

  // -------------------------------------------------------------------- map
  {
    id: "map-1",
    methodId: "map",
    title: "Double every number",
    difficulty: "easy",
    prompt: "Implement `doubleAll(nums)` that returns a new array with every number doubled.",
    functionName: "doubleAll",
    starterCode: `function doubleAll(nums) {
  // return nums.map(...)
}`,
    solutionCode: `function doubleAll(nums) {
  return nums.map(n => n * 2);
}`,
    hints: [
      "map takes a callback and returns a new array of the same length.",
      "The callback for this problem is `n => n * 2`.",
    ],
    testCases: [
      { label: "positive numbers", args: [[1, 2, 3]] },
      { label: "includes zero and negatives", args: [[0, -1, -2]] },
      { label: "empty array", args: [[]] },
    ],
    reference: (nums: number[]) => nums.map((n) => n * 2),
  },
  {
    id: "map-2",
    methodId: "map",
    title: "Extract a property",
    difficulty: "medium",
    prompt:
      "Implement `getNames(people)` where `people` is an array of `{ name, age }` objects. Return an array of just the names, in the same order.",
    functionName: "getNames",
    starterCode: `function getNames(people) {
  // return people.map(...)
}`,
    solutionCode: `function getNames(people) {
  return people.map(p => p.name);
}`,
    hints: [
      "Your callback receives each person object — pull `.name` off of it and return that.",
    ],
    testCases: [
      {
        label: "three people",
        args: [
          [
            { name: "Ada", age: 36 },
            { name: "Grace", age: 85 },
            { name: "Alan", age: 41 },
          ],
        ],
      },
      { label: "empty array", args: [[]] },
    ],
    reference: (people: { name: string; age: number }[]) => people.map((p) => p.name),
  },
  {
    id: "map-3",
    methodId: "map",
    title: "Label with position",
    difficulty: "hard",
    prompt:
      "Implement `numberedList(items)` that returns an array of strings like `\"1. Apple\"`, `\"2. Banana\"` — using the index argument map's callback receives.",
    functionName: "numberedList",
    starterCode: `function numberedList(items) {
  // map's callback receives (element, index) — use both
  return items.map((item, index) => {
    // ...
  });
}`,
    solutionCode: `function numberedList(items) {
  return items.map((item, index) => \`\${index + 1}. \${item}\`);
}`,
    hints: [
      "The callback's second parameter is the zero-based index — add 1 to make it human-friendly (1-based).",
      "Build the string with a template literal: `` `${index + 1}. ${item}` ``.",
    ],
    testCases: [
      { label: "three fruits", args: [["Apple", "Banana", "Cherry"]] },
      { label: "single item", args: [["Only"]] },
      { label: "empty array", args: [[]] },
    ],
    reference: (items: string[]) => items.map((item, i) => `${i + 1}. ${item}`),
  },

  // ---------------------------------------------------------------- filter
  {
    id: "filter-1",
    methodId: "filter",
    title: "Only even numbers",
    difficulty: "easy",
    prompt: "Implement `evensOnly(nums)` that returns only the even numbers, in original order.",
    functionName: "evensOnly",
    starterCode: `function evensOnly(nums) {
  // return nums.filter(...)
}`,
    solutionCode: `function evensOnly(nums) {
  return nums.filter(n => n % 2 === 0);
}`,
    hints: ["A number is even when `n % 2 === 0`.", "filter's callback should return that boolean directly."],
    testCases: [
      { label: "mixed numbers", args: [[1, 2, 3, 4, 5, 6]] },
      { label: "all odd", args: [[1, 3, 5]] },
      { label: "empty array", args: [[]] },
    ],
    reference: (nums: number[]) => nums.filter((n) => n % 2 === 0),
  },
  {
    id: "filter-2",
    methodId: "filter",
    title: "Filter by property",
    difficulty: "medium",
    prompt:
      "Implement `inStock(products)` where each product is `{ name, quantity }`. Return only the products with `quantity > 0`.",
    functionName: "inStock",
    starterCode: `function inStock(products) {
  // return products.filter(...)
}`,
    solutionCode: `function inStock(products) {
  return products.filter(p => p.quantity > 0);
}`,
    hints: ["Access `.quantity` on each product inside the callback and compare it to 0."],
    testCases: [
      {
        label: "mixed stock",
        args: [
          [
            { name: "Widget", quantity: 5 },
            { name: "Gadget", quantity: 0 },
            { name: "Gizmo", quantity: 2 },
          ],
        ],
      },
      { label: "everything out of stock", args: [[{ name: "X", quantity: 0 }]] },
    ],
    reference: (products: { name: string; quantity: number }[]) => products.filter((p) => p.quantity > 0),
  },
  {
    id: "filter-3",
    methodId: "filter",
    title: "Remove duplicates",
    difficulty: "hard",
    prompt:
      "Implement `unique(nums)` that returns the array with duplicate values removed, keeping only each value's first occurrence — using `filter` together with `indexOf`.",
    functionName: "unique",
    starterCode: `function unique(nums) {
  // keep an element only if its first occurrence index equals the current index
  return nums.filter((n, i) => {
    // ...
  });
}`,
    solutionCode: `function unique(nums) {
  return nums.filter((n, i) => nums.indexOf(n) === i);
}`,
    hints: [
      "`nums.indexOf(n)` always returns the *first* index where `n` appears.",
      "If that first index equals the current index `i`, this is the first time we've seen the value — keep it.",
    ],
    testCases: [
      { label: "some repeats", args: [[1, 2, 2, 3, 1, 4]] },
      { label: "no repeats", args: [[1, 2, 3]] },
      { label: "all same", args: [[7, 7, 7]] },
    ],
    reference: (nums: number[]) => nums.filter((n, i) => nums.indexOf(n) === i),
  },

  // ---------------------------------------------------------------- reduce
  {
    id: "reduce-1",
    methodId: "reduce",
    title: "Sum with reduce",
    difficulty: "easy",
    prompt: "Implement `total(nums)` that returns the sum of all numbers, using `reduce`.",
    functionName: "total",
    starterCode: `function total(nums) {
  // return nums.reduce((sum, n) => ..., 0)
}`,
    solutionCode: `function total(nums) {
  return nums.reduce((sum, n) => sum + n, 0);
}`,
    hints: [
      "reduce's callback takes `(accumulator, element)` and must return the new accumulator.",
      "Start the accumulator at `0`, the second argument to reduce.",
    ],
    testCases: [
      { label: "positive numbers", args: [[1, 2, 3, 4, 5]] },
      { label: "empty array", args: [[]] },
      { label: "negatives", args: [[-1, -2, 3]] },
    ],
    reference: (nums: number[]) => nums.reduce((s, n) => s + n, 0),
  },
  {
    id: "reduce-2",
    methodId: "reduce",
    title: "Count occurrences",
    difficulty: "medium",
    prompt:
      "Implement `countBy(items)` that returns an object mapping each distinct item to how many times it occurs, built entirely with `reduce` (no forEach).",
    functionName: "countBy",
    starterCode: `function countBy(items) {
  return items.reduce((counts, item) => {
    // update and return counts
    return counts;
  }, {});
}`,
    solutionCode: `function countBy(items) {
  return items.reduce((counts, item) => {
    counts[item] = (counts[item] || 0) + 1;
    return counts;
  }, {});
}`,
    hints: [
      "The accumulator is the object you're building — mutate it and then `return counts;` each time.",
      "`counts[item] = (counts[item] || 0) + 1` is the same increment trick as a frequency counter.",
    ],
    testCases: [
      { label: "repeated items", args: [["cat", "dog", "cat", "cat", "dog"]] },
      { label: "empty array", args: [[]] },
    ],
    reference: (items: string[]) => items.reduce((c: Record<string, number>, i) => ((c[i] = (c[i] || 0) + 1), c), {}),
  },
  {
    id: "reduce-3",
    methodId: "reduce",
    title: "Flatten with reduce",
    difficulty: "hard",
    prompt:
      "Implement `flattenOne(arrays)` that takes an array of arrays and flattens it one level deep, using `reduce` and `concat` (pretend `.flat()` doesn't exist).",
    functionName: "flattenOne",
    starterCode: `function flattenOne(arrays) {
  return arrays.reduce((flat, sub) => {
    // combine flat and sub
    return flat;
  }, []);
}`,
    solutionCode: `function flattenOne(arrays) {
  return arrays.reduce((flat, sub) => flat.concat(sub), []);
}`,
    hints: [
      "Start the accumulator as an empty array `[]`.",
      "Each step, merge the running array with the current sub-array using `.concat(sub)`.",
    ],
    testCases: [
      { label: "several sub-arrays", args: [[[1, 2], [3], [4, 5, 6]]] },
      { label: "contains an empty sub-array", args: [[[1], [], [2, 3]]] },
      { label: "empty outer array", args: [[]] },
    ],
    reference: (arrays: number[][]) => arrays.reduce((flat: number[], sub) => flat.concat(sub), []),
  },

  // ------------------------------------------------------------------ find
  {
    id: "find-1",
    methodId: "find",
    title: "First even number",
    difficulty: "easy",
    prompt: "Implement `firstEven(nums)` that returns the first even number, or `undefined` if there is none.",
    functionName: "firstEven",
    starterCode: `function firstEven(nums) {
  // return nums.find(...)
}`,
    solutionCode: `function firstEven(nums) {
  return nums.find(n => n % 2 === 0);
}`,
    hints: ["find returns the element itself as soon as the callback is truthy — not an array."],
    testCases: [
      { label: "even present", args: [[1, 3, 4, 5, 6]] },
      { label: "no evens", args: [[1, 3, 5]] },
      { label: "empty array", args: [[]] },
    ],
    reference: (nums: number[]) => nums.find((n) => n % 2 === 0),
  },
  {
    id: "find-2",
    methodId: "find",
    title: "Find user by id",
    difficulty: "medium",
    prompt:
      "Implement `findUser(users, id)` where `users` is an array of `{ id, name }`. Return the user object whose `id` matches, or `undefined`.",
    functionName: "findUser",
    starterCode: `function findUser(users, id) {
  // return users.find(...)
}`,
    solutionCode: `function findUser(users, id) {
  return users.find(u => u.id === id);
}`,
    hints: ["Your callback receives each user — compare `u.id === id` (the second parameter of your function)."],
    testCases: [
      {
        label: "id exists",
        args: [
          [
            { id: 1, name: "Ada" },
            { id: 2, name: "Grace" },
          ],
          2,
        ],
      },
      {
        label: "id missing",
        args: [[{ id: 1, name: "Ada" }], 99],
      },
    ],
    reference: (users: { id: number; name: string }[], id: number) => users.find((u) => u.id === id),
  },

  // ------------------------------------------------------------- findIndex
  {
    id: "findIndex-1",
    methodId: "findIndex",
    title: "Index of first negative",
    difficulty: "easy",
    prompt: "Implement `firstNegativeIndex(nums)` that returns the index of the first negative number, or `-1`.",
    functionName: "firstNegativeIndex",
    starterCode: `function firstNegativeIndex(nums) {
  // return nums.findIndex(...)
}`,
    solutionCode: `function firstNegativeIndex(nums) {
  return nums.findIndex(n => n < 0);
}`,
    hints: ["findIndex already returns -1 for you when nothing matches — no need to handle that case yourself."],
    testCases: [
      { label: "negative present", args: [[5, 3, -2, 8]] },
      { label: "no negatives", args: [[1, 2, 3]] },
      { label: "empty array", args: [[]] },
    ],
    reference: (nums: number[]) => nums.findIndex((n) => n < 0),
  },
  {
    id: "findIndex-2",
    methodId: "findIndex",
    title: "Index of matching task",
    difficulty: "medium",
    prompt:
      "Implement `indexOfDone(tasks)` where `tasks` is an array of `{ title, done }`. Return the index of the first completed task, or `-1`.",
    functionName: "indexOfDone",
    starterCode: `function indexOfDone(tasks) {
  // return tasks.findIndex(...)
}`,
    solutionCode: `function indexOfDone(tasks) {
  return tasks.findIndex(t => t.done);
}`,
    hints: ["The callback can simply return `t.done` — it's already a boolean."],
    testCases: [
      {
        label: "one done task",
        args: [
          [
            { title: "a", done: false },
            { title: "b", done: true },
            { title: "c", done: true },
          ],
        ],
      },
      { label: "none done", args: [[{ title: "a", done: false }]] },
    ],
    reference: (tasks: { title: string; done: boolean }[]) => tasks.findIndex((t) => t.done),
  },

  // ----------------------------------------------------------------- some
  {
    id: "some-1",
    methodId: "some",
    title: "Any negative numbers?",
    difficulty: "easy",
    prompt: "Implement `hasNegative(nums)` that returns `true` if any number is negative.",
    functionName: "hasNegative",
    starterCode: `function hasNegative(nums) {
  // return nums.some(...)
}`,
    solutionCode: `function hasNegative(nums) {
  return nums.some(n => n < 0);
}`,
    hints: ["some short-circuits as soon as one element passes — perfect for yes/no questions."],
    testCases: [
      { label: "has a negative", args: [[1, 2, -3]] },
      { label: "all positive", args: [[1, 2, 3]] },
      { label: "empty array", args: [[]] },
    ],
    reference: (nums: number[]) => nums.some((n) => n < 0),
  },
  {
    id: "some-2",
    methodId: "some",
    title: "Any out-of-stock items?",
    difficulty: "medium",
    prompt: "Implement `anyOutOfStock(products)` where each product is `{ name, quantity }`. Return `true` if any product has `quantity === 0`.",
    functionName: "anyOutOfStock",
    starterCode: `function anyOutOfStock(products) {
  // return products.some(...)
}`,
    solutionCode: `function anyOutOfStock(products) {
  return products.some(p => p.quantity === 0);
}`,
    hints: ["Same shape as the numeric version — just check `p.quantity === 0` instead."],
    testCases: [
      {
        label: "one out of stock",
        args: [
          [
            { name: "a", quantity: 3 },
            { name: "b", quantity: 0 },
          ],
        ],
      },
      { label: "all in stock", args: [[{ name: "a", quantity: 3 }]] },
    ],
    reference: (products: { name: string; quantity: number }[]) => products.some((p) => p.quantity === 0),
  },

  // ---------------------------------------------------------------- every
  {
    id: "every-1",
    methodId: "every",
    title: "All positive?",
    difficulty: "easy",
    prompt: "Implement `allPositive(nums)` that returns `true` only if every number is greater than 0.",
    functionName: "allPositive",
    starterCode: `function allPositive(nums) {
  // return nums.every(...)
}`,
    solutionCode: `function allPositive(nums) {
  return nums.every(n => n > 0);
}`,
    hints: ["Remember: every returns true on an empty array — that's expected, not a bug."],
    testCases: [
      { label: "all positive", args: [[1, 2, 3]] },
      { label: "contains zero", args: [[1, 0, 3]] },
      { label: "empty array", args: [[]] },
    ],
    reference: (nums: number[]) => nums.every((n) => n > 0),
  },
  {
    id: "every-2",
    methodId: "every",
    title: "All tasks done?",
    difficulty: "medium",
    prompt: "Implement `allDone(tasks)` where each task is `{ title, done }`. Return `true` only if every task is done.",
    functionName: "allDone",
    starterCode: `function allDone(tasks) {
  // return tasks.every(...)
}`,
    solutionCode: `function allDone(tasks) {
  return tasks.every(t => t.done);
}`,
    hints: ["Same idea as allPositive, but checking `t.done` on each task."],
    testCases: [
      {
        label: "all done",
        args: [
          [
            { title: "a", done: true },
            { title: "b", done: true },
          ],
        ],
      },
      {
        label: "one not done",
        args: [
          [
            { title: "a", done: true },
            { title: "b", done: false },
          ],
        ],
      },
    ],
    reference: (tasks: { title: string; done: boolean }[]) => tasks.every((t) => t.done),
  },

  // ------------------------------------------------------------- includes
  {
    id: "includes-1",
    methodId: "includes",
    title: "Contains value?",
    difficulty: "easy",
    prompt: "Implement `hasValue(arr, target)` that returns `true` if `arr` contains `target`.",
    functionName: "hasValue",
    starterCode: `function hasValue(arr, target) {
  // return arr.includes(...)
}`,
    solutionCode: `function hasValue(arr, target) {
  return arr.includes(target);
}`,
    hints: ["includes takes the value to search for directly — no callback needed."],
    testCases: [
      { label: "value present", args: [[1, 2, 3], 2] },
      { label: "value missing", args: [[1, 2, 3], 9] },
      { label: "finds NaN correctly", args: [[1, NaN, 3], NaN] },
    ],
    reference: (arr: unknown[], target: unknown) => arr.includes(target),
  },

  // -------------------------------------------------------------- indexOf
  {
    id: "indexOf-1",
    methodId: "indexOf",
    title: "First index of value",
    difficulty: "easy",
    prompt: "Implement `whereIs(arr, target)` that returns the first index of `target` in `arr`, or `-1`.",
    functionName: "whereIs",
    starterCode: `function whereIs(arr, target) {
  // return arr.indexOf(...)
}`,
    solutionCode: `function whereIs(arr, target) {
  return arr.indexOf(target);
}`,
    hints: ["indexOf compares with strict equality (===) and returns -1 automatically when nothing matches."],
    testCases: [
      { label: "value present", args: [["a", "b", "c"], "b"] },
      { label: "value missing", args: [["a", "b", "c"], "z"] },
      { label: "duplicate values", args: [[5, 1, 5, 1], 1] },
    ],
    reference: (arr: unknown[], target: unknown) => arr.indexOf(target),
  },
  {
    id: "indexOf-2",
    methodId: "indexOf",
    title: "Search starting from an index",
    difficulty: "medium",
    prompt:
      "Implement `nextIndexOf(arr, target, from)` that returns the first index of `target` at or after position `from`, using indexOf's second argument.",
    functionName: "nextIndexOf",
    starterCode: `function nextIndexOf(arr, target, from) {
  // return arr.indexOf(target, from)
}`,
    solutionCode: `function nextIndexOf(arr, target, from) {
  return arr.indexOf(target, from);
}`,
    hints: ["indexOf's second parameter tells it where in the array to start looking."],
    testCases: [
      { label: "skips the first match", args: [[1, 2, 1, 2, 1], 1, 1] },
      { label: "from is past all matches", args: [[1, 2, 1], 1, 3] },
    ],
    reference: (arr: unknown[], target: unknown, from: number) => arr.indexOf(target, from),
  },

  // ----------------------------------------------------------------- sort
  {
    id: "sort-1",
    methodId: "sort",
    title: "Sort numbers ascending",
    difficulty: "easy",
    prompt:
      "Implement `sortAscending(nums)` that returns a *new* array with the numbers sorted ascending, without mutating the input (copy first!).",
    functionName: "sortAscending",
    starterCode: `function sortAscending(nums) {
  // copy with [...nums], then sort the copy with a compare function
  return [...nums].sort((a, b) => {
    // ...
  });
}`,
    solutionCode: `function sortAscending(nums) {
  return [...nums].sort((a, b) => a - b);
}`,
    hints: [
      "Plain `.sort()` compares elements as strings — always pass a compare function for numbers.",
      "`(a, b) => a - b` sorts ascending: negative means a comes first.",
    ],
    testCases: [
      { label: "unsorted numbers", args: [[10, 1, 21, 2]] },
      { label: "already sorted", args: [[1, 2, 3]] },
      { label: "negatives mixed in", args: [[-5, 10, 0, -1]] },
    ],
    reference: (nums: number[]) => [...nums].sort((a, b) => a - b),
  },
  {
    id: "sort-2",
    methodId: "sort",
    title: "Sort strings by length",
    difficulty: "medium",
    prompt: "Implement `sortByLength(words)` that returns a new array of strings sorted shortest to longest.",
    functionName: "sortByLength",
    starterCode: `function sortByLength(words) {
  return [...words].sort((a, b) => {
    // compare a.length and b.length
  });
}`,
    solutionCode: `function sortByLength(words) {
  return [...words].sort((a, b) => a.length - b.length);
}`,
    hints: ["Same pattern as sorting numbers, but compare `.length` instead of the values directly."],
    testCases: [
      { label: "varied lengths", args: [["banana", "fig", "apple"]] },
      { label: "same lengths", args: [["ab", "cd"]] },
    ],
    reference: (words: string[]) => [...words].sort((a, b) => a.length - b.length),
  },
  {
    id: "sort-3",
    methodId: "sort",
    title: "Sort by two keys",
    difficulty: "hard",
    prompt:
      "Implement `sortPlayers(players)` where each player is `{ score, name }`. Sort by `score` descending; when scores tie, sort by `name` ascending (alphabetically).",
    functionName: "sortPlayers",
    starterCode: `function sortPlayers(players) {
  return [...players].sort((a, b) => {
    // first compare scores (descending), then fall back to names (ascending)
  });
}`,
    solutionCode: `function sortPlayers(players) {
  return [...players].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.name.localeCompare(b.name);
  });
}`,
    hints: [
      "Descending score means the higher score should come first: `b.score - a.score`.",
      "Only fall back to comparing names when the scores are equal.",
      "`a.name.localeCompare(b.name)` gives you ascending alphabetical order for strings.",
    ],
    testCases: [
      {
        label: "distinct scores",
        args: [
          [
            { score: 10, name: "Zed" },
            { score: 30, name: "Amy" },
            { score: 20, name: "Bo" },
          ],
        ],
      },
      {
        label: "tied scores",
        args: [
          [
            { score: 10, name: "Zed" },
            { score: 10, name: "Amy" },
          ],
        ],
      },
    ],
    reference: (players: { score: number; name: string }[]) =>
      [...players].sort((a, b) => (b.score !== a.score ? b.score - a.score : a.name.localeCompare(b.name))),
  },

  // -------------------------------------------------------------- reverse
  {
    id: "reverse-1",
    methodId: "reverse",
    title: "Reverse without mutating",
    difficulty: "easy",
    prompt:
      "Implement `reversedCopy(arr)` that returns a new array with elements in reverse order, leaving the original array untouched.",
    functionName: "reversedCopy",
    starterCode: `function reversedCopy(arr) {
  // reverse() mutates — copy first with [...arr]
  return [...arr].reverse();
}`,
    solutionCode: `function reversedCopy(arr) {
  return [...arr].reverse();
}`,
    hints: ["`[...arr]` makes a shallow copy so the original array reference is never mutated."],
    testCases: [
      { label: "several elements", args: [[1, 2, 3, 4]] },
      { label: "single element", args: [[1]] },
      { label: "empty array", args: [[]] },
    ],
    reference: (arr: unknown[]) => [...arr].reverse(),
  },

  // ---------------------------------------------------------------- slice
  {
    id: "slice-1",
    methodId: "slice",
    title: "First n elements",
    difficulty: "easy",
    prompt: "Implement `firstN(arr, n)` that returns the first `n` elements as a new array.",
    functionName: "firstN",
    starterCode: `function firstN(arr, n) {
  // return arr.slice(...)
}`,
    solutionCode: `function firstN(arr, n) {
  return arr.slice(0, n);
}`,
    hints: ["slice(start, end) — end is exclusive, so slice(0, n) gives exactly n elements (or fewer)."],
    testCases: [
      { label: "n less than length", args: [[1, 2, 3, 4, 5], 3] },
      { label: "n greater than length", args: [[1, 2], 5] },
      { label: "n is zero", args: [[1, 2, 3], 0] },
    ],
    reference: (arr: unknown[], n: number) => arr.slice(0, n),
  },
  {
    id: "slice-2",
    methodId: "slice",
    title: "Last n elements",
    difficulty: "medium",
    prompt: "Implement `lastN(arr, n)` that returns the last `n` elements as a new array, using a negative index.",
    functionName: "lastN",
    starterCode: `function lastN(arr, n) {
  // slice with a negative start index counts from the end
  return arr.slice(-n);
}`,
    solutionCode: `function lastN(arr, n) {
  return arr.slice(-n);
}`,
    hints: ["`arr.slice(-n)` starts n elements from the end and takes everything after that."],
    testCases: [
      { label: "n less than length", args: [[1, 2, 3, 4, 5], 2] },
      { label: "n greater than length", args: [[1, 2], 5] },
    ],
    reference: (arr: unknown[], n: number) => arr.slice(-n),
  },

  // --------------------------------------------------------------- splice
  {
    id: "splice-1",
    methodId: "splice",
    title: "Remove at index",
    difficulty: "easy",
    prompt:
      "Implement `removeAt(arr, index)` that removes the element at `index` (mutating the array using `splice`) and returns the mutated array.",
    functionName: "removeAt",
    starterCode: `function removeAt(arr, index) {
  // arr.splice(index, 1) removes exactly one element in place
  arr.splice(index, 1);
  return arr;
}`,
    solutionCode: `function removeAt(arr, index) {
  arr.splice(index, 1);
  return arr;
}`,
    hints: ["The second argument to splice is the delete count — 1 means remove exactly one element."],
    testCases: [
      { label: "remove middle", args: [[1, 2, 3, 4], 1] },
      { label: "remove first", args: [["a", "b", "c"], 0] },
    ],
    reference: (arr: unknown[], index: number) => {
      const copy = [...arr];
      copy.splice(index, 1);
      return copy;
    },
  },
  {
    id: "splice-2",
    methodId: "splice",
    title: "Insert at index",
    difficulty: "medium",
    prompt:
      "Implement `insertAt(arr, index, value)` that inserts `value` at `index` without removing anything, and returns the mutated array.",
    functionName: "insertAt",
    starterCode: `function insertAt(arr, index, value) {
  // deleteCount of 0 means nothing is removed, only inserted
  arr.splice(index, 0, value);
  return arr;
}`,
    solutionCode: `function insertAt(arr, index, value) {
  arr.splice(index, 0, value);
  return arr;
}`,
    hints: ["Pass 0 as the deleteCount, then list the value(s) to insert afterward."],
    testCases: [
      { label: "insert in middle", args: [[1, 2, 4], 2, 3] },
      { label: "insert at start", args: [[2, 3], 0, 1] },
    ],
    reference: (arr: unknown[], index: number, value: unknown) => {
      const copy = [...arr];
      copy.splice(index, 0, value);
      return copy;
    },
  },

  // --------------------------------------------------------------- concat
  {
    id: "concat-1",
    methodId: "concat",
    title: "Merge two arrays",
    difficulty: "easy",
    prompt: "Implement `merge(a, b)` that returns a new array with all elements of `a` followed by all elements of `b`.",
    functionName: "merge",
    starterCode: `function merge(a, b) {
  // return a.concat(b)
}`,
    solutionCode: `function merge(a, b) {
  return a.concat(b);
}`,
    hints: ["concat doesn't mutate either input — it always returns a brand-new array."],
    testCases: [
      { label: "two non-empty arrays", args: [[1, 2], [3, 4]] },
      { label: "second array empty", args: [[1], []] },
    ],
    reference: (a: unknown[], b: unknown[]) => a.concat(b),
  },

  // ----------------------------------------------------------------- flat
  {
    id: "flat-1",
    methodId: "flat",
    title: "Flatten one level",
    difficulty: "easy",
    prompt: "Implement `flattenOnce(arr)` that flattens one level of nesting.",
    functionName: "flattenOnce",
    starterCode: `function flattenOnce(arr) {
  // return arr.flat()
}`,
    solutionCode: `function flattenOnce(arr) {
  return arr.flat();
}`,
    hints: ["flat()'s default depth is exactly 1."],
    testCases: [
      { label: "one level nested", args: [[1, [2, 3], [4]]] },
      { label: "already flat", args: [[1, 2, 3]] },
    ],
    reference: (arr: unknown[]) => arr.flat(),
  },
  {
    id: "flat-2",
    methodId: "flat",
    title: "Fully flatten",
    difficulty: "medium",
    prompt: "Implement `flattenDeep(arr)` that flattens arbitrarily deeply nested arrays into a single flat array.",
    functionName: "flattenDeep",
    starterCode: `function flattenDeep(arr) {
  // what depth value fully flattens, no matter how deep?
  return arr.flat(Infinity);
}`,
    solutionCode: `function flattenDeep(arr) {
  return arr.flat(Infinity);
}`,
    hints: ["Pass `Infinity` as the depth to flatten every level, however deep the nesting goes."],
    testCases: [
      { label: "deeply nested", args: [[1, [2, [3, [4, [5]]]]]] },
      { label: "already flat", args: [[1, 2, 3]] },
    ],
    reference: (arr: unknown[]) => arr.flat(Infinity),
  },

  // -------------------------------------------------------------- flatMap
  {
    id: "flatMap-1",
    methodId: "flatMap",
    title: "Duplicate each element",
    difficulty: "easy",
    prompt:
      "Implement `duplicateEach(nums)` that returns each number twice in a row, e.g. `[1, 2]` becomes `[1, 1, 2, 2]`, using `flatMap`.",
    functionName: "duplicateEach",
    starterCode: `function duplicateEach(nums) {
  // callback should return an array per element, e.g. [n, n]
  return nums.flatMap(n => {
    // ...
  });
}`,
    solutionCode: `function duplicateEach(nums) {
  return nums.flatMap(n => [n, n]);
}`,
    hints: ["Return a small array `[n, n]` from the callback — flatMap flattens that one level automatically."],
    testCases: [
      { label: "a few numbers", args: [[1, 2, 3]] },
      { label: "empty array", args: [[]] },
    ],
    reference: (nums: number[]) => nums.flatMap((n) => [n, n]),
  },
  {
    id: "flatMap-2",
    methodId: "flatMap",
    title: "Split sentences into words",
    difficulty: "medium",
    prompt:
      "Implement `allWords(sentences)` that takes an array of sentences and returns a single flat array of all the words across every sentence, using `flatMap` and `split(' ')`.",
    functionName: "allWords",
    starterCode: `function allWords(sentences) {
  return sentences.flatMap(s => s.split(" "));
}`,
    solutionCode: `function allWords(sentences) {
  return sentences.flatMap(s => s.split(" "));
}`,
    hints: ["`s.split(\" \")` turns one sentence into an array of words; flatMap merges all of those arrays into one."],
    testCases: [
      { label: "two sentences", args: [["hello world", "foo bar baz"]] },
      { label: "single word sentences", args: [["hi", "there"]] },
    ],
    reference: (sentences: string[]) => sentences.flatMap((s) => s.split(" ")),
  },

  // ------------------------------------------------------------------ join
  {
    id: "join-1",
    methodId: "join",
    title: "Join with comma",
    difficulty: "easy",
    prompt: "Implement `commaList(items)` that joins the items into a single string separated by `\", \"`.",
    functionName: "commaList",
    starterCode: `function commaList(items) {
  // return items.join(", ")
}`,
    solutionCode: `function commaList(items) {
  return items.join(", ");
}`,
    hints: ["join's argument is the separator string placed between each element."],
    testCases: [
      { label: "three items", args: [["apple", "banana", "cherry"]] },
      { label: "single item", args: [["only"]] },
      { label: "empty array", args: [[]] },
    ],
    reference: (items: string[]) => items.join(", "),
  },
  {
    id: "join-2",
    methodId: "join",
    title: "Build a CSV row",
    difficulty: "medium",
    prompt: "Implement `csvRow(fields)` that joins the fields with commas and no spaces, e.g. `\"a,b,c\"`.",
    functionName: "csvRow",
    starterCode: `function csvRow(fields) {
  // return fields.join(...)
}`,
    solutionCode: `function csvRow(fields) {
  return fields.join(",");
}`,
    hints: ["Just a plain comma this time — no space after it."],
    testCases: [
      { label: "three fields", args: [["1", "2", "3"]] },
      { label: "numbers as fields", args: [[1, 2, 3]] },
    ],
    reference: (fields: unknown[]) => fields.join(","),
  },

  // ------------------------------------------------------------- chaining
  {
    id: "chain-1",
    methodId: "chaining",
    title: "Filter, then map",
    difficulty: "easy",
    prompt:
      "Implement `doubledEvens(nums)` that returns the even numbers, each doubled — by chaining `.filter()` into `.map()` in a single expression.",
    functionName: "doubledEvens",
    starterCode: `function doubledEvens(nums) {
  return nums
    .filter(n => {/* keep evens */})
    .map(n => {/* double it */});
}`,
    solutionCode: `function doubledEvens(nums) {
  return nums.filter(n => n % 2 === 0).map(n => n * 2);
}`,
    hints: [
      "Each array method returns a new array, so you can immediately call another method on that result.",
      "filter first to narrow down to evens, then map to transform what's left.",
    ],
    testCases: [
      { label: "mixed numbers", args: [[1, 2, 3, 4, 5, 6]] },
      { label: "no evens", args: [[1, 3, 5]] },
      { label: "empty array", args: [[]] },
    ],
    reference: (nums: number[]) =>
      nums.filter((n) => n % 2 === 0).map((n) => n * 2),
  },
  {
    id: "chain-2",
    methodId: "chaining",
    title: "Map, then reduce",
    difficulty: "easy",
    prompt:
      "Implement `totalPrice(items)` where each item is `{ price, qty }`. Chain `.map()` to compute each line's cost, then `.reduce()` to sum them.",
    functionName: "totalPrice",
    starterCode: `function totalPrice(items) {
  return items
    .map(item => {/* item.price * item.qty */})
    .reduce((sum, cost) => {/* accumulate */}, 0);
}`,
    solutionCode: `function totalPrice(items) {
  return items.map(item => item.price * item.qty).reduce((sum, cost) => sum + cost, 0);
}`,
    hints: [
      "map turns each item into a single number (its line cost) first.",
      "reduce then folds that array of numbers down into one total, starting from 0.",
    ],
    testCases: [
      {
        label: "a few line items",
        args: [
          [
            { price: 10, qty: 2 },
            { price: 5, qty: 3 },
          ],
        ],
      },
      { label: "empty cart", args: [[]] },
    ],
    reference: (items: { price: number; qty: number }[]) =>
      items.map((i) => i.price * i.qty).reduce((s, c) => s + c, 0),
  },
  {
    id: "chain-3",
    methodId: "chaining",
    title: "Filter, then reduce",
    difficulty: "medium",
    prompt:
      "Implement `sumOfAdults(people)` where each person is `{ name, age }`. Chain `.filter()` to keep only people 18 or older, then `.reduce()` to sum their ages.",
    functionName: "sumOfAdults",
    starterCode: `function sumOfAdults(people) {
  return people
    .filter(p => {/* age >= 18 */})
    .reduce((sum, p) => {/* accumulate p.age */}, 0);
}`,
    solutionCode: `function sumOfAdults(people) {
  return people.filter(p => p.age >= 18).reduce((sum, p) => sum + p.age, 0);
}`,
    hints: [
      "Filter down to adults first — the reduce callback then only ever sees people who qualify.",
      "Inside reduce, `sum + p.age` adds the current person's age to the running total.",
    ],
    testCases: [
      {
        label: "mixed ages",
        args: [
          [
            { name: "A", age: 10 },
            { name: "B", age: 25 },
            { name: "C", age: 40 },
          ],
        ],
      },
      { label: "no adults", args: [[{ name: "A", age: 5 }]] },
    ],
    reference: (people: { name: string; age: number }[]) =>
      people.filter((p) => p.age >= 18).reduce((s, p) => s + p.age, 0),
  },
  {
    id: "chain-4",
    methodId: "chaining",
    title: "Sort, then slice",
    difficulty: "medium",
    prompt:
      "Implement `topN(scores, n)` that returns the `n` highest scores, sorted descending, without mutating the input array. Chain a non-mutating sort with `.slice()`.",
    functionName: "topN",
    starterCode: `function topN(scores, n) {
  return [...scores]
    .sort((a, b) => {/* descending */})
    .slice(0, n);
}`,
    solutionCode: `function topN(scores, n) {
  return [...scores].sort((a, b) => b - a).slice(0, n);
}`,
    hints: [
      "Copy first with `[...scores]` so sort's mutation never touches the caller's array.",
      "`(a, b) => b - a` sorts descending, largest first.",
      "slice(0, n) then trims the sorted array down to the top n.",
    ],
    testCases: [
      { label: "top 2 of several", args: [[5, 9, 1, 7, 3], 2] },
      { label: "n larger than array", args: [[4, 2], 5] },
    ],
    reference: (scores: number[], n: number) => [...scores].sort((a, b) => b - a).slice(0, n),
  },
  {
    id: "chain-5",
    methodId: "chaining",
    title: "flatMap, then filter",
    difficulty: "hard",
    prompt:
      "Implement `longWordsInAll(sentences)` that splits every sentence into words (flatMap) and then keeps only words longer than 4 characters (filter).",
    functionName: "longWordsInAll",
    starterCode: `function longWordsInAll(sentences) {
  return sentences
    .flatMap(s => {/* split into words */})
    .filter(w => {/* keep long words */});
}`,
    solutionCode: `function longWordsInAll(sentences) {
  return sentences.flatMap(s => s.split(" ")).filter(w => w.length > 4);
}`,
    hints: [
      "flatMap with `s.split(\" \")` gives you one flat array of every word across all sentences.",
      "Then filter that flat array by `w.length > 4`.",
    ],
    testCases: [
      { label: "two sentences", args: [["the quick brown fox", "a lazy dog sleeps"]] },
      { label: "no long words", args: [["a to it is"]] },
    ],
    reference: (sentences: string[]) =>
      sentences.flatMap((s) => s.split(" ")).filter((w) => w.length > 4),
  },
  {
    id: "chain-6",
    methodId: "chaining",
    title: "The full pipeline",
    difficulty: "hard",
    prompt:
      "Implement `report(orders)` where each order is `{ item, category, amount }`. Return the total `amount` of every order in the \"electronics\" category, rounded to 2 decimals, by chaining `.filter()`, `.map()`, and `.reduce()` in one expression.",
    functionName: "report",
    starterCode: `function report(orders) {
  const total = orders
    .filter(o => {/* category === "electronics" */})
    .map(o => {/* pull out amount */})
    .reduce((sum, amt) => {/* accumulate */}, 0);
  return Math.round(total * 100) / 100;
}`,
    solutionCode: `function report(orders) {
  const total = orders
    .filter(o => o.category === "electronics")
    .map(o => o.amount)
    .reduce((sum, amt) => sum + amt, 0);
  return Math.round(total * 100) / 100;
}`,
    hints: [
      "Three-step pipeline: filter down to the right category, map to just the numbers you care about, reduce to one total.",
      "Each stage's output array feeds directly into the next stage — that's what makes chaining powerful.",
      "Rounding to 2 decimals: `Math.round(total * 100) / 100`.",
    ],
    testCases: [
      {
        label: "mixed categories",
        args: [
          [
            { item: "Phone", category: "electronics", amount: 199.999 },
            { item: "Shirt", category: "clothing", amount: 25 },
            { item: "Laptop", category: "electronics", amount: 899.001 },
          ],
        ],
      },
      { label: "no matching category", args: [[{ item: "Shirt", category: "clothing", amount: 25 }]] },
    ],
    reference: (orders: { item: string; category: string; amount: number }[]) => {
      const total = orders
        .filter((o) => o.category === "electronics")
        .map((o) => o.amount)
        .reduce((s, a) => s + a, 0);
      return Math.round(total * 100) / 100;
    },
  },
];

export const problemsByMethod = (methodId: string) => problems.filter((p) => p.methodId === methodId);

export const problemById = new Map(problems.map((p) => [p.id, p]));
