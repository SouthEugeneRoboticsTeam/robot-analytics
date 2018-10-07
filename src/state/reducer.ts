import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import { Teams } from '../data/team';
import { Games } from '../data/game';
import { ActionTypes } from './actions';
import * as actions from './actions';

const teams = (state: Teams = {}, action: ActionType<typeof actions>) => {
    switch (action.type) {
        case ActionTypes.ADD_TEAM: {
            return { ...state, [action.payload.name]: { number: action.payload.number, scouts: action.payload.scouts }}
        }
        case ActionTypes.ADD_SCOUT: {
            return {
                ...state,
                [action.payload.teamName]: {
                    ...state[action.payload.teamName],
                    scouts: {
                        ...state[action.payload.teamName].scouts,
                        [action.payload.scoutName]: action.payload.scout
                    }
                }
            }
        }
        default: return state;
    }
};

const games = (state: Games = {}, action: ActionType<typeof actions>) => {
    switch (action.type) {
        case ActionTypes.ADD_GAME: {
            return { ...state, [action.payload.name]: { metrics: action.payload.metrics } }
        }
        default: return state
    }
};

export const reducer = combineReducers({ teams, games });
