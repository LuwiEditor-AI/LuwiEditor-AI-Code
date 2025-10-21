import { Clip } from './Clip';

export type TrackType = 'video' | 'audio' | 'subtitle';

export interface Track {
  id: string;
  type: TrackType;
  name?: string;
  clips: Clip[];
  muted?: boolean;
  locked?: boolean;
}

export function insertClip(track: Track, clip: Clip): Track {
  if (track.locked) throw new Error('Track is locked');
  return { ...track, clips: [...track.clips, clip].sort((a, b) => a.start - b.start) };
}

export function removeClip(track: Track, clipId: string): Track {
  if (track.locked) throw new Error('Track is locked');
  return { ...track, clips: track.clips.filter(c => c.id !== clipId) };
}

export function moveClip(track: Track, clipId: string, newStart: number): Track {
  if (track.locked) throw new Error('Track is locked');
  return {
    ...track,
    clips: track.clips.map(c => (c.id === clipId ? { ...c, start: newStart } : c)).sort((a, b) => a.start - b.start),
  };
}
