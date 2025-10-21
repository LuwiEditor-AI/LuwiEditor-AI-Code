import { Timeline, TimelineEngine } from '../timeline/TimelineEngine';
import { reducer, State, Action } from './actions';

export class Store {
  private state: State;
  private listeners: Array<(s: State) => void> = [];

  constructor(initialTimeline?: Timeline) {
    const engine = new TimelineEngine(
      initialTimeline ?? { id: 'default', fps: 30, duration: 0, tracks: [] }
    );
    this.state = { engine, history: [], future: [] };
  }

  getState(): State {
    return this.state;
  }

  dispatch(action: Action): void {
    this.state = reducer(this.state, action);
    this.listeners.forEach(l => l(this.state));
  }

  subscribe(listener: (s: State) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}
