import { Keyframe, interpolate } from './Keyframe';

export type ClipType = 'video' | 'audio' | 'subtitle' | 'generated';

export interface ClipParam {
  name: string; // e.g., "opacity", "volume", "position.x"
  keyframes: Keyframe[];
  defaultValue?: number;
}

export interface Clip {
  id: string;
  type: ClipType;
  assetId?: string; // undefined for generated clips
  start: number; // timeline start in seconds
  duration: number; // seconds
  params: ClipParam[];
  muted?: boolean;
  locked?: boolean;
  tags?: string[];
}

export function getParamValueAt(clip: Clip, paramName: string, time: number): number | undefined {
  const param = clip.params.find(p => p.name === paramName);
  if (!param) return undefined;
  const { keyframes, defaultValue = 0 } = param;
  if (!keyframes.length) return defaultValue;

  // find surrounding keyframes
  const before = [...keyframes].filter(k => k.time <= time).sort((a, b) => b.time - a.time)[0];
  const after = [...keyframes].filter(k => k.time >= time).sort((a, b) => a.time - b.time)[0];

  if (!before && !after) return defaultValue;
  if (!before) return after.value;
  if (!after) return before.value;

  if (before.id === after.id) return before.value;
  return interpolate(before, after, time);
}

export function clipEnd(clip: Clip): number {
  return clip.start + clip.duration;
}

export function overlaps(a: Clip, b: Clip): boolean {
  return !(clipEnd(a) <= b.start || clipEnd(b) <= a.start);
}
