// Full content for every "ready" topic. Keyed by roadmap id.
// `viz` names a component from src/visualizations/index.jsx to mount.

const topics = {

  complexity: {
    difficulty: 'Beginner',
    tagline: 'How to talk about how fast — and how much memory — code costs.',
    whatIsIt:
      'Big O notation describes how the runtime or memory use of an algorithm grows as the input size (n) grows. It ignores constant factors and hardware — it only cares about the shape of the growth curve.',
    whyNeeded:
      'Two solutions can both be "correct" and still be worlds apart at scale. Big O gives you a hardware-independent way to compare them before you ever run the code — and it\'s the language every interview evaluates your solution in.',
    howItWorks: [
      'Count the operations relative to input size n, not exact seconds.',
      'Drop constants: 3n becomes O(n).',
      'Keep only the fastest-growing term: n² + n becomes O(n²).',
      'Nested loops over the same input usually multiply; sequential loops usually add.',
    ],
    viz: 'Complexity',
    pythonCode: `# O(1) - constant
def first(arr):
    return arr[0]

# O(n) - linear
def contains(arr, target):
    for x in arr:
        if x == target:
            return True
    return False

# O(n^2) - quadratic (nested loop over same input)
def has_duplicate_pair(arr):
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] == arr[j]:
                return True
    return False

# O(log n) - halves the problem each step
def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,
    complexity: { time: 'varies — this topic defines the scale', space: 'varies', notes: 'The goal here is fluency reading the curve, not one number.' },
    whenToUse: [
      'Before choosing a data structure — a hash set turns an O(n²) duplicate check into O(n).',
      'When comparing two working solutions to the same problem.',
      'When estimating whether a solution will time out for the given input bounds (n ≤ 10⁵ usually rules out O(n²)).',
    ],
    interviewTips: [
      'State the complexity of your solution out loud before being asked — it signals you\'re thinking about it.',
      'Know the rough input-size cutoffs: n ≤ 20 → exponential OK, n ≤ 1000 → O(n²) OK, n ≤ 10⁶ → need O(n log n) or better.',
      'Be ready to state both time AND space complexity.',
    ],
    commonMistakes: [
      'Confusing "the loop runs n times" with "the algorithm is O(n)" when the loop body itself does O(n) work.',
      'Forgetting that built-in operations like `list.insert(0, x)` or `x in list` are not O(1).',
      'Ignoring space complexity — recursion depth counts as space too.',
    ],
    related: ['arrays', 'sorting', 'searching'],
  },

  arrays: {
    difficulty: 'Beginner',
    tagline: 'Contiguous memory, indexed access — the structure everything else builds on.',
    whatIsIt:
      'An array is a fixed-layout, contiguous block of memory where each element sits at a predictable offset from the start. That\'s what makes index access instant.',
    whyNeeded:
      'Almost every other structure — strings, hash tables, heaps, dynamic arrays/lists — is built on top of array indexing. Understanding it is the foundation for the rest of the roadmap.',
    howItWorks: [
      'Access: jump straight to index i — no traversal needed.',
      'Search: no shortcuts without more info, so scan element by element.',
      'Insert/Delete in the middle: everything after the gap has to shift over.',
      'Prefix sums: precompute running totals so any range-sum query becomes O(1).',
    ],
    viz: 'Array',
    pythonCode: `arr = [10, 20, 30, 40, 50]

arr[2]                 # access -> O(1)
arr.append(60)          # insert at end -> O(1) amortized
arr.insert(0, 5)        # insert at start -> O(n), shifts everything
arr.pop(1)               # delete at index -> O(n)
30 in arr                # search -> O(n)

# Prefix sum: answer range-sum queries in O(1) after O(n) build
prefix = [0] * (len(arr) + 1)
for i, x in enumerate(arr):
    prefix[i + 1] = prefix[i] + x
# sum of arr[l..r] inclusive:
range_sum = prefix[r + 1] - prefix[l]`,
    complexity: { time: 'Access O(1) · Search O(n) · Insert/Delete O(n)', space: 'O(n)' },
    whenToUse: [
      'You need fast random access by index.',
      'The size is known or bounded — resizing is expensive.',
      'You need cache-friendly, contiguous iteration for speed.',
    ],
    interviewTips: [
      'If you see "subarray" or "contiguous", think prefix sums or sliding window before brute force.',
      'Watch for off-by-one errors at boundaries — walk through a 2–3 element example before coding.',
    ],
    commonMistakes: [
      'Using `arr.insert(0, x)` in a loop — quietly turns an O(n) algorithm into O(n²).',
      'Mutating an array while iterating over it with a for-loop.',
      'Forgetting prefix sums need a leading 0 to avoid special-casing index 0.',
    ],
    related: ['complexity', 'two-pointers', 'sliding-window', 'sorting'],
  },

  'two-pointers': {
    difficulty: 'Beginner',
    tagline: 'Two indices scanning toward or across each other to avoid a nested loop.',
    whatIsIt:
      'A pattern where you keep two indices into a (usually sorted) sequence and move them based on a comparison, instead of checking every pair — collapsing an O(n²) brute force into O(n).',
    whyNeeded:
      'Any time you\'re comparing pairs of elements in a sorted or structured sequence, two pointers turns the nested-loop brute force into a single linear pass.',
    howItWorks: [
      'Place L at the start, R at the end (or both at the start for same-direction variants).',
      'Compare arr[L] and arr[R] against the target/condition.',
      'If the sum is too small, move L right (increase); too large, move R left (decrease).',
      'Stop when L and R meet — every pair has effectively been considered once.',
    ],
    viz: 'TwoPointers',
    pythonCode: `def two_sum_sorted(arr, target):
    l, r = 0, len(arr) - 1
    while l < r:
        s = arr[l] + arr[r]
        if s == target:
            return [l, r]
        elif s < target:
            l += 1          # need a bigger sum
        else:
            r -= 1          # need a smaller sum
    return None`,
    complexity: { time: 'O(n)', space: 'O(1)' },
    whenToUse: [
      'The input is sorted (or can be sorted) and you\'re looking for a pair/triplet meeting a condition.',
      'You need to detect palindromes, or reverse/partition in place.',
      'Fast & slow pointer variant: cycle detection, finding the middle of a linked list.',
    ],
    interviewTips: [
      'Ask yourself: "Can I rule out one side once I know arr[L]+arr[R]?" — if yes, two pointers applies.',
      'For triplets (3Sum), fix one element and two-pointer the rest — O(n²) instead of O(n³).',
    ],
    commonMistakes: [
      'Forgetting the array must be sorted for the classic converging-pointer version.',
      'Off-by-one on the stop condition — usually `l < r`, not `l <= r`.',
      'Not skipping duplicates when the problem asks for unique pairs.',
    ],
    related: ['arrays', 'sliding-window', 'searching'],
  },

  'sliding-window': {
    difficulty: 'Beginner',
    tagline: 'A contiguous range that grows and shrinks instead of restarting from scratch.',
    whatIsIt:
      'A window [left, right] over a sequence that expands by moving right and contracts by moving left, reusing work from the previous position instead of recomputing from zero.',
    whyNeeded:
      'Any brute force that checks "every contiguous subarray/substring" is O(n²) or worse. If the window\'s validity can be updated incrementally, sliding window brings it down to O(n).',
    howItWorks: [
      'Expand: move right forward, add the new element to the running state.',
      'Check: does the window still satisfy the condition?',
      'Shrink (if needed): move left forward, remove elements from the state, until valid again.',
      'Record the answer (length, count, max/min) at each valid position.',
    ],
    viz: 'SlidingWindow',
    pythonCode: `def longest_substring_no_repeat(s):
    seen = {}
    left = 0
    best = 0
    for right, ch in enumerate(s):
        if ch in seen and seen[ch] >= left:
            left = seen[ch] + 1     # shrink past the repeat
        seen[ch] = right
        best = max(best, right - left + 1)
    return best`,
    complexity: { time: 'O(n)', space: 'O(k) for window state' },
    whenToUse: [
      'Fixed-size window: "max sum of any k consecutive elements".',
      'Variable-size window: "smallest subarray with sum ≥ target", "longest substring with at most k distinct chars".',
      'The keyword "contiguous" or "substring/subarray" combined with a running condition.',
    ],
    interviewTips: [
      'Say out loud what state you\'re tracking in the window (a sum, a frequency map, a count of distinct chars) — that\'s usually the crux of the problem.',
      'Variable windows almost always use a while-loop to shrink, not an if.',
    ],
    commonMistakes: [
      'Recomputing the whole window\'s state from scratch on every move instead of updating incrementally.',
      'Forgetting to shrink the window when the condition is violated, not just when it\'s satisfied.',
    ],
    related: ['two-pointers', 'arrays', 'hashing'],
  },

  searching: {
    difficulty: 'Beginner',
    tagline: 'Linear scan vs. halving the search space — and everything binary search unlocks.',
    whatIsIt:
      'Search algorithms locate a target within a collection. Linear search checks every element; binary search exploits sorted order to eliminate half the remaining candidates each step.',
    whyNeeded:
      'Binary search isn\'t just "find x in a sorted array" — it generalizes to any monotonic yes/no condition, which makes it one of the most reusable patterns in interviews ("binary search on the answer").',
    howItWorks: [
      'Set low and high to the array bounds.',
      'Check the midpoint: if it\'s the target, done.',
      'If the target is bigger, discard the left half (low = mid + 1).',
      'If the target is smaller, discard the right half (high = mid - 1).',
      'Repeat until low > high — the search space shrinks by half every step.',
    ],
    viz: 'BinarySearch',
    pythonCode: `def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

# Binary search on the answer: find smallest x where check(x) is True
def binary_search_on_answer(lo, hi, check):
    while lo < hi:
        mid = (lo + hi) // 2
        if check(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo`,
    complexity: { time: 'Linear O(n) · Binary O(log n)', space: 'O(1)' },
    whenToUse: [
      'The array is sorted, or can be cheaply sorted first.',
      'You need the first/last occurrence, insert position, or a rotated-array search — all binary search variants.',
      '"Minimize the maximum" / "maximize the minimum" problems — binary search on the answer.',
    ],
    interviewTips: [
      'Always confirm the array is sorted before reaching for binary search.',
      'Practice the "first True" template — it solves first/last occurrence, insert position, and answer-search with one shape.',
    ],
    commonMistakes: [
      'Using `mid = (lo + hi) // 2` in languages where this can overflow (not a Python issue, but interviewers notice if you know why `lo + (hi-lo)//2` is safer).',
      'Infinite loops from not moving lo/hi past mid correctly.',
    ],
    related: ['arrays', 'sorting', 'two-pointers'],
  },

  sorting: {
    difficulty: 'Beginner',
    tagline: 'Comparison-based and non-comparison algorithms for putting things in order.',
    whatIsIt:
      'Sorting rearranges elements into order. Different algorithms trade off time complexity, stability, and whether they sort in place.',
    whyNeeded:
      'Many algorithms (binary search, two pointers, greedy interval problems) only work correctly — or only become efficient — once the input is sorted first.',
    howItWorks: [
      'Comparison sorts (bubble, insertion, merge, quick) repeatedly compare and rearrange pairs or partitions.',
      'Bubble/Insertion: O(n²), simple, good for tiny or nearly-sorted input.',
      'Merge sort: divide, sort halves, merge — stable, O(n log n) guaranteed.',
      'Quick sort: pick a pivot, partition around it — fast in practice, O(n log n) average.',
    ],
    viz: 'Sorting',
    pythonCode: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

# Python's built-in sort is Timsort — O(n log n), stable
arr.sort()               # in place
sorted(arr)               # new list`,
    complexity: { time: 'Bubble/Insertion O(n²) · Merge/Quick/Heap O(n log n)', space: 'Merge O(n) · Quick/Heap O(log n)' },
    whenToUse: [
      'As a preprocessing step before binary search, two pointers, or greedy interval merging.',
      'Insertion sort for small or nearly-sorted arrays (it\'s adaptive).',
      'Merge sort when stability or worst-case guarantees matter.',
    ],
    interviewTips: [
      'Know the trade-offs table by heart: stability, in-place, worst-case — interviewers love asking "why not quicksort here?"',
      'Recognize "sort then two-pointer/greedy" as a pattern in its own right.',
    ],
    commonMistakes: [
      'Assuming quicksort is always O(n log n) — worst case is O(n²) on already-sorted input with a naive pivot.',
      'Forgetting merge sort needs O(n) extra space.',
    ],
    related: ['searching', 'arrays', 'complexity'],
  },

  'linked-lists': {
    difficulty: 'Beginner',
    tagline: 'Nodes connected by pointers instead of contiguous memory.',
    whatIsIt:
      'A sequence of nodes, each holding a value and a pointer to the next node. Unlike arrays, elements aren\'t stored contiguously — traversal follows pointers.',
    whyNeeded:
      'Insertion and deletion at a known position are O(1) — no shifting required — which makes linked lists the right tool when the data changes shape often but random access isn\'t needed.',
    howItWorks: [
      'Each node stores a value and a `next` reference (and `prev` for doubly linked).',
      'Traversal always starts from the head and follows `next` until `None`.',
      'Insert/Delete: relink the neighboring pointers — no shifting of other elements.',
      'Fast & slow pointers: the slow pointer moves 1 step, fast moves 2 — used to find the middle or detect a cycle.',
    ],
    viz: 'LinkedList',
    pythonCode: `class Node:
    def __init__(self, val, nxt=None):
        self.val = val
        self.next = nxt

def reverse(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev

def has_cycle(head):          # Floyd's fast & slow pointers
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False`,
    complexity: { time: 'Access O(n) · Insert/Delete at known node O(1)', space: 'O(n)' },
    whenToUse: [
      'Frequent insertions/deletions in the middle, with no need for random index access.',
      'Implementing stacks, queues, or LRU caches under the hood.',
      'Cycle detection or finding a middle element without extra memory.',
    ],
    interviewTips: [
      'Draw the list on paper/whiteboard before coding pointer-heavy operations — off-by-one pointer bugs are the #1 failure mode.',
      'Use a dummy head node to avoid special-casing operations on the first element.',
    ],
    commonMistakes: [
      'Losing the reference to the rest of the list when reversing (always save `next` before overwriting it).',
      'Not handling the empty list or single-node edge cases.',
    ],
    related: ['stack', 'queue', 'recursion'],
  },

  stack: {
    difficulty: 'Beginner',
    tagline: 'LIFO — Last In, First Out.',
    whatIsIt:
      'A stack only allows adding and removing from one end (the "top"). The last item pushed is always the first one popped.',
    whyNeeded:
      'Any time you need to reverse an order, backtrack, or match nested structure (parentheses, function calls, undo history), a stack is the natural fit.',
    howItWorks: [
      'push(x): add x to the top.',
      'pop(): remove and return the top item.',
      'peek(): look at the top item without removing it.',
      'Both operations only touch the top — O(1).',
    ],
    viz: 'Stack',
    pythonCode: `stack = []
stack.append(10)     # push
stack.append(20)
stack.append(30)
top = stack[-1]        # peek -> 30
stack.pop()             # pop -> 30, stack is now [10, 20]

def is_valid_parens(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []
    for ch in s:
        if ch in '([{':
            stack.append(ch)
        elif ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
    return not stack`,
    complexity: { time: 'Push/Pop/Peek O(1)', space: 'O(n)' },
    whenToUse: [
      'Matching/validating nested structures — parentheses, tags, expressions.',
      'Undo functionality, browser back button, DFS iterative traversal.',
      'Monotonic stack problems: next greater element, largest rectangle in histogram.',
    ],
    interviewTips: [
      'If a problem mentions "nested", "matching pairs", or "most recent unresolved", think stack immediately.',
      'Monotonic stack is a distinct, very common interview pattern — worth memorizing the template separately.',
    ],
    commonMistakes: [
      'Popping from an empty stack without checking first.',
      'Using a stack when the order actually needs to be FIFO (that\'s a queue).',
    ],
    related: ['queue', 'linked-lists', 'recursion'],
  },

  queue: {
    difficulty: 'Beginner',
    tagline: 'FIFO — First In, First Out.',
    whatIsIt:
      'A queue only adds at the back and removes from the front. The first item enqueued is always the first one dequeued.',
    whyNeeded:
      'Whenever order of arrival matters — task scheduling, BFS traversal, buffering — a queue enforces fairness that a stack can\'t.',
    howItWorks: [
      'enqueue(x): add x to the back.',
      'dequeue(): remove and return the item at the front.',
      'A circular queue reuses freed space at the front instead of shifting.',
      'A deque allows adding/removing at both ends — the general-purpose version.',
    ],
    viz: 'Queue',
    pythonCode: `from collections import deque

q = deque()
q.append(10)          # enqueue
q.append(20)
q.append(30)
front = q.popleft()   # dequeue -> 10

# Priority queue (min-heap) — always pops the smallest
import heapq
pq = []
heapq.heappush(pq, 5)
heapq.heappush(pq, 1)
heapq.heappop(pq)      # -> 1`,
    complexity: { time: 'Enqueue/Dequeue O(1) with deque', space: 'O(n)' },
    whenToUse: [
      'BFS traversal of a tree or graph — the queue naturally processes level by level.',
      'Task scheduling, rate limiting, producer/consumer buffering.',
      'Priority queue variant when you need "the smallest/largest so far" repeatedly.',
    ],
    interviewTips: [
      'In Python, never use a plain `list` as a queue — `pop(0)` is O(n). Use `collections.deque`.',
      'BFS = queue, DFS = stack (or recursion) — this pairing is worth having automatic.',
    ],
    commonMistakes: [
      'Using `list.pop(0)` for dequeue, silently making the algorithm O(n²).',
      'Forgetting to mark nodes visited before enqueueing them in BFS, causing duplicate work.',
    ],
    related: ['stack', 'bfs', 'linked-lists'],
  },

  trees: {
    difficulty: 'Intermediate',
    tagline: 'A hierarchical structure of nodes with no cycles — one path between any two nodes.',
    whatIsIt:
      'A tree is a connected, acyclic structure where each node has one parent (except the root) and any number of children. A binary tree restricts each node to at most two children.',
    whyNeeded:
      'Trees model hierarchy — file systems, org charts, parsing, decision structures — and are the base structure for BSTs, heaps, and tries covered later.',
    howItWorks: [
      'Preorder: visit node, then left subtree, then right subtree.',
      'Inorder: left subtree, node, right subtree — gives sorted order for a BST.',
      'Postorder: left subtree, right subtree, node — useful for deletion/cleanup.',
      'Level order (BFS): visit level by level using a queue.',
    ],
    viz: 'Tree',
    pythonCode: `class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def preorder(node, out):
    if not node:
        return
    out.append(node.val)
    preorder(node.left, out)
    preorder(node.right, out)

def height(node):
    if not node:
        return 0
    return 1 + max(height(node.left), height(node.right))`,
    complexity: { time: 'Traversal O(n)', space: 'O(h) recursion, h = height' },
    whenToUse: [
      'Data has a natural parent/child hierarchy.',
      'You need ordered traversal (inorder on a BST) or level-by-level processing.',
      'Recursive divide-and-conquer problems: height, diameter, path sums.',
    ],
    interviewTips: [
      'Most tree problems are a traversal variant — identify pre/in/post/level order first.',
      'State the recursive base case out loud (usually `if not node: return ...`) before writing the recursive step.',
    ],
    commonMistakes: [
      'Forgetting the base case for `None` nodes, causing a crash.',
      'Confusing "height" (edges to deepest leaf) with "depth" (edges from root to this node).',
    ],
    related: ['bst', 'heap', 'recursion', 'graphs'],
  },

  graphs: {
    difficulty: 'Intermediate',
    tagline: 'Vertices and edges — the most general way to model relationships.',
    whatIsIt:
      'A graph is a set of vertices (nodes) connected by edges. Edges can be directed or undirected, weighted or unweighted, and the graph can contain cycles (unlike a tree).',
    whyNeeded:
      'Networks, dependencies, maps, social connections, state machines — anything with "things and relationships between things" is naturally a graph.',
    howItWorks: [
      'Represent as an adjacency list: a map from each node to its neighbors.',
      'Directed edges only go one way; undirected edges imply both directions.',
      'A cycle is a path that returns to its starting node.',
      'Connected components: groups of nodes reachable from each other.',
    ],
    viz: 'Graph',
    pythonCode: `from collections import defaultdict

graph = defaultdict(list)
def add_edge(u, v, directed=False):
    graph[u].append(v)
    if not directed:
        graph[v].append(u)

add_edge('A', 'B')
add_edge('A', 'C')
add_edge('B', 'D')
# graph = {'A': ['B', 'C'], 'B': ['A', 'D'], 'C': ['A'], 'D': ['B']}`,
    complexity: { time: 'Build O(V + E)', space: 'O(V + E)' },
    whenToUse: [
      'Whenever the problem involves connections, dependencies, or "can I get from A to B?".',
      'Before choosing BFS/DFS/Dijkstra — first ask: directed or undirected? weighted? has cycles?',
    ],
    interviewTips: [
      'Clarify directed vs. undirected and weighted vs. unweighted before writing any code — it changes the whole algorithm choice.',
      'Adjacency list is almost always preferred over an adjacency matrix unless the graph is dense.',
    ],
    commonMistakes: [
      'Forgetting to mark nodes visited, causing infinite loops on cyclic graphs.',
      'Using an adjacency matrix on a sparse graph — wastes O(V²) space unnecessarily.',
    ],
    related: ['bfs', 'dfs', 'graph-algorithms', 'trees'],
  },

  bfs: {
    difficulty: 'Intermediate',
    tagline: 'Explore level by level using a queue — finds the shortest path in unweighted graphs.',
    whatIsIt:
      'Breadth-First Search visits all neighbors of a node before moving further out, using a queue. It processes the graph in expanding "rings" from the start node.',
    whyNeeded:
      'BFS is the only simple traversal that guarantees the first time you reach a node is via the shortest path — critical for unweighted shortest-path and "minimum steps" problems.',
    howItWorks: [
      'Start: enqueue the start node, mark it visited.',
      'Loop: dequeue a node, process it.',
      'For each unvisited neighbor: mark visited, enqueue it.',
      'Repeat until the queue is empty — nodes are visited in increasing distance order.',
    ],
    viz: 'BFS',
    pythonCode: `from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order`,
    complexity: { time: 'O(V + E)', space: 'O(V)' },
    whenToUse: [
      'Shortest path / minimum number of steps in an unweighted graph or grid.',
      'Level-order traversal of a tree.',
      'Finding all nodes within k connections of a start node.',
    ],
    interviewTips: [
      'Mark a node visited when you enqueue it, not when you dequeue it — otherwise duplicates sneak into the queue.',
      '"Minimum number of moves/steps" in a grid is almost always BFS.',
    ],
    commonMistakes: [
      'Marking visited on dequeue instead of enqueue, which can massively bloat the queue.',
      'Using BFS on a weighted graph expecting shortest path (that needs Dijkstra instead).',
    ],
    related: ['dfs', 'graphs', 'queue'],
  },

  dfs: {
    difficulty: 'Intermediate',
    tagline: 'Go as deep as possible before backtracking, using a stack (or recursion).',
    whatIsIt:
      'Depth-First Search follows one path all the way down before backtracking to try the next branch, using either recursion (the call stack) or an explicit stack.',
    whyNeeded:
      'DFS naturally expresses "explore all possibilities" — cycle detection, connected components, topological sort, and backtracking search all build on it.',
    howItWorks: [
      'Visit the current node, mark it visited.',
      'Recurse (or push) into each unvisited neighbor.',
      'When no unvisited neighbors remain, backtrack to the previous node.',
      'Repeat until every reachable node has been visited.',
    ],
    viz: 'DFS',
    pythonCode: `def dfs_recursive(graph, node, visited=None, order=None):
    if visited is None:
        visited, order = set(), []
    visited.add(node)
    order.append(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited, order)
    return order

def dfs_iterative(graph, start):
    visited = {start}
    stack = [start]
    order = []
    while stack:
        node = stack.pop()
        order.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                stack.append(neighbor)
    return order`,
    complexity: { time: 'O(V + E)', space: 'O(V) recursion/stack' },
    whenToUse: [
      'Exploring all paths, connected components, or detecting cycles.',
      'As the engine behind backtracking (subsets, permutations, maze solving).',
      'Topological sort of a DAG.',
    ],
    interviewTips: [
      'Recursive DFS is cleaner to write; iterative DFS avoids stack-overflow risk on very deep graphs — know both.',
      'Cycle detection differs for directed vs. undirected graphs — directed needs a "currently in recursion stack" set.',
    ],
    commonMistakes: [
      'Recursive DFS hitting Python\'s recursion limit on very deep/large graphs.',
      'Forgetting the visited check before recursing, causing infinite recursion on a cycle.',
    ],
    related: ['bfs', 'graphs', 'backtracking', 'stack'],
  },

  dp: {
    difficulty: 'Advanced',
    tagline: 'Break a problem into overlapping subproblems and never solve the same one twice.',
    whatIsIt:
      'Dynamic Programming solves problems by combining solutions to overlapping subproblems, caching each result (memoization) so it\'s computed once. Tabulation builds the same table bottom-up, iteratively.',
    whyNeeded:
      'Naive recursion on problems like Fibonacci or knapsack redoes the same subproblem exponentially many times. DP turns exponential blowup into polynomial time by trading memory for speed.',
    howItWorks: [
      'Identify the recursive relation: how does the answer for n depend on smaller subproblems?',
      'Memoization: recurse normally, but cache each subproblem\'s result the first time it\'s computed.',
      'Tabulation: fill a table bottom-up from the base cases, avoiding recursion entirely.',
      'Space optimization: if only the last few rows/values are needed, drop the rest.',
    ],
    viz: 'DP',
    pythonCode: `# Naive recursion: O(2^n) — recomputes the same values repeatedly
def fib_naive(n):
    if n <= 1: return n
    return fib_naive(n - 1) + fib_naive(n - 2)

# Memoization: O(n)
from functools import lru_cache
@lru_cache(maxsize=None)
def fib_memo(n):
    if n <= 1: return n
    return fib_memo(n - 1) + fib_memo(n - 2)

# Tabulation: O(n) time, O(1) space
def fib_tab(n):
    if n <= 1: return n
    prev2, prev1 = 0, 1
    for _ in range(2, n + 1):
        prev2, prev1 = prev1, prev1 + prev2
    return prev1`,
    complexity: { time: 'Usually O(states × transition)', space: 'O(states), often reducible' },
    whenToUse: [
      'The problem asks for a count, min/max, or yes/no over choices, and has overlapping subproblems (recursion re-visits the same inputs).',
      'Classic signals: "number of ways to...", "minimum cost to...", "longest .../shortest ...".',
      'Optimal substructure: the best solution is built from best solutions to subproblems.',
    ],
    interviewTips: [
      'Write the brute-force recursive solution first — DP is just that solution plus caching. Getting the recurrence right matters more than the optimization.',
      'State the dimensions of your DP table out loud: what does dp[i][j] mean? Get this exactly right before coding.',
    ],
    commonMistakes: [
      'Jumping straight to a DP table without first nailing the recurrence relation.',
      'Off-by-one errors in table indices, especially with 1-indexed vs 0-indexed subproblems.',
      'Forgetting base cases, which silently break the whole table.',
    ],
    related: ['recursion', 'greedy', 'graph-algorithms'],
  },
  'python-basics': {
    difficulty: 'Beginner',
    tagline: 'The Python you need before any of the rest of this roadmap makes sense.',
    whatIsIt:
      'The core building blocks of Python: variables, the built-in data types, conditionals, loops, functions, and the four container types (list, tuple, set, dict) that almost every data structure in this roadmap is built from.',
    whyNeeded:
      'Every visualization and code sample from here on assumes fluency with these basics. A shaky foundation here makes everything downstream harder than it needs to be.',
    howItWorks: [
      'Variables bind a name to a value; Python figures out the type for you.',
      'Lists are ordered and mutable; tuples are ordered and immutable; sets are unordered and unique; dicts map keys to values.',
      'Loops (`for`, `while`) repeat work; conditionals (`if`/`elif`/`else`) branch on a condition.',
      'Functions package logic behind a name so it can be reused and tested in isolation.',
      'Recursion (covered in depth later) is a function that calls itself with a smaller input.',
    ],
    pythonCode: `# Variables & types
name = "Ada"
age = 28
pi = 3.14
is_ready = True

# Containers
nums = [1, 2, 3]        # list — ordered, mutable
point = (4, 5)            # tuple — ordered, immutable
unique = {1, 2, 3}         # set — unordered, unique values
person = {"name": "Ada", "age": 28}  # dict — key -> value

# Conditions & loops
for n in nums:
    if n % 2 == 0:
        print(n, "is even")
    else:
        print(n, "is odd")

# Functions
def greet(name):
    return f"Hello, {name}!"

# Recursion — a function calling itself
def countdown(n):
    if n == 0:
        return
    print(n)
    countdown(n - 1)`,
    complexity: { time: 'n/a — this topic is language fundamentals', space: 'n/a', notes: 'Complexity analysis starts to matter from the next lesson onward.' },
    whenToUse: [
      'Before anything else on this roadmap — every later topic assumes this vocabulary.',
      'Lists for ordered, changeable data; tuples for fixed records; sets for uniqueness checks; dicts for lookups.',
    ],
    interviewTips: [
      'Know the mutability rules cold: lists/dicts/sets are mutable, tuples/strings are not — this trips people up in edge cases.',
      'Get comfortable with f-strings, list/dict comprehensions, and unpacking (`a, b = b, a`) — they come up constantly in clean interview code.',
    ],
    commonMistakes: [
      'Mutating a list while iterating over it with a `for` loop.',
      'Using a mutable default argument (`def f(x=[])`) — it persists across calls, a classic Python gotcha.',
      'Confusing `==` (value equality) with `is` (identity).',
    ],
    related: ['complexity', 'recursion'],
  },

  strings: {
    difficulty: 'Beginner',
    tagline: 'An array of characters — most array techniques apply directly.',
    whatIsIt:
      'A string is an ordered, immutable sequence of characters. Because it behaves like an array for reading purposes, techniques like two pointers and sliding window apply directly.',
    whyNeeded:
      'A huge share of interview problems are string problems — palindromes, anagrams, substring search — and they\'re almost always array patterns wearing a text costume.',
    howItWorks: [
      'Traversal: iterate character by character, or use slicing for substrings.',
      'Frequency counting: a dict or array of 26 counts tracks how often each character appears.',
      'Two pointers from both ends: check palindromes, reverse in place (on a mutable copy).',
      'Pattern matching (KMP, Rabin-Karp, Z-algorithm) speeds up substring search below the naive O(n·m).',
    ],
    viz: 'Strings',
    pythonCode: `s = "racecar"

# Palindrome check via two pointers
def is_palindrome(s):
    l, r = 0, len(s) - 1
    while l < r:
        if s[l] != s[r]:
            return False
        l += 1
        r -= 1
    return True

# Anagram check via frequency count
from collections import Counter
def is_anagram(a, b):
    return Counter(a) == Counter(b)`,
    complexity: { time: 'Traversal O(n) · Naive substring search O(n·m)', space: 'O(n) for a copy, O(1) for in-place checks' },
    whenToUse: [
      'Palindrome, anagram, or substring problems — reach for two pointers or sliding window first.',
      'Whenever you need character frequency, build a Counter/dict in one pass.',
    ],
    interviewTips: [
      'Strings are immutable in Python — repeated concatenation in a loop is O(n²); build a list and `"".join()` instead.',
      'Clarify case sensitivity and whitespace/punctuation handling before coding a palindrome/anagram check.',
    ],
    commonMistakes: [
      'Using `s += ch` inside a loop for large strings — quietly quadratic.',
      'Forgetting Unicode/case edge cases when comparing characters.',
    ],
    related: ['arrays', 'two-pointers', 'hashing'],
  },

  hashing: {
    difficulty: 'Beginner',
    tagline: 'Turn a key into an index so lookup, insert, and delete are all O(1) on average.',
    whatIsIt:
      'A hash table maps keys to values by running the key through a hash function to get a bucket index, then storing the value there. Python\'s `dict` and `set` are hash tables under the hood.',
    whyNeeded:
      'Any time a problem asks "have I seen this before?" or "how many times does X appear?", a hash table turns an O(n) or O(n²) scan into an O(1) average-case lookup.',
    howItWorks: [
      'The hash function converts a key into a number (a hash code).',
      'That number is reduced (mod table size) to a bucket index.',
      'The value is stored in that bucket — a list, in case multiple keys land on the same index (a collision).',
      'Lookup repeats the same hash + mod to jump straight to the right bucket.',
    ],
    viz: 'Hashing',
    pythonCode: `# Frequency map
from collections import Counter
counts = Counter("mississippi")   # {'i': 4, 's': 4, 'p': 2, 'm': 1}

# Two Sum using a hash map — O(n) instead of O(n^2)
def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        complement = target - n
        if complement in seen:
            return [seen[complement], i]
        seen[n] = i
    return None

# Set for O(1) membership checks
visited = set()
visited.add("A")
"A" in visited   # -> True, O(1) average`,
    complexity: { time: 'Insert/Search/Delete O(1) average, O(n) worst case', space: 'O(n)' },
    whenToUse: [
      '"Have I seen this value before?" / "how many times does X occur?" questions.',
      'Turning an O(n²) nested-loop pair check into a single O(n) pass.',
      'Grouping items by a computed key (e.g. grouping anagrams by their sorted letters).',
    ],
    interviewTips: [
      'If you catch yourself writing a nested loop to compare every pair, ask "can a hash map remember what I\'ve already seen?"',
      'Know that worst-case O(n) exists (all keys collide) — interviewers sometimes probe this.',
    ],
    commonMistakes: [
      'Using a list where a dict/set would make membership checks O(1) instead of O(n).',
      'Forgetting that dict keys must be hashable — lists can\'t be keys, tuples can.',
    ],
    related: ['arrays', 'sliding-window', 'strings'],
  },

  recursion: {
    difficulty: 'Beginner',
    tagline: 'A function that solves a problem by calling itself on a smaller version of it.',
    whatIsIt:
      'Recursion breaks a problem into a smaller instance of the same problem, plus a base case that stops the recursion. Each call is pushed onto the call stack until a base case returns, then the stack unwinds.',
    whyNeeded:
      'Trees, graphs, backtracking, and divide-and-conquer algorithms are all naturally recursive — trying to write them iteratively from scratch is usually harder than embracing the recursive structure.',
    howItWorks: [
      'Identify the base case — the smallest input the function can answer directly.',
      'Identify the recursive case — how to reduce the problem toward the base case.',
      'Each call is pushed onto the call stack with its own local variables.',
      'When a call hits its base case, it returns, and the stack unwinds, combining results on the way back up.',
    ],
    viz: 'Recursion',
    pythonCode: `def factorial(n):
    if n <= 1:            # base case
        return 1
    return n * factorial(n - 1)   # recursive case

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Python has a default recursion limit (usually 1000)
import sys
sys.getrecursionlimit()`,
    complexity: { time: 'Depends on the recursion tree — often O(2ⁿ) naively', space: 'O(depth) for the call stack' },
    whenToUse: [
      'The problem has a natural "smaller version of itself" structure — trees, divide-and-conquer, backtracking.',
      'The iterative version would need to manually manage a stack anyway — recursion does it for free via the call stack.',
    ],
    interviewTips: [
      'Always state the base case out loud first — interviewers want to see you\'re not going to recurse forever.',
      'Be ready to explain the recursion\'s time complexity via its recursion tree, not just guess.',
    ],
    commonMistakes: [
      'Missing or incorrect base case, causing infinite recursion and a stack overflow.',
      'Not reducing the problem on every recursive call (e.g. forgetting to decrement n).',
      'Redoing overlapping work — the segue into memoization and Dynamic Programming.',
    ],
    related: ['stack', 'backtracking', 'dp'],
  },

  backtracking: {
    difficulty: 'Intermediate',
    tagline: 'Try a choice, explore it fully, undo it, and try the next one.',
    whatIsIt:
      'Backtracking is DFS over a tree of decisions: make a choice, recurse into it, and if it doesn\'t lead anywhere valid, undo (backtrack) and try the next choice.',
    whyNeeded:
      'Any "generate all possible..." problem — subsets, permutations, valid boards — has a search space too large to enumerate by hand. Backtracking systematically explores it while pruning dead ends early.',
    howItWorks: [
      'Choose: pick one option from the remaining choices.',
      'Explore: recurse with that choice added to the current path.',
      'If the current path is invalid or complete, stop exploring this branch.',
      'Un-choose (backtrack): remove the choice, and try the next one at this level.',
    ],
    viz: 'Backtracking',
    pythonCode: `def subsets(nums):
    result = []
    path = []
    def backtrack(start):
        result.append(path[:])          # record current subset
        for i in range(start, len(nums)):
            path.append(nums[i])         # choose
            backtrack(i + 1)               # explore
            path.pop()                      # un-choose (backtrack)
    backtrack(0)
    return result

# subsets([1, 2]) -> [[], [1], [1, 2], [2]]`,
    complexity: { time: 'Often O(2ⁿ) or O(n!) depending on the search space', space: 'O(n) for the recursion depth / current path' },
    whenToUse: [
      '"Generate all subsets/permutations/combinations" problems.',
      'Constraint satisfaction: N-Queens, Sudoku, word search on a grid.',
      'Anywhere you need to explore a decision tree and undo bad choices.',
    ],
    interviewTips: [
      'Always add a pruning condition as early as possible — checking validity before recursing, not after, is what keeps backtracking fast.',
      'The "choose → explore → un-choose" three-step shape is nearly identical across all backtracking problems — memorize the template, not each problem.',
    ],
    commonMistakes: [
      'Forgetting to undo the choice (the `path.pop()` step), which corrupts every subsequent branch.',
      'Copying the path incorrectly (`path` instead of `path[:]`), storing a reference that later mutates.',
    ],
    related: ['recursion', 'dfs', 'dp'],
  },

  bst: {
    difficulty: 'Intermediate',
    tagline: 'A binary tree with an ordering rule: left is smaller, right is bigger.',
    whatIsIt:
      'A Binary Search Tree keeps every node\'s left subtree smaller and right subtree bigger than the node itself. That ordering rule is what makes search, insert, and delete all O(log n) on a balanced tree.',
    whyNeeded:
      'A BST gives you sorted-order traversal and fast search/insert/delete all in one structure — an array gives fast search but slow insert; a linked list gives fast insert but slow search.',
    howItWorks: [
      'Search: compare the target to the current node; go left if smaller, right if bigger, repeat.',
      'Insert: search for where the value should go, then attach a new node there.',
      'Delete: three cases — no children (just remove), one child (splice it in), two children (replace with the inorder successor).',
      'Inorder traversal of a BST always yields values in sorted order.',
    ],
    viz: 'BST',
    pythonCode: `class Node:
    def __init__(self, val):
        self.val = val
        self.left = self.right = None

def insert(root, val):
    if not root:
        return Node(val)
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    return root

def search(root, val):
    if not root or root.val == val:
        return root
    return search(root.left, val) if val < root.val else search(root.right, val)`,
    complexity: { time: 'O(log n) balanced · O(n) worst case (skewed tree)', space: 'O(n)' },
    whenToUse: [
      'You need both fast lookup and sorted-order traversal.',
      'Range queries, floor/ceiling, kth smallest/largest — all natural on a BST.',
    ],
    interviewTips: [
      'Know the worst case: an unbalanced BST (inserting sorted data) degrades to a linked list, O(n) — that\'s why self-balancing trees (AVL, Red-Black) exist.',
      '"Validate BST" is a classic — the trap is checking only immediate children instead of the full valid range for each node.',
    ],
    commonMistakes: [
      'Forgetting the two-children deletion case needs the inorder successor (or predecessor), not just any child.',
      'Validating a BST by only comparing a node to its direct children instead of tracking a valid (min, max) range.',
    ],
    related: ['trees', 'heap', 'searching'],
  },

  heap: {
    difficulty: 'Intermediate',
    tagline: 'A tree where every parent is smaller (min-heap) or bigger (max-heap) than its children.',
    whatIsIt:
      'A heap is a complete binary tree stored in an array, satisfying the heap property: in a min-heap, every parent is ≤ its children, so the smallest element is always at the root.',
    whyNeeded:
      'Whenever you repeatedly need "the smallest/largest remaining item" — priority queues, scheduling, top-K problems — a heap gives you that in O(log n) per operation instead of resorting every time.',
    howItWorks: [
      'Stored as an array: for index i, children are at 2i+1 and 2i+2, parent at (i-1)//2.',
      'Insert: add at the end, then "bubble up" — swap with the parent while smaller than it.',
      'Extract-min: swap the root with the last element, remove the last, then "sift down" — swap with the smaller child until the heap property holds.',
      'Heapify (build from an unsorted array): sift down from the last non-leaf node backward, O(n) total.',
    ],
    viz: 'Heap',
    pythonCode: `import heapq

heap = [5, 8, 6, 20, 10]
heapq.heapify(heap)          # O(n), rearranges in place — min-heap

heapq.heappush(heap, 2)       # O(log n)
smallest = heapq.heappop(heap) # O(log n) -> 2

# Max-heap trick: negate values
max_heap = []
for x in [5, 1, 8]:
    heapq.heappush(max_heap, -x)
largest = -heapq.heappop(max_heap)  # -> 8

# Kth largest via a size-k min-heap
def kth_largest(nums, k):
    heap = nums[:k]
    heapq.heapify(heap)
    for n in nums[k:]:
        if n > heap[0]:
            heapq.heapreplace(heap, n)
    return heap[0]`,
    complexity: { time: 'Insert/Extract O(log n) · Peek O(1) · Build O(n)', space: 'O(n)' },
    whenToUse: [
      'You repeatedly need the min or max of a changing set — priority queues, Dijkstra, task scheduling.',
      '"Top K" or "Kth largest/smallest" problems — a size-k heap beats sorting the whole input.',
      'Merging k sorted lists.',
    ],
    interviewTips: [
      'Python\'s `heapq` is a min-heap only — negate values for a max-heap, and remember to negate back.',
      'Recognize "Top K" and "Kth largest" as heap problems immediately — it\'s one of the most common interview signals.',
    ],
    commonMistakes: [
      'Forgetting `heapq` is min-heap-only and getting max-heap results backward.',
      'Rebuilding the heap from scratch every operation instead of using push/pop, losing the O(log n) benefit.',
    ],
    related: ['trees', 'sorting', 'graph-algorithms'],
  },

  trie: {
    difficulty: 'Advanced',
    tagline: 'A tree where each path from the root spells out a prefix.',
    whatIsIt:
      'A trie (prefix tree) stores strings character by character, where each node represents one character and paths from the root spell out prefixes shared by multiple words.',
    whyNeeded:
      'Autocomplete, spell-check, and prefix search need "does any word start with this prefix?" answered fast — a trie answers it in time proportional to the prefix length, not the number of words stored.',
    howItWorks: [
      'Insert: walk the word character by character, creating child nodes as needed, and mark the last node as "end of word".',
      'Search: walk the word character by character; if any character is missing, it\'s not in the trie.',
      'Prefix search: same walk, but you only need to reach the end of the prefix, not an "end of word" marker.',
      'Shared prefixes reuse the same nodes — that\'s where the space efficiency comes from.',
    ],
    viz: 'Trie',
    pythonCode: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            node = node.children.setdefault(ch, TrieNode())
        node.is_end = True

    def search(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return node.is_end

    def starts_with(self, prefix):
        node = self.root
        for ch in prefix:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return True`,
    complexity: { time: 'Insert/Search/Prefix search O(L), L = word length', space: 'O(total characters stored)' },
    whenToUse: [
      'Autocomplete, typeahead search, and prefix matching.',
      'Spell-checkers and dictionary lookups.',
      'Word search / boggle-style problems where you need to prune paths that can\'t possibly form a valid word.',
    ],
    interviewTips: [
      'The `is_end` flag is easy to forget — without it, you can\'t distinguish "CAR" being a full word versus just a prefix of "CART".',
      'Combine with backtracking for word-search-on-a-grid problems — the trie prunes invalid paths early.',
    ],
    commonMistakes: [
      'Forgetting to mark `is_end`, so search returns true for valid prefixes that were never inserted as full words.',
      'Using a fixed-size array of 26 children when a dict is simpler and handles arbitrary characters.',
    ],
    related: ['trees', 'strings', 'backtracking'],
  },

  'graph-algorithms': {
    difficulty: 'Advanced',
    tagline: 'Shortest paths, minimum spanning trees, and ordering — the classic graph toolbox.',
    whatIsIt:
      'A family of algorithms that answer specific structural questions about a graph: the cheapest path between nodes (Dijkstra, Bellman-Ford), the cheapest way to connect everything (Prim, Kruskal), or a valid ordering respecting dependencies (topological sort).',
    whyNeeded:
      'BFS and DFS only answer reachability and unweighted shortest path. Real-world graphs usually have weighted edges (cost, distance, time) or dependency constraints — these algorithms are what BFS/DFS generalize into.',
    howItWorks: [
      'Dijkstra: greedily visit the unvisited node with the smallest known distance, relax its edges, repeat — works for non-negative weights.',
      'Bellman-Ford: relax every edge V-1 times — slower than Dijkstra, but handles negative weights.',
      'Kruskal/Prim: build a Minimum Spanning Tree by greedily adding the cheapest edge that doesn\'t create a cycle (Kruskal) or growing outward from a start node (Prim).',
      'Topological sort: repeatedly remove nodes with no remaining incoming edges — only valid on a DAG (no cycles).',
    ],
    viz: 'GraphAlgorithms',
    pythonCode: `import heapq

def dijkstra(graph, start):
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    pq = [(0, start)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, weight in graph[u]:
            if d + weight < dist[v]:
                dist[v] = d + weight
                heapq.heappush(pq, (dist[v], v))
    return dist

# Topological sort via Kahn's algorithm (BFS on in-degree)
from collections import deque
def topo_sort(graph, in_degree):
    queue = deque([n for n in graph if in_degree[n] == 0])
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for nb in graph[node]:
            in_degree[nb] -= 1
            if in_degree[nb] == 0:
                queue.append(nb)
    return order`,
    complexity: { time: 'Dijkstra O((V+E) log V) · Kruskal O(E log E) · Topo sort O(V+E)', space: 'O(V + E)' },
    whenToUse: [
      'Weighted shortest path — Dijkstra (non-negative) or Bellman-Ford (negative weights allowed).',
      'Connecting all nodes cheaply — Prim or Kruskal for a Minimum Spanning Tree.',
      'Task scheduling with dependencies, build order, course prerequisites — topological sort.',
    ],
    interviewTips: [
      'State which algorithm applies and why based on the graph\'s properties (weighted? negative weights? need ordering vs shortest path?) before coding.',
      'Union-Find (Disjoint Set) is the standard companion structure for Kruskal and for "are these connected?" queries.',
    ],
    commonMistakes: [
      'Using Dijkstra on a graph with negative edge weights — it silently gives wrong answers; use Bellman-Ford instead.',
      'Attempting topological sort on a graph with a cycle — there is no valid ordering, and this should be detected, not ignored.',
    ],
    related: ['graphs', 'bfs', 'dfs', 'heap'],
  },

  greedy: {
    difficulty: 'Advanced',
    tagline: 'At each step, take the locally best option and never look back.',
    whatIsIt:
      'A greedy algorithm builds a solution by always making the choice that looks best right now, without reconsidering past choices. It works only when the problem has the "greedy choice property" — local optimum leads to global optimum.',
    whyNeeded:
      'When it applies, greedy is dramatically simpler and faster than DP — no table, no subproblems, just one pass making the obviously-best choice each time.',
    howItWorks: [
      'Sort or order the input by whatever criterion the greedy rule depends on.',
      'Walk through in that order, making the locally best choice at each step.',
      'Never revisit or undo a previous choice — that\'s the key difference from backtracking.',
      'Update state and continue.',
    ],
    viz: 'Greedy',
    pythonCode: `# Activity selection: max number of non-overlapping intervals
def activity_selection(activities):
    activities.sort(key=lambda a: a[1])   # sort by end time
    selected = []
    last_end = 0
    for start, end in activities:
        if start >= last_end:
            selected.append((start, end))
            last_end = end
    return selected

# Jump Game: can you reach the last index?
def can_jump(nums):
    furthest = 0
    for i, n in enumerate(nums):
        if i > furthest:
            return False
        furthest = max(furthest, i + n)
    return True`,
    complexity: { time: 'Usually O(n log n) (dominated by the sort)', space: 'O(1) to O(n) depending on the problem' },
    whenToUse: [
      'The problem has an obvious "always pick the best available option" rule that provably doesn\'t need reconsidering.',
      'Interval scheduling, fractional knapsack, Huffman coding — classic greedy-correct problems.',
      'When you\'re tempted to reach for DP but every subproblem\'s optimal choice never depends on future choices.',
    ],
    interviewTips: [
      'Greedy is a trap as often as it\'s a solution — always sanity-check with a counterexample before committing (0/1 Knapsack looks similar to Fractional Knapsack but greedy fails on it).',
      'If you can\'t argue why the greedy choice is always safe, it probably isn\'t — that\'s usually a DP problem in disguise.',
    ],
    commonMistakes: [
      'Applying a greedy strategy to a problem that actually needs DP (0/1 Knapsack is the textbook trap — Fractional Knapsack is greedy-safe, 0/1 is not).',
      'Sorting by the wrong criterion (e.g. by start time instead of end time for activity selection).',
    ],
    related: ['sorting', 'dp', 'graph-algorithms'],
  },

  'bit-manipulation': {
    difficulty: 'Advanced',
    tagline: 'Operate directly on the binary representation of numbers.',
    whatIsIt:
      'Bit manipulation uses bitwise operators (AND, OR, XOR, NOT, shifts) to work with the binary representation of integers directly — often for speed, memory efficiency, or elegant tricks that avoid extra data structures.',
    whyNeeded:
      'Some problems have surprisingly clean O(1)-per-operation solutions using bit tricks that would otherwise need a hash set or extra memory — and it\'s a common way interviewers test low-level thinking.',
    howItWorks: [
      'AND (&): 1 only if both bits are 1 — used for masking/checking specific bits.',
      'OR (|): 1 if either bit is 1 — used for setting bits.',
      'XOR (^): 1 if bits differ — used for toggling bits and the "find the unique element" trick (a number XORed with itself is 0).',
      'Left shift (<<) multiplies by 2 per shift; right shift (>>) divides by 2 per shift.',
    ],
    viz: 'BitManipulation',
    pythonCode: `a, b = 10, 6          # 1010, 0110
a & b   # 0010 = 2   AND
a | b   # 1110 = 14  OR
a ^ b   # 1100 = 12  XOR
~a       #    -11    NOT (two's complement)
a << 1  # 10100 = 20  left shift
a >> 1  #   0101 = 5   right shift

# Find the single number that doesn't repeat (all others appear twice)
def single_number(nums):
    result = 0
    for n in nums:
        result ^= n         # pairs cancel out to 0
    return result

# Check if n is a power of two
def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0`,
    complexity: { time: 'O(1) per operation, O(log n) for full-number operations', space: 'O(1)' },
    whenToUse: [
      '"Find the unique/missing/duplicate number" problems where XOR avoids extra space.',
      'Subset/state enumeration using a bitmask (each bit represents "included" or "not included").',
      'Checking power-of-two, counting set bits, or toggling flags compactly.',
    ],
    interviewTips: [
      'The XOR self-cancellation trick (`x ^ x == 0`, `x ^ 0 == x`) solves a surprising number of "find the odd one out" problems in O(1) space.',
      '`n & (n-1)` clears the lowest set bit — a building block for several bit-counting tricks.',
    ],
    commonMistakes: [
      'Forgetting that Python integers are arbitrary precision, so bit tricks that assume a fixed width (like 32-bit overflow) need extra handling.',
      'Confusing `&` (bitwise AND) with `and` (logical AND) — a common typo with very different behavior.',
    ],
    related: ['complexity', 'arrays'],
  },

  'advanced-ds': {
    difficulty: 'Advanced',
    tagline: 'Specialized structures for problems the basics can\'t handle efficiently.',
    whatIsIt:
      'A collection of structures built for specific efficiency needs beyond the fundamentals: Union-Find for fast connectivity queries, Segment/Fenwick trees for fast range queries, and self-balancing trees (AVL, Red-Black, B-Trees) that guarantee O(log n) even in the worst case.',
    whyNeeded:
      'A plain BST can degrade to O(n) on sorted input; a plain array needs O(n) to answer "what\'s the sum of this range?" repeatedly. These structures exist to remove exactly those worst cases.',
    howItWorks: [
      'Union-Find: tracks disjoint sets with near-O(1) "are these connected?" and "merge these two groups" operations, using path compression and union by rank.',
      'Segment Tree / Fenwick Tree: precompute range aggregates (sum, min, max) in a tree/array structure so both range queries and point updates are O(log n).',
      'AVL / Red-Black Trees: self-balancing BSTs that rotate nodes on insert/delete to guarantee O(log n) height no matter the insertion order.',
      'B-Trees / B+ Trees: generalize BSTs to many children per node — the structure behind most database indexes and filesystems.',
    ],
    pythonCode: `# Union-Find (Disjoint Set) with path compression
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # path compression
        return self.parent[x]

    def union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        if ra != rb:
            self.parent[ra] = rb

uf = UnionFind(5)
uf.union(0, 1)
uf.find(0) == uf.find(1)   # -> True, same component`,
    complexity: { time: 'Union-Find ~O(α(n)) (near-constant) · Segment/Fenwick Tree O(log n) per query/update', space: 'O(n)' },
    whenToUse: [
      'Repeated "are these two things connected?" queries as edges are added — Union-Find.',
      'Repeated range-sum/min/max queries on data that also gets updated — Segment or Fenwick Tree.',
      'Anywhere a plain BST\'s worst case (sorted input degrading to a list) is unacceptable — self-balancing trees.',
    ],
    interviewTips: [
      'Union-Find is one of the highest-leverage structures to have ready — it turns "detect a cycle while building a graph" or "count connected components" into a few lines.',
      'You\'re rarely asked to implement a full Segment Tree from scratch in an interview, but recognizing when one applies is a strong signal.',
    ],
    commonMistakes: [
      'Implementing Union-Find without path compression or union by rank, losing the near-constant time guarantee.',
      'Reaching for a full self-balancing tree implementation when a simpler structure (sorted list, heap) already solves the problem.',
    ],
    related: ['bst', 'graph-algorithms', 'heap'],
  },

  'doubly-linked-list': {
    difficulty: 'Beginner',
    tagline: 'Every node holds two pointers — traverse in both directions.',
    whatIsIt:
      'A doubly linked list extends the singly linked list by adding a prev pointer to each node, allowing traversal in both directions. Each node knows its predecessor and successor.',
    whyNeeded:
      'The extra prev pointer enables O(1) deletion when you have a reference to the node (no need to find the predecessor), and is the foundation for data structures like the browser history stack and LRU cache.',
    howItWorks: [
      'Each node stores: value, next (points forward), prev (points backward).',
      'The head node has prev = None; the tail node has next = None.',
      'Insertion in the middle: update 4 pointers — 2 on the new node and 2 on the neighbors.',
      'Deletion: relink prev and next of the surrounding nodes — no traversal needed if you have the node reference.',
    ],
    viz: 'DoublyLinkedList',
    pythonCode: `class Node:
    def __init__(self, val):
        self.val = val
        self.next = None
        self.prev = None

class DoublyLinkedList:
    def __init__(self):
        # Dummy sentinels — no edge-case handling for head/tail
        self.head = Node(0)
        self.tail = Node(0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def insert_before(self, node, val):
        """Insert new node just before 'node' — O(1)"""
        new = Node(val)
        prev = node.prev
        prev.next = new
        new.prev = prev
        new.next = node
        node.prev = new

    def delete(self, node):
        """Remove 'node' from the list — O(1)"""
        node.prev.next = node.next
        node.next.prev = node.prev`,
    complexity: { time: 'Access O(n) · Insert/Delete at known node O(1)', space: 'O(n)' },
    whenToUse: [
      'LRU Cache — you need O(1) move-to-front and O(1) eviction.',
      'Text editors / browser history — forward and backward navigation.',
      'Any deque-like structure that needs O(1) push/pop at both ends.',
    ],
    interviewTips: [
      'Use dummy head and tail sentinel nodes — they eliminate all null-pointer edge cases for insertion and deletion.',
      'Draw out the 4-pointer re-link on a whiteboard before coding any insert/delete.',
    ],
    commonMistakes: [
      'Updating only 3 of the 4 required pointers in an insert, leaving the list corrupted.',
      'Forgetting to update both next and prev when deleting a node.',
    ],
    related: ['linked-lists', 'circular-linked-list', 'fast-and-slow'],
  },

  'circular-linked-list': {
    difficulty: 'Beginner',
    tagline: 'The tail points back to the head — there is no NULL terminator.',
    whatIsIt:
      'A circular linked list is a linked list where the last node\'s next pointer points back to the first node (head) instead of None. The list forms a continuous loop.',
    whyNeeded:
      'Circular lists are ideal for round-robin scheduling, circular buffers, and any problem that needs wraparound behavior. They also naturally model cyclic structures like game turns.',
    howItWorks: [
      'Traverse starting from any node: stop when you return to the starting node.',
      'There is no NULL — detecting end-of-list requires checking if next === head.',
      'Insertion: same as singly linked, but ensure the tail\'s next always points to head.',
      'Cycle detection: Fast & Slow pointer approach works here too (next topic!).',
    ],
    viz: 'CircularLinkedList',
    pythonCode: `class Node:
    def __init__(self, val, nxt=None):
        self.val = val
        self.next = nxt

def build_circular(values):
    if not values:
        return None
    head = Node(values[0])
    curr = head
    for v in values[1:]:
        curr.next = Node(v)
        curr = curr.next
    curr.next = head   # tail → head (closes the circle)
    return head

def traverse(head):
    if not head:
        return []
    result = []
    curr = head
    while True:
        result.append(curr.val)
        curr = curr.next
        if curr is head:   # back at start
            break
    return result`,
    complexity: { time: 'Traversal O(n) · Insert O(1) at known position', space: 'O(n)' },
    whenToUse: [
      'Round-robin schedulers — CPU time slicing cycles continuously through processes.',
      'Circular buffers / ring buffers for data streams.',
      'Multiplayer game turns — after the last player it wraps back to the first.',
    ],
    interviewTips: [
      'The termination condition in a loop is `curr.next === head`, NOT `curr.next === None` — this is the most common bug.',
      'Cicular lists are the input structure in many "detect a cycle" problems — know Floyd\'s algorithm (fast & slow).',
    ],
    commonMistakes: [
      'Using None as the stop condition, causing an infinite loop.',
      'Forgetting to re-link the tail → head pointer after every insertion or deletion.',
    ],
    related: ['linked-lists', 'doubly-linked-list', 'fast-and-slow'],
  },

  'fast-and-slow': {
    difficulty: 'Beginner',
    tagline: "Floyd's tortoise and hare — two pointers at different speeds detect cycles in O(1) space.",
    whatIsIt:
      'The fast & slow pointer technique uses two pointers that advance at different speeds (slow moves 1 step, fast moves 2). If a cycle exists, fast will eventually lap slow and they meet inside the cycle. If there\'s no cycle, fast reaches the end.',
    whyNeeded:
      'This technique detects cycles, finds list midpoints, and locates the k-th node from the end — all in O(n) time and O(1) extra space, no hash set required.',
    howItWorks: [
      'Start both slow and fast at head.',
      'Each step: slow = slow.next, fast = fast.next.next.',
      'If fast or fast.next is None — no cycle, fast reached the tail.',
      'If slow === fast — they\'ve met inside the cycle. Cycle exists.',
      'To find cycle entry: reset one pointer to head, advance both one step at a time — they meet at the entry node.',
    ],
    viz: 'FastAndSlow',
    pythonCode: `def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True    # cycle detected
    return False

def cycle_entry(head):
    """Find the node where the cycle begins — O(n), O(1) space."""
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            break
    else:
        return None   # no cycle
    slow = head
    while slow is not fast:
        slow = slow.next
        fast = fast.next
    return slow  # cycle entry node

def find_middle(head):
    """Returns the middle node — fast & slow without cycle check."""
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow`,
    complexity: { time: 'O(n)', space: 'O(1)' },
    whenToUse: [
      'Detect if a linked list has a cycle.',
      'Find the middle node of a linked list in one pass.',
      'Find the kth node from the end (use two pointers k apart).',
      'Detect duplicate numbers in an array treated as a linked list (Leetcode 287).',
    ],
    interviewTips: [
      'Whenever a linked list problem says O(1) space and O(n) time, think fast & slow.',
      '"Find the middle" is a two-line change on the cycle detection template — know both patterns from one algorithm.',
    ],
    commonMistakes: [
      'Checking fast === null without also checking fast.next — fast.next.next causes a null pointer exception.',
      'Moving both pointers by 1 (slow) and 1 (fast) instead of 1 and 2.',
    ],
    related: ['linked-lists', 'circular-linked-list', 'two-pointers'],
  },

  'insertion-sort': {
    difficulty: 'Beginner',
    tagline: 'Build the sorted section one element at a time — like sorting a hand of cards.',
    whatIsIt:
      'Insertion sort maintains a sorted prefix. For each new element (the "key"), it shifts all larger sorted elements one position right, then places the key in its correct spot.',
    whyNeeded:
      'Insertion sort is adaptive — it runs in O(n) on nearly-sorted data, making it the default choice for small arrays and the finishing step in Timsort (Python\'s built-in sort).',
    howItWorks: [
      'Outer loop: i from 1 to n-1. Element at i is the current "key".',
      'Inner loop: j from i-1 down to 0, while arr[j] > key.',
      'Shift arr[j] right to arr[j+1] in each inner step.',
      'Place the key at arr[j+1] when the inner loop ends.',
    ],
    viz: 'InsertionSort',
    pythonCode: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        # Shift elements greater than key one position right
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key   # place key in its correct position
    return arr

# For nearly-sorted data:
# arr = [1, 2, 4, 3, 5]  →  only 1 shift needed — effectively O(n)`,
    complexity: { time: 'O(n²) worst · O(n) best (sorted input)', space: 'O(1) in-place' },
    whenToUse: [
      'Small arrays (n < 20) — the constant factor beats merge/quick sort.',
      'Input is nearly sorted — insertion sort\'s O(n) best case shines here.',
      'Online sorting — you can insert elements as they arrive, one at a time.',
    ],
    interviewTips: [
      'Can you spot when a problem gives you a sorted (or nearly-sorted) input? That\'s an insertion sort hint.',
      'Insertion sort is stable — equal elements keep their original order, useful for multi-key sorting.',
    ],
    commonMistakes: [
      'Doing a swap instead of a shift — swaps need 3 operations per step; a shift is 1.',
      'Forgetting that the inner loop condition must check j >= 0 to avoid out-of-bounds.',
    ],
    related: ['sorting', 'merge-sort', 'heap-sort'],
  },

  'merge-sort': {
    difficulty: 'Intermediate',
    tagline: 'Divide and conquer — split in half, sort each half, merge them back.',
    whatIsIt:
      'Merge sort is a stable, divide-and-conquer sorting algorithm. It splits the array into halves recursively until each sub-array has 1 element (trivially sorted), then repeatedly merges adjacent sorted halves.',
    whyNeeded:
      'Merge sort guarantees O(n log n) in all cases — no bad inputs like quicksort has. It\'s the sorting engine behind Python\'s Timsort and is the go-to when stability and worst-case guarantees matter.',
    howItWorks: [
      'Base case: array of size ≤ 1 is already sorted.',
      'Divide: split at mid = n/2 into left and right halves.',
      'Conquer: recursively merge-sort each half.',
      'Merge: use two pointers (l, r) on sorted halves, always picking the smaller front element into the result.',
    ],
    viz: 'MergeSort',
    pythonCode: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    l, r = 0, 0
    while l < len(left) and r < len(right):
        if left[l] <= right[r]:      # stable: equal prefers left
            result.append(left[l]); l += 1
        else:
            result.append(right[r]); r += 1
    result.extend(left[l:])
    result.extend(right[r:])
    return result

# Count inversions: count each time right[r] is preferred — O(n log n)`,
    complexity: { time: 'O(n log n) — always', space: 'O(n) auxiliary (merge buffer)' },
    whenToUse: [
      'Stability is required (equal elements must preserve original order).',
      'Worst-case O(n log n) is mandatory — can\'t risk quicksort\'s O(n²).',
      'Sorting linked lists — merge sort is O(1) extra space on linked lists.',
    ],
    interviewTips: [
      '"Count inversions in an array" is a classic interview problem — it\'s solved by augmenting the merge step.',
      'External sort (data too large for RAM) always uses merge sort because disk reads suit sequential access.',
    ],
    commonMistakes: [
      'Using `<=` in the merge step is important for stability — if you use `<`, equal elements swap order.',
      'Allocating a new array in each merge call — use an index-based in-place merge to reduce allocations.',
    ],
    related: ['sorting', 'insertion-sort', 'heap-sort', 'recursion'],
  },

  'heap-sort': {
    difficulty: 'Intermediate',
    tagline: 'Build a max-heap, then repeatedly extract the max to sort in place.',
    whatIsIt:
      'Heap sort uses the heap data structure to sort. Phase 1: build a max-heap from the array (all parent ≥ children). Phase 2: repeatedly swap the root (max) with the last element and heapify to restore the property.',
    whyNeeded:
      'Heap sort achieves O(n log n) in all cases with O(1) extra space — no recursion stack, no auxiliary array. It\'s the only comparison sort with both guarantees simultaneously.',
    howItWorks: [
      'Build max-heap: call heapify on all non-leaf nodes from bottom-up — O(n) total.',
      'The root arr[0] is now the maximum.',
      'Swap arr[0] with arr[n-1]. Reduce heap size by 1. Heapify the root.',
      'Repeat until heap size is 1 — the array is sorted in ascending order.',
    ],
    viz: 'HeapSort',
    pythonCode: `def heapify(arr, n, i):
    largest = i
    l, r = 2 * i + 1, 2 * i + 2
    if l < n and arr[l] > arr[largest]:
        largest = l
    if r < n and arr[r] > arr[largest]:
        largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    # Phase 1: build max-heap O(n)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    # Phase 2: extract max one by one O(n log n)
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]   # move max to end
        heapify(arr, i, 0)                  # restore heap on smaller range
    return arr`,
    complexity: { time: 'O(n log n) — always', space: 'O(1) in-place (O(log n) for recursion)' },
    whenToUse: [
      'You need in-place O(n log n) sorting with no extra memory.',
      'Embedded systems or memory-constrained environments.',
      'Building a priority queue from scratch — Phase 1 (build-heap) is O(n).',
    ],
    interviewTips: [
      'Heap sort is rarely asked to implement fully — but "build a heap in O(n)" and "k largest elements" using a heap appear constantly.',
      'Python\'s `heapq` is a min-heap. Use negative values or a custom comparator to get max-heap behavior.',
    ],
    commonMistakes: [
      'Starting heapify from the wrong index — start from n//2 - 1 (last non-leaf), not n-1.',
      'Forgetting to reduce the heap size n in Phase 2 — heapifying the sorted tail corrupts the result.',
    ],
    related: ['sorting', 'insertion-sort', 'merge-sort', 'heap'],
  },

  kadane: {
    difficulty: 'Intermediate',
    tagline: 'Maximum subarray sum in O(n) — extend or restart the current window.',
    whatIsIt:
      'Kadane\'s algorithm finds the contiguous subarray with the largest sum in O(n) time. At each index it makes a greedy choice: extend the current subarray or start fresh from this element.',
    whyNeeded:
      'The brute-force O(n²) approach checks every subarray. Kadane\'s insight — "if the running sum becomes negative, discard it and start over" — collapses it to one pass, making it one of the most elegant O(n) algorithms in CS.',
    howItWorks: [
      'Initialize curSum = arr[0], maxSum = arr[0].',
      'For each element from index 1 onward: curSum = max(arr[i], curSum + arr[i]).',
      'If curSum + arr[i] < arr[i], starting fresh is better — reset curStart.',
      'Update maxSum = max(maxSum, curSum) after each step.',
      'Return maxSum (and optionally the window indices bestStart..bestEnd).',
    ],
    viz: 'Kadane',
    pythonCode: `def kadane(arr):
    """Returns (max_sum, start, end) indexes of the best subarray."""
    max_sum = cur_sum = arr[0]
    best_start = best_end = cur_start = 0

    for i in range(1, len(arr)):
        if arr[i] > cur_sum + arr[i]:   # start fresh
            cur_sum = arr[i]
            cur_start = i
        else:                             # extend window
            cur_sum += arr[i]

        if cur_sum > max_sum:
            max_sum = cur_sum
            best_start, best_end = cur_start, i

    return max_sum, best_start, best_end

# Example: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
# → maxSum = 6, subarray = [4, -1, 2, 1] (indices 3..6)`,
    complexity: { time: 'O(n)', space: 'O(1)' },
    whenToUse: [
      '"Maximum subarray sum" or "largest contiguous sum" — textbook Kadane\'s.',
      'Can extend to 2D ("maximum subarray in a matrix") by fixing column bounds and applying Kadane row-wise.',
      '"Maximum circular subarray sum" — run Kadane on the normal array AND on its negated version, take the max.',
    ],
    interviewTips: [
      'Always track curStart and bestStart/bestEnd so you can report the actual subarray, not just the sum.',
      'If all elements are negative, Kadane returns the least-negative element — confirm this edge case with the interviewer.',
    ],
    commonMistakes: [
      'Initializing curSum and maxSum to 0 instead of arr[0] — breaks when all elements are negative.',
      'Confusing "maximum subarray sum" (Kadane\'s) with "maximum subarray product" (different recurrence).',
    ],
    related: ['arrays', 'dp', 'sliding-window'],
  },

};

export default topics;
