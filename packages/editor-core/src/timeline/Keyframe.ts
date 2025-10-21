export type Easing =
  | 'linear'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut';

export interface Keyframe {
  id: string;
  time: number; // seconds
  value: number;
  easing?: Easing;
}

export function interpolate(
  kfA: Keyframe,
  kfB: Keyframe,
  t: number
): number {
  const span = kfB.time - kfA.time;
  if (span <= 0) return kfB.value;
  const u = Math.min(Math.max((t - kfA.time) / span, 0), 1);
  const e = kfB.easing ?? 'linear';

  const ease = (x: number): number => {
    switch (e) {
      case 'easeIn': return x * x;
      case 'easeOut': return 1 - (1 - x) * (1 - x);
      case 'easeInOut': return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
      default: return x;
    }
  };

  const w = ease(u);
  return kfA.value * (1 - w) + kfB.value * w;
}
