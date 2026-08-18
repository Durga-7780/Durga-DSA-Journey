export const GRAPH_NODES = {
  A: { x: 60, y: 100 }, B: { x: 160, y: 40 }, C: { x: 160, y: 160 },
  D: { x: 270, y: 40 }, E: { x: 270, y: 160 }, F: { x: 370, y: 100 },
};

export const GRAPH_EDGES = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'E'], ['D', 'F'], ['E', 'F'], ['B', 'C']];

export const ADJ = (() => {
  const adj = Object.fromEntries(Object.keys(GRAPH_NODES).map((k) => [k, []]));
  GRAPH_EDGES.forEach(([a, b]) => { adj[a].push(b); adj[b].push(a); });
  return adj;
})();
