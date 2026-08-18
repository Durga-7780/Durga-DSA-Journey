export const PATTERNS = [
  { id: 'two-pointers', title: 'Two Pointers', recognize: 'Sorted array/list, or comparing from both ends.', examples: 'Pair with target sum, palindrome check, container with most water.' },
  { id: 'sliding-window', title: 'Sliding Window', recognize: 'The word "contiguous" + a running condition (sum, distinct count).', examples: 'Longest substring without repeats, max sum subarray of size k.' },
  { id: 'fast-slow', title: 'Fast & Slow Pointers', recognize: 'Linked list, "find the middle" or "detect a cycle".', examples: 'Cycle detection, middle of a linked list, happy number.' },
  { id: 'prefix-sum', title: 'Prefix Sum', recognize: 'Repeated range-sum queries on a static array.', examples: 'Subarray sum equals k, range sum query.' },
  { id: 'hashing', title: 'Hashing', recognize: '"Have I seen this before?" — lookups, frequency, pairs.', examples: 'Two sum, anagram grouping, longest consecutive sequence.' },
  { id: 'binary-search', title: 'Binary Search', recognize: 'Sorted data, or a monotonic yes/no condition over a range.', examples: 'Search in rotated array, first bad version, minimize max distance.' },
  { id: 'merge-intervals', title: 'Merge Intervals', recognize: 'Intervals that might overlap and need combining.', examples: 'Merge intervals, insert interval, meeting rooms.' },
  { id: 'monotonic-stack', title: 'Monotonic Stack', recognize: '"Next greater/smaller element" phrasing.', examples: 'Daily temperatures, largest rectangle in histogram.' },
  { id: 'top-k', title: 'Top K / Heap', recognize: '"K largest/smallest/most frequent" — don\'t need full sort.', examples: 'Kth largest element, top k frequent words, merge k sorted lists.' },
  { id: 'bfs-pattern', title: 'BFS', recognize: 'Shortest path / minimum steps in an unweighted graph or grid.', examples: 'Word ladder, rotting oranges, shortest path in binary matrix.' },
  { id: 'dfs-pattern', title: 'DFS / Backtracking', recognize: '"All possible ..." — combinations, permutations, paths.', examples: 'Subsets, N-Queens, word search, number of islands.' },
  { id: 'dp-pattern', title: 'Dynamic Programming', recognize: '"Number of ways", "min/max cost", overlapping subproblems.', examples: 'Climbing stairs, coin change, longest common subsequence.' },
  { id: 'union-find', title: 'Union Find', recognize: 'Repeated "are these connected?" queries as edges are added.', examples: 'Number of connected components, redundant connection.' },
  { id: 'topo-sort', title: 'Topological Sort', recognize: 'Ordering with dependency constraints (DAG).', examples: 'Course schedule, build order, task sequencing.' },
];

// Decision tree for "how do I recognize the algorithm?"
// Each node: either a question with branches, or a leaf pointing to a pattern.
export const DECISION_TREE = {
  q: 'What does the problem give you?',
  branches: [
    {
      label: 'A sorted array',
      node: {
        q: 'Are you looking for a pair or a specific value?',
        branches: [
          { label: 'A specific value / boundary', node: { leaf: 'binary-search', note: 'Binary Search' } },
          { label: 'A pair or triplet matching a sum', node: { leaf: 'two-pointers', note: 'Two Pointers' } },
        ],
      },
    },
    {
      label: 'A contiguous range / substring',
      node: {
        q: 'Is the window size fixed?',
        branches: [
          { label: 'Fixed size k', node: { leaf: 'sliding-window', note: 'Sliding Window (fixed)' } },
          { label: 'Grows/shrinks by a condition', node: { leaf: 'sliding-window', note: 'Sliding Window (variable)' } },
        ],
      },
    },
    {
      label: 'A linked list',
      node: {
        q: 'What are you trying to find?',
        branches: [
          { label: 'Middle / cycle', node: { leaf: 'fast-slow', note: 'Fast & Slow Pointers' } },
          { label: 'Reverse / reorder', node: { leaf: 'two-pointers', note: 'Iterative pointer manipulation' } },
        ],
      },
    },
    {
      label: 'A graph or grid',
      node: {
        q: 'Do you need the shortest path, or all paths?',
        branches: [
          { label: 'Shortest path (unweighted)', node: { leaf: 'bfs-pattern', note: 'BFS' } },
          { label: 'All paths / combinations', node: { leaf: 'dfs-pattern', note: 'DFS / Backtracking' } },
          { label: '"Are these connected?" repeatedly', node: { leaf: 'union-find', note: 'Union Find' } },
        ],
      },
    },
    {
      label: 'Counting ways, or min/max cost',
      node: {
        q: 'Do subproblems overlap?',
        branches: [
          { label: 'Yes — recomputed repeatedly', node: { leaf: 'dp-pattern', note: 'Dynamic Programming' } },
          { label: 'No — a locally best choice is always safe', node: { leaf: 'top-k', note: 'Greedy (see Level 23)' } },
        ],
      },
    },
  ],
};
