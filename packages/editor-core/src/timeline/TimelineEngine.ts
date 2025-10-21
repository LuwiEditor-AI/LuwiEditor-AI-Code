import { Track } from './Track';
import { Clip, overlaps } from './Clip';

export interface Timeline {
  id: string;
  fps: number;
  duration: number; // seconds
  tracks: Track[];
  metadata?: Record<string, unknown>;
}

export class TimelineEngine {
  private timeline: Timeline;

  constructor(timeline: Timeline) {
    this.timeline = { ...timeline };
  }

  getTimeline(): Timeline {
    return this.timeline;
  }

  addTrack(track: Track): void {
    this.timeline.tracks = [...this.timeline.tracks, track];
  }

  removeTrack(trackId: string): void {
    this.timeline.tracks = this.timeline.tracks.filter(t => t.id !== trackId);
  }

  getTrack(trackId: string): Track | undefined {
    return this.timeline.tracks.find(t => t.id === trackId);
  }

  placeClip(trackId: string, clip: Clip): void {
    const track = this.getTrack(trackId);
    if (!track) throw new Error(`Track ${trackId} not found`);
    if (track.locked) throw new Error('Track is locked');

    // prevent overlaps for same type on the same track
    const conflict = track.clips.some(c => overlaps(c, clip));
    if (conflict) throw new Error('Clip overlap detected');

    const updated = { ...track, clips: [...track.clips, clip].sort((a, b) => a.start - b.start) };
    this.timeline.tracks = this.timeline.tracks.map(t => (t.id === trackId ? updated : t));
    this.timeline.duration = Math.max(this.timeline.duration, clip.start + clip.duration);
  }

  removeClip(trackId: string, clipId: string): void {
    const track = this.getTrack(trackId);
    if (!track) throw new Error(`Track ${trackId} not found`);
    if (track.locked) throw new Error('Track is locked');

    const updated = { ...track, clips: track.clips.filter(c => c.id !== clipId) };
    this.timeline.tracks = this.timeline.tracks.map(t => (t.id === trackId ? updated : t));
    this.recalculateDuration();
  }

  moveClip(trackId: string, clipId: string, newStart: number): void {
    const track = this.getTrack(trackId);
    if (!track) throw new Error(`Track ${trackId} not found`);
    if (track.locked) throw new Error('Track is locked');

    const clip = track.clips.find(c => c.id === clipId);
    if (!clip) throw new Error(`Clip ${clipId} not found`);

    const moved: Clip = { ...clip, start: newStart };
    const conflict = track.clips.filter(c => c.id !== clipId).some(c => overlaps(c, moved));
    if (conflict) throw new Error('Clip overlap detected');

    const updated = {
      ...track,
      clips: track.clips.map(c => (c.id === clipId ? moved : c)).sort((a, b) => a.start - b.start),
    };
    this.timeline.tracks = this.timeline.tracks.map(t => (t.id === trackId ? updated : t));
    this.timeline.duration = Math.max(this.timeline.duration, moved.start + moved.duration);
  }

  private recalculateDuration(): void {
    const end = Math.max(
      0,
      ...this.timeline.tracks.flatMap(t => t.clips.map(c => c.start + c.duration))
    );
    this.timeline.duration = end;
  }
}
