
import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, combineReducers } from 'redux';
import { tasksReduser } from './tasks/reduser';
import { taskReduser } from './task/reduser';
import { statsReduser } from './stats/reduser';

const rootReducer = combineReducers({
  tasks: tasksReduser,
  task: taskReduser,
  stats: statsReduser,
});

export const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state) nextState.count = state.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

export type RootState = ReturnType<typeof rootReducer>;
