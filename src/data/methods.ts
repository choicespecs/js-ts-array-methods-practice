import type { MethodInfo } from "../types";

export const methods: MethodInfo[] = [
  {
    id: "forEach",
    name: "forEach",
    category: "Iteration",
    tagline: "Run a function for every element (no new array).",
    syntax: "array.forEach((element, index, array) => { /* ... */ })",
    description:
      "forEach walks through every element and runs your callback for its side effects. It always returns undefined, so it's the wrong tool whenever you actually need a new value back — reach for map or reduce instead.",
    example: {
      code: `["a", "b", "c"].forEach((el, i) => console.log(i, el));`,
      result: `0 'a'\n1 'b'\n2 'c'`,
    },
    gotchas: [
      "Returns undefined — you cannot chain another array method after it.",
      "Cannot be stopped early with break/return like a for-loop can.",
    ],
  },
  {
    id: "map",
    name: "map",
    category: "Transformation",
    tagline: "Transform every element into something new.",
    syntax: "const result = array.map((element, index, array) => newValue)",
    description:
      "map builds a brand-new array of the exact same length, where each element is the return value of your callback. Use it whenever you want to change the shape or value of every item but keep them all.",
    example: {
      code: `[1, 2, 3].map(n => n * 10)`,
      result: `[10, 20, 30]`,
    },
    gotchas: [
      "Forgetting to return a value from the callback fills the array with undefined.",
      "map always returns the same length as the input — use filter first if you need to drop items.",
    ],
  },
  {
    id: "filter",
    name: "filter",
    category: "Filtering",
    tagline: "Keep only the elements that pass a test.",
    syntax: "const result = array.filter((element, index, array) => boolean)",
    description:
      "filter builds a new array containing only the elements for which your callback returns a truthy value. The result can be shorter than (or equal to) the original — never longer.",
    example: {
      code: `[1, 2, 3, 4, 5].filter(n => n % 2 === 0)`,
      result: `[2, 4]`,
    },
    gotchas: [
      "The callback must return a boolean-ish value, not the element itself.",
      "filter never mutates the original array.",
    ],
  },
  {
    id: "reduce",
    name: "reduce",
    category: "Aggregation",
    tagline: "Fold an array down into a single value.",
    syntax: "array.reduce((accumulator, element, index, array) => newAccumulator, initialValue)",
    description:
      "reduce is the Swiss-army knife of array methods — it can express map, filter, and more. It walks the array left to right, carrying an accumulator forward and returning whatever your callback returns as the next accumulator.",
    example: {
      code: `[1, 2, 3, 4].reduce((sum, n) => sum + n, 0)`,
      result: `10`,
    },
    gotchas: [
      "Omitting the initial value uses the first element as the seed and starts iterating from index 1 — risky on empty arrays (throws a TypeError).",
      "Forgetting to return the accumulator each call silently breaks the fold.",
    ],
  },
  {
    id: "find",
    name: "find",
    category: "Search",
    tagline: "Get the first element that matches, or undefined.",
    syntax: "const result = array.find((element, index, array) => boolean)",
    description:
      "find scans left to right and returns the first element for which the callback is truthy. If nothing matches, it returns undefined. Unlike filter, it returns the element itself, not an array.",
    example: {
      code: `[5, 12, 8, 130, 44].find(n => n > 10)`,
      result: `12`,
    },
  },
  {
    id: "findIndex",
    name: "findIndex",
    category: "Search",
    tagline: "Get the index of the first match, or -1.",
    syntax: "const result = array.findIndex((element, index, array) => boolean)",
    description:
      "findIndex behaves exactly like find, but returns the matching index instead of the element — or -1 when nothing matches. Handy when you need to splice or replace an item in place.",
    example: {
      code: `[5, 12, 8, 130, 44].findIndex(n => n > 10)`,
      result: `1`,
    },
  },
  {
    id: "some",
    name: "some",
    category: "Search",
    tagline: "Does at least one element pass the test?",
    syntax: "const result = array.some((element, index, array) => boolean)",
    description:
      "some returns true as soon as any element satisfies the callback, short-circuiting the scan. On an empty array it always returns false.",
    example: {
      code: `[1, 2, 3].some(n => n % 2 === 0)`,
      result: `true`,
    },
  },
  {
    id: "every",
    name: "every",
    category: "Search",
    tagline: "Do all elements pass the test?",
    syntax: "const result = array.every((element, index, array) => boolean)",
    description:
      "every returns true only if the callback is truthy for every element, short-circuiting on the first failure. On an empty array it always (vacuously) returns true.",
    example: {
      code: `[2, 4, 6].every(n => n % 2 === 0)`,
      result: `true`,
    },
  },
  {
    id: "includes",
    name: "includes",
    category: "Search",
    tagline: "Does the array contain this exact value?",
    syntax: "const result = array.includes(valueToFind, fromIndex?)",
    description:
      "includes checks for a value using strict-equality-like semantics (it also correctly matches NaN, unlike indexOf). It returns a plain boolean — use find/findIndex when you need more than yes/no.",
    example: {
      code: `[1, 2, NaN].includes(NaN)`,
      result: `true`,
    },
  },
  {
    id: "indexOf",
    name: "indexOf",
    category: "Search",
    tagline: "Find the index of an exact value.",
    syntax: "const result = array.indexOf(valueToFind, fromIndex?)",
    description:
      "indexOf returns the first index where the value strictly equals (===) the target, or -1 if absent. It cannot find NaN (use includes for that) and cannot take a custom comparison function (use findIndex for that).",
    example: {
      code: `["a", "b", "c"].indexOf("b")`,
      result: `1`,
    },
  },
  {
    id: "sort",
    name: "sort",
    category: "Ordering",
    tagline: "Sort elements in place.",
    syntax: "array.sort((a, b) => number)",
    description:
      "sort mutates the original array and also returns it. Without a compare function it converts elements to strings and sorts lexicographically — '10' comes before '2'! Always pass a compare function for numbers: return a negative number to put a first, positive to put b first, 0 to leave the order.",
    example: {
      code: `[10, 1, 21, 2].sort((a, b) => a - b)`,
      result: `[1, 2, 10, 21]`,
    },
    gotchas: [
      "sort() with no compare function sorts numbers as strings: [10, 1, 2] becomes [1, 10, 2].",
      "sort mutates the original array — copy first with [...array] if you need to preserve it.",
    ],
  },
  {
    id: "reverse",
    name: "reverse",
    category: "Ordering",
    tagline: "Reverse element order in place.",
    syntax: "array.reverse()",
    description:
      "reverse mutates the array so the last element becomes the first, and returns the same (now-reversed) array reference.",
    example: {
      code: `[1, 2, 3].reverse()`,
      result: `[3, 2, 1]`,
    },
  },
  {
    id: "slice",
    name: "slice",
    category: "Extraction",
    tagline: "Copy a portion of an array, non-destructively.",
    syntax: "const result = array.slice(startIndex?, endIndex?)",
    description:
      "slice returns a shallow copy of a section of the array from start (inclusive) to end (exclusive), without touching the original. Negative indices count from the end.",
    example: {
      code: `[1, 2, 3, 4, 5].slice(1, 3)`,
      result: `[2, 3]`,
    },
    gotchas: ["slice never mutates. Its cousin splice does — easy to mix up."],
  },
  {
    id: "splice",
    name: "splice",
    category: "Extraction",
    tagline: "Remove/insert elements in place.",
    syntax: "array.splice(startIndex, deleteCount?, ...itemsToInsert)",
    description:
      "splice mutates the array directly: it removes deleteCount elements starting at startIndex, optionally inserting new items in their place, and returns an array of the removed elements.",
    example: {
      code: `const a = [1, 2, 3, 4]; a.splice(1, 2, "x"); a`,
      result: `[1, "x", 4]`,
    },
    gotchas: ["splice returns the *removed* elements, not the resulting array — a very common mix-up."],
  },
  {
    id: "concat",
    name: "concat",
    category: "Combining",
    tagline: "Merge arrays into a new array.",
    syntax: "const result = array.concat(otherArray, ...)",
    description:
      "concat returns a new array formed by joining the original with one or more arrays/values, without mutating any input. The spread operator ([...a, ...b]) is the modern equivalent.",
    example: {
      code: `[1, 2].concat([3, 4], 5)`,
      result: `[1, 2, 3, 4, 5]`,
    },
  },
  {
    id: "flat",
    name: "flat",
    category: "Combining",
    tagline: "Flatten nested arrays.",
    syntax: "const result = array.flat(depth = 1)",
    description:
      "flat returns a new array with sub-array elements concatenated up to the given depth. Use Infinity to fully flatten an arbitrarily nested structure.",
    example: {
      code: `[1, [2, [3, [4]]]].flat(2)`,
      result: `[1, 2, 3, [4]]`,
    },
  },
  {
    id: "flatMap",
    name: "flatMap",
    category: "Combining",
    tagline: "map, then flatten one level.",
    syntax: "const result = array.flatMap((element, index, array) => valueOrArray)",
    description:
      "flatMap first maps every element with your callback, then flattens the result by exactly one level — more efficient than calling map().flat() separately. Great for callbacks that sometimes return zero, one, or many items.",
    example: {
      code: `[1, 2, 3].flatMap(n => [n, n * 2])`,
      result: `[1, 2, 2, 4, 3, 6]`,
    },
  },
  {
    id: "join",
    name: "join",
    category: "Combining",
    tagline: "Turn an array into a string.",
    syntax: "const result = array.join(separator = ',')",
    description:
      "join concatenates every element into a single string, separated by the given separator (default is a comma). It's the inverse of String.prototype.split.",
    example: {
      code: `["a", "b", "c"].join(" - ")`,
      result: `'a - b - c'`,
    },
  },
];

export const methodById = new Map(methods.map((m) => [m.id, m]));

export const categories = Array.from(new Set(methods.map((m) => m.category)));
