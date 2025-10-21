import { Store } from '../src/state/store';
import { Track } from '../src/timeline/Track';
import { Clip } from '../src/timeline/Clip';

describe('Store and reducer', () => {
  it('supports add track and undo/redo', () => {
    const store = new Store({ id: 't', fps: 30, duration: 0, tracks: [] });
    const track: Track = { id: 'v1', type: 'video', clips: [] };

    store.dispatch({ type: 'ADD_TRACK', payload: track });
    expect(store.getState().engine.getTimeline().tracks.length).toBe(1);

    store.dispatch({ type: 'UNDO' });
    expect(store.getState().engine.getTimeline().tracks.length).toBe(0);

    store.dispatch({ type: 'REDO' });
    expect(store.getState().engine.getTimeline().tracks.length).toBe(1);
  });

  it('places clip and updates duration', () => {
    const store = new Store({ id: 't', fps: 30, duration: 0, tracks: [{ id: 'a1', type: 'audio', clips: [] }] });
    const clip: Clip = { id: 'c1', type: 'audio', start: 2, duration: 1, params: [] };

    store.dispatch({ type: 'PLACE_CLIP', payload: { trackId: 'a1', clip } });
    expect(store.getState().engine.getTimeline().duration).toBe(3);
  });
});
