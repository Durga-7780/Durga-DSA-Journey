import { useState, useCallback, useEffect } from 'react';

const KEY = 'dsa-lab-progress';

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export default function useProgress() {
  const [done, setDone] = useState(load);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(done)); } catch { /* storage unavailable */ }
  }, [done]);

  const toggle = useCallback((id) => {
    setDone((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const isDone = useCallback((id) => !!done[id], [done]);
  const count = Object.values(done).filter(Boolean).length;

  return { done, toggle, isDone, count };
}
