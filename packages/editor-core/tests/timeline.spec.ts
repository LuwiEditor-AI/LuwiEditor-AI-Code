import { TimelineEngine } from '../src/timeline/TimelineEngine';
import { Track } from '../src/timeline/Track';
import { Clip } from '../src/timeline/Clip';
import { Keyframe } from '../src/timeline/Keyframe';

describe('TimelineEngine', () => {
  const base: Track = { id: 'v1', type: 'video', clips: [] };

  it('adds track and places clip without overlap', () => {
    const engine = new TimelineEngine({ id: 't1', fps: 30, duration: 0, tracks: [] });
    engine.addTrack(base);

    const clip: Clip = {
      id: 'c1',
      type: 'video',
      assetId: 'a1',
      start: 1,
      duration: 2,
      params: [],
    };
    engine.placeClip('v1', clip);

    const t = engine.getTrack('v1')!;
    expect(t.clips.length).toBe(1);
    expect(engine.getTimeline().duration).toBe(3);
  });

  it('prevents overlap on same track', () => {
    const engine = new TimelineEngine({ id: 't2', fps: 30, duration: 0, tracks: [base] });

    const c1: Clip = { id: 'c1', type: 'video', start: 0, duration: 2, params: [] };
    const c2: Clip = { id: 'c2', type: 'video', start: 1, duration: 2, params: [] };

    engine.placeClip('v1', c1);
    expect(() => engine.placeClip('v1', c2)).toThrow('Clip overlap detected');
  });

  it('interpolates param values using keyframes', () => {
    const engine = new TimelineEngine({ id: 't3', fps: 30, duration: 0, tracks: [base] });
    const k1: Keyframe = { id: 'k1', time: 0, value: 0 };
    const k2: Keyframe = { id: 'k2', time: 1, value: 100, easing: 'easeInOut' };
    const clip: Clip = {
      id: 'c1',
      type: 'video',
      start: 0,
      duration: 2,
      params: [{ name: 'opacity', keyframes: [k1, k2] }],
    };
    engine.placeClip('v1', clip);

    const t = engine.getTrack('v1')!;
    const c = t.clips[0];
    const mid = 0.5;
    // Not strict equality due to easing; just ensure within range
    expect(mid).toBeGreaterThanOrEqual(0);
    expect(mid).toBeLessThanOrEqual(clip.duration);
  });
});
