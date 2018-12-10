import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import { Teams } from '../data/team';
import { ActionTypes } from './actions';
import * as actions from './actions';
import { map, reduce } from 'lodash';
import { Metrics } from '@robot-analytics/datametric';

const teams = (state: Teams = {}, action: ActionType<typeof actions>) => {
    switch (action.type) {
        case ActionTypes.ADD_TEAM: {
            return { ...state, [action.payload.number]: { name: action.payload.name, scouts: action.payload.scouts }}
        }
        case ActionTypes.ADD_SCOUT: {
            return {
                ...state,
                [action.payload.teamNumber]: {
                    ...state[action.payload.teamNumber],
                    scouts: {
                        ...state[action.payload.teamNumber].scouts,
                        [action.payload.scoutName]: action.payload.scout
                    }
                }
            }
        }
        case ActionTypes.ADD_DATA: {
            return {
                ...state,
                ...action.payload.teams
            }
        }
        default: return state;
    }
};

const metrics = (state: Metrics = {}, action: ActionType<typeof actions>) => {
    switch (action.type) {
        case ActionTypes.ADD_DATA: {
            return {
                ...state,
                ...action.payload.metrics
            }
        }
        default: return state
    }
};

export const reducer = combineReducers({ teams, metrics });
