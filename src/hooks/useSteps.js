import { useState, useRef, useEffect, useCallback } from 'react';

// Drives play/pause/step/reset over a precomputed array of "frames".
// Each frame is any shape you want (state snapshot) — the visualization
// just renders `steps[index]`.
export default function useSteps(steps, { speed = 700 } = {}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef(null);

  const clampedIndex = Math.min(index, Math.max(steps.length - 1, 0));

  useEffect(() => {
    if (!playing) return undefined;
    if (clampedIndex >= steps.length - 1) {
      setPlaying(false);
      return undefined;
    }
    timer.current = setTimeout(() => setIndex((i) => i + 1), speed);
    return () => clearTimeout(timer.current);
  }, [playing, clampedIndex, steps.length, speed]);

  const play = useCallback(() => {
    if (clampedIndex >= steps.length - 1) setIndex(0);
    setPlaying(true);
  }, [clampedIndex, steps.length]);

  const pause = useCallback(() => setPlaying(false), []);

  const stepForward = useCallback(() => {
    setPlaying(false);
    setIndex((i) => Math.min(i + 1, steps.length - 1));
  }, [steps.length]);

  const stepBack = useCallback(() => {
    setPlaying(false);
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setPlaying(false);
    setIndex(0);
  }, []);

  return {
    frame: steps[clampedIndex],
    index: clampedIndex,
    total: steps.length,
    playing,
    play,
    pause,
    stepForward,
    stepBack,
    reset,
    isEnd: clampedIndex >= steps.length - 1,
  };
}
