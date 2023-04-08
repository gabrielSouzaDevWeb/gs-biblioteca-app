import { ActionReducerMap } from '@ngrx/store';
import * as CounterActions from './actions';
import * as fromCounter from './aluno.state';
import { counterReducer } from './aluno.state';

export interface AppState {
  counter: fromCounter.AppState;
}

export const reducers: ActionReducerMap<AppState> = {
  counter: counterReducer,
};

export { CounterActions };
