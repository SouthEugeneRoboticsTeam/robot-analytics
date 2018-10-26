import { action } from 'typesafe-actions';
import { Scout, Scouts } from '../data/scout';
import { Metrics } from '../data/metric';

export const enum ActionTypes {
    ADD_TEAM = 'ADD_TEAM',
    ADD_SCOUT = 'ADD_SCOUT',
    ADD_GAME = 'ADD_GAME'
}

export const addTeam = (name: string, teamNumber: number, scouts: Scouts = {}) => action(ActionTypes.ADD_TEAM, { name, teamNumber, scouts });
export const addScout = (teamNumber: number, scoutName: string, scout: Scout) => action(ActionTypes.ADD_SCOUT, { teamNumber, scoutName, scout });
export const addGame = (name: string, metrics: Metrics) => action(ActionTypes.ADD_GAME, { name, metrics });