import { Action } from '@ngrx/store';

export interface AppState {
  counter: number;
}

export const initialState: AppState = {
  counter: 0,
};

export function counterReducer(state = initialState, action: Action): AppState {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
}
