// Central roadmap graph. `ready: true` topics have a full TopicPage entry
// in data/topics/*.js. Topics with `ready: false` render a "coming soon"
// page but still appear in nav/roadmap so the structure is complete.
//
// col / row — grid coordinates used by the visual flow-diagram layout.
//   col  0 = center spine
//   col -1 = one step left,  col +1 = one step right
//   col -2 = two steps left, col +2 = two steps right
//
// Each row is one conceptual "level" in the learning ladder.

export const STAGES = [
  { id: 'foundations', label: 'Foundations', color: 'cyan' },
  { id: 'linear', label: 'Linear Structures', color: 'cyan' },
  { id: 'patterns', label: 'Core Patterns', color: 'amber' },
  { id: 'nonlinear', label: 'Non-Linear Structs', color: 'cyan' },
  { id: 'graph', label: 'Graphs', color: 'violet' },
  { id: 'advanced', label: 'Advanced Techniques', color: 'amber' },
];

export const ROADMAP = [

  // ─── ROW 0 — Foundations ───────────────────────────────────────────────────
  { id: 'python-basics', title: 'Python Basics', stage: 'foundations', col: 0, row: 0, ready: true, deps: [] },

  // ─── ROW 1 ─────────────────────────────────────────────────────────────────
  { id: 'complexity', title: 'Complexity & Big O', stage: 'foundations', col: 0, row: 1, ready: true, deps: ['python-basics'] },

  // ─── ROW 2 — Linear: Arrays ────────────────────────────────────────────────
  { id: 'arrays', title: 'Arrays', stage: 'linear', col: 0, row: 2, ready: true, deps: ['complexity'] },

  // ─── ROW 3 — Linear: Strings & Hashing ─────────────────────────────────────
  { id: 'strings', title: 'Strings', stage: 'linear', col: -1, row: 3, ready: true, deps: ['arrays'] },
  { id: 'hashing', title: 'Hashing', stage: 'linear', col: 1, row: 3, ready: true, deps: ['arrays'] },

  // ─── ROW 4 — Patterns: Two Pointers, Sliding Window, Kadane ────────────────
  { id: 'two-pointers', title: 'Two Pointers', stage: 'patterns', col: -1, row: 4, ready: true, deps: ['strings', 'arrays'] },
  { id: 'sliding-window', title: 'Sliding Window', stage: 'patterns', col: 1, row: 4, ready: true, deps: ['hashing', 'arrays'] },
  { id: 'kadane', title: "Kadane's Algo", stage: 'patterns', col: 2, row: 4, ready: true, deps: ['arrays'] },

  // ─── ROW 5 — Searching (Linear & Binary) ───────────────────────────────────
  { id: 'searching', title: 'Searching', stage: 'patterns', col: 0, row: 5, ready: true, deps: ['two-pointers', 'sliding-window'] },

  // ─── ROW 6 — Sorting algorithms ─────────────────────────────────────────────
  //   Col 0 = general Sorting overview
  //   Col -2 = Insertion Sort  |  Col -1 = (space)
  //   Col +1 = Merge Sort      |  Col +2 = Heap Sort
  { id: 'sorting', title: 'Sorting (Overview)', stage: 'patterns', col: 0, row: 6, ready: true, deps: ['searching'] },
  { id: 'insertion-sort', title: 'Insertion Sort', stage: 'patterns', col: -1, row: 6, ready: true, deps: ['sorting'] },
  { id: 'merge-sort', title: 'Merge Sort', stage: 'patterns', col: 1, row: 6, ready: true, deps: ['sorting'] },
  { id: 'heap-sort', title: 'Heap Sort', stage: 'patterns', col: 2, row: 6, ready: true, deps: ['sorting'] },

  // ─── ROW 7 — Linear: Linked Lists ──────────────────────────────────────────
  { id: 'linked-lists', title: 'Linked Lists', stage: 'linear', col: 0, row: 7, ready: true, deps: ['sorting'] },
  { id: 'doubly-linked-list', title: 'Doubly Linked List', stage: 'linear', col: -1, row: 8, ready: true, deps: ['linked-lists'] },
  { id: 'circular-linked-list', title: 'Circular Linked List', stage: 'linear', col: 1, row: 8, ready: true, deps: ['linked-lists'] },
  { id: 'fast-and-slow', title: 'Fast & Slow Pointers', stage: 'patterns', col: 0, row: 8, ready: true, deps: ['linked-lists'] },

  // ─── ROW 9 — Stack & Queue ──────────────────────────────────────────────────
  { id: 'stack', title: 'Stack', stage: 'linear', col: -1, row: 9, ready: true, deps: ['doubly-linked-list', 'fast-and-slow'] },
  { id: 'queue', title: 'Queue', stage: 'linear', col: 1, row: 9, ready: true, deps: ['circular-linked-list', 'fast-and-slow'] },

  // ─── ROW 10 — Recursion ────────────────────────────────────────────────────
  { id: 'recursion', title: 'Recursion', stage: 'foundations', col: 0, row: 10, ready: true, deps: ['stack', 'queue'] },

  // ─── ROW 11 — Backtracking ─────────────────────────────────────────────────
  { id: 'backtracking', title: 'Backtracking', stage: 'advanced', col: 0, row: 11, ready: true, deps: ['recursion'] },

  // ─── ROW 12 — Non-Linear: Trees ────────────────────────────────────────────
  { id: 'trees', title: 'Trees', stage: 'nonlinear', col: 0, row: 12, ready: true, deps: ['backtracking'] },

  // ─── ROW 13 — Tree traversals & Binary Tree ─────────────────────────────────
  //   Preorder / Inorder / Postorder live under "trees" in topic detail (via BST page)
  //   BST needs the tree traversal understanding first
  { id: 'bst', title: 'Binary Search Tree', stage: 'nonlinear', col: -1, row: 13, ready: true, deps: ['trees'] },
  { id: 'heap', title: 'Heap', stage: 'nonlinear', col: 1, row: 13, ready: true, deps: ['trees'] },

  // ─── ROW 14 — Trie ─────────────────────────────────────────────────────────
  { id: 'trie', title: 'Trie', stage: 'nonlinear', col: 0, row: 14, ready: true, deps: ['bst', 'heap'] },

  // ─── ROW 15 — Graphs ───────────────────────────────────────────────────────
  { id: 'graphs', title: 'Graphs', stage: 'graph', col: 0, row: 15, ready: true, deps: ['trie'] },

  // ─── ROW 16 — Graph traversals ─────────────────────────────────────────────
  { id: 'bfs', title: 'BFS', stage: 'graph', col: -1, row: 16, ready: true, deps: ['graphs'] },
  { id: 'dfs', title: 'DFS', stage: 'graph', col: 1, row: 16, ready: true, deps: ['graphs'] },

  // ─── ROW 17 — Graph Algorithms ─────────────────────────────────────────────
  { id: 'graph-algorithms', title: 'Graph Algorithms', stage: 'graph', col: 0, row: 17, ready: true, deps: ['bfs', 'dfs'] },

  // ─── ROW 18 — Advanced Techniques ──────────────────────────────────────────
  { id: 'greedy', title: 'Greedy', stage: 'advanced', col: -1, row: 18, ready: true, deps: ['graph-algorithms'] },
  { id: 'dp', title: 'Dynamic Programming', stage: 'advanced', col: 1, row: 18, ready: true, deps: ['graph-algorithms'] },

  // ─── ROW 19 — Final Advanced ───────────────────────────────────────────────
  { id: 'bit-manipulation', title: 'Bit Manipulation', stage: 'advanced', col: -1, row: 19, ready: true, deps: ['greedy'] },
  { id: 'advanced-ds', title: 'Advanced Data Structures', stage: 'advanced', col: 1, row: 19, ready: true, deps: ['dp'] },
];

export const byId = (id) => ROADMAP.find((t) => t.id === id);

export const NAV_ORDER = ROADMAP.map((t, i) => ({ ...t, num: String(i + 1).padStart(2, '0') }));
