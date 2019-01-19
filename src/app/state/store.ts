import { createStore } from 'redux';
import { reducer } from '@robot-analytics/state/reducer';

export const store = createStore(reducer);
