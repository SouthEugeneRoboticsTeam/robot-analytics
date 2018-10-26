import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import { Teams } from '../data/team';
import { Games } from '../data/game';
import { ActionTypes } from './actions';
import * as actions from './actions';

const teams = (state: Teams = {}, action: ActionType<typeof actions>) => {
    switch (action.type) {
        case ActionTypes.ADD_TEAM: {
            return { ...state, [action.payload.teamNumber]: { name: action.payload.name, scouts: action.payload.scouts }}
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