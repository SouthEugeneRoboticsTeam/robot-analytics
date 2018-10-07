import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import { Team } from '../files/team';
import { ActionTypes } from './actions';
import * as actions from './actions';
import { Scout } from '../files/scout';

const teams = (state: Array<Team> = [], action: ActionType<typeof actions>) => {
    switch (action.type) {
        case ActionTypes.ADD_TEAM: {
            return [...state, action.payload]
        }
        default: return state;
    }
};

const scouts = (state: Array<Scout> = [], action: ActionType<typeof actions>) => {
    switch (action.type) {
        case ActionTypes.ADD_SCOUT: {
            return [...state, action.payload]
        }
        default: return state
    }
};

const scoutTemplate = (state: Array<Scout> = [], action: ActionType<typeof actions>) => {
    switch (action.type) {
        case ActionTypes.ADD_SCOUT_TEMPLATE: {
            return [...state, action.payload]
        }
        default: return state
    }
};

export const reducer = combineReducers({ teams, scouts, scoutTemplate });
