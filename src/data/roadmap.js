// Central roadmap graph. `ready: true` topics have a full TopicPage entry
// in data/topics/*.js. `ready: true` topics render a "coming soon" page
// but still appear in nav/roadmap so the structure is complete.
// col/row are grid coordinates used by the flow-diagram layout.

export const STAGES = [
  { id: 'foundations', label: 'Foundations', color: 'cyan' },
  { id: 'linear', label: 'Linear Structures', color: 'cyan' },
  { id: 'patterns', label: 'Core Patterns', color: 'amber' },
  { id: 'nonlinear', label: 'Non-Linear Structures', color: 'cyan' },
  { id: 'graph', label: 'Graphs', color: 'violet' },
  { id: 'advanced', label: 'Advanced Techniques', color: 'amber' },
];

export const ROADMAP = [
  { id: 'python-basics', title: 'Python Basics', stage: 'foundations', col: 0, row: 0, ready: true, deps: [] },
  { id: 'complexity', title: 'Complexity & Big O', stage: 'foundations', col: 0, row: 1, ready: true, deps: ['python-basics'] },

  { id: 'arrays', title: 'Arrays', stage: 'linear', col: 0, row: 2, ready: true, deps: ['complexity'] },
  { id: 'strings', title: 'Strings', stage: 'linear', col: -1, row: 3, ready: true, deps: ['arrays'] },
  { id: 'hashing', title: 'Hashing', stage: 'linear', col: 1, row: 3, ready: true, deps: ['arrays'] },

  { id: 'two-pointers', title: 'Two Pointers', stage: 'patterns', col: -1, row: 4, ready: true, deps: ['strings', 'arrays'] },
  { id: 'sliding-window', title: 'Sliding Window', stage: 'patterns', col: 1, row: 4, ready: true, deps: ['hashing', 'arrays'] },
  { id: 'searching', title: 'Searching', stage: 'patterns', col: 0, row: 5, ready: true, deps: ['two-pointers', 'sliding-window'] },
  { id: 'sorting', title: 'Sorting', stage: 'patterns', col: 0, row: 6, ready: true, deps: ['searching'] },

  { id: 'linked-lists', title: 'Linked Lists', stage: 'linear', col: 0, row: 7, ready: true, deps: ['sorting'] },
  { id: 'stack', title: 'Stack', stage: 'linear', col: -1, row: 8, ready: true, deps: ['linked-lists'] },
  { id: 'queue', title: 'Queue', stage: 'linear', col: 1, row: 8, ready: true, deps: ['linked-lists'] },
  { id: 'recursion', title: 'Recursion', stage: 'foundations', col: 0, row: 9, ready: true, deps: ['stack', 'queue'] },
  { id: 'backtracking', title: 'Backtracking', stage: 'advanced', col: 0, row: 10, ready: true, deps: ['recursion'] },

  { id: 'trees', title: 'Trees', stage: 'nonlinear', col: 0, row: 11, ready: true, deps: ['backtracking'] },
  { id: 'bst', title: 'Binary Search Tree', stage: 'nonlinear', col: -1, row: 12, ready: true, deps: ['trees'] },
  { id: 'heap', title: 'Heap', stage: 'nonlinear', col: 1, row: 12, ready: true, deps: ['trees'] },
  { id: 'trie', title: 'Trie', stage: 'nonlinear', col: 0, row: 13, ready: true, deps: ['bst', 'heap'] },

  { id: 'graphs', title: 'Graphs', stage: 'graph', col: 0, row: 14, ready: true, deps: ['trie'] },
  { id: 'bfs', title: 'BFS', stage: 'graph', col: -1, row: 15, ready: true, deps: ['graphs'] },
  { id: 'dfs', title: 'DFS', stage: 'graph', col: 1, row: 15, ready: true, deps: ['graphs'] },
  { id: 'graph-algorithms', title: 'Graph Algorithms', stage: 'graph', col: 0, row: 16, ready: true, deps: ['bfs', 'dfs'] },

  { id: 'greedy', title: 'Greedy', stage: 'advanced', col: -1, row: 17, ready: true, deps: ['graph-algorithms'] },
  { id: 'dp', title: 'Dynamic Programming', stage: 'advanced', col: 1, row: 17, ready: true, deps: ['graph-algorithms'] },
  { id: 'bit-manipulation', title: 'Bit Manipulation', stage: 'advanced', col: -1, row: 18, ready: true, deps: ['greedy'] },
  { id: 'advanced-ds', title: 'Advanced Data Structures', stage: 'advanced', col: 1, row: 18, ready: true, deps: ['dp'] },
];

export const byId = (id) => ROADMAP.find((t) => t.id === id);

export const NAV_ORDER = ROADMAP.map((t, i) => ({ ...t, num: String(i + 1).padStart(2, '0') }));
