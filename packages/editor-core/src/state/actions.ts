import { Timeline, TimelineEngine } from '../timeline/TimelineEngine';
import { Track } from '../timeline/Track';
import { Clip } from '../timeline/Clip';

export type Action =
  | { type: 'INIT_TIMELINE'; payload: Timeline }
  | { type: 'ADD_TRACK'; payload: Track }
  | { type: 'REMOVE_TRACK'; payload: { trackId: string } }
  | { type: 'PLACE_CLIP'; payload: { trackId: string; clip: Clip } }
  | { type: 'REMOVE_CLIP'; payload: { trackId: string; clipId: string } }
  | { type: 'MOVE_CLIP'; payload: { trackId: string; clipId: string; start: number } }
  | { type: 'UNDO' }
  | { type: 'REDO' };

export interface State {
  engine: TimelineEngine;
  history: Timeline[];
  future: Timeline[];
}

export function reducer(state: State, action: Action): State {
  const snapshot = (): Timeline => JSON.parse(JSON.stringify(state.engine.getTimeline()));

  switch (action.type) {
    case 'INIT_TIMELINE': {
      return {
        engine: new TimelineEngine(action.payload),
        history: [],
        future: [],
      };
    }
    case 'ADD_TRACK': {
      const before = snapshot();
      state.engine.addTrack(action.payload);
      return { engine: state.engine, history: [...state.history, before], future: [] };
    }
    case 'REMOVE_TRACK': {
      const before = snapshot();
      state.engine.removeTrack(action.payload.trackId);
      return { engine: state.engine, history: [...state.history, before], future: [] };
    }
    case 'PLACE_CLIP': {
      const before = snapshot();
      state.engine.placeClip(action.payload.trackId, action.payload.clip);
      return { engine: state.engine, history: [...state.history, before], future: [] };
    }
    case 'REMOVE_CLIP': {
      const before = snapshot();
      state.engine.removeClip(action.payload.trackId, action.payload.clipId);
      return { engine: state.engine, history: [...state.history, before], future: [] };
    }
    case 'MOVE_CLIP': {
      const before = snapshot();
      state.engine.moveClip(action.payload.trackId, action.payload.clipId, action.payload.start);
      return { engine: state.engine, history: [...state.history, before], future: [] };
    }
    case 'UNDO': {
      const prev = state.history[state.history.length - 1];
      if (!prev) return state;
      const remaining = state.history.slice(0, -1);
      return {
        engine: new TimelineEngine(prev),
        history: remaining,
        future: [state.engine.getTimeline(), ...state.future],
      };
    }
    case 'REDO': {
      const next = state.future[0];
      if (!next) return state;
      const remaining = state.future.slice(1);
      return {
        engine: new TimelineEngine(next),
        history: [...state.history, state.engine.getTimeline()],
        future: remaining,
      };
    }
    default:
      return state;
  }
}
