import { action } from 'typesafe-actions';
import { Scout, Scouts } from '@robot-analytics/data/scout';
import { Metrics } from '@robot-analytics/data/metric';
import { RsData } from '@robot-analytics/datarsData';

export const enum ActionTypes {
    ADD_TEAM = 'ADD_TEAM',
    ADD_SCOUT = 'ADD_SCOUT',
    ADD_GAME = 'ADD_GAME',
    IMPORT_RS_DATA = 'IMPORT_RS_DATA'
}

export const addTeam = (name: string, number: number, scouts: Scouts = {}) => action(ActionTypes.ADD_TEAM, { name, number, scouts });
export const addScout = (teamNumber: number, scoutName: string, scout: Scout) => action(ActionTypes.ADD_SCOUT, { teamNumber, scoutName, scout });
export const addGame = (name: string, metrics: Metrics) => action(ActionTypes.ADD_GAME, { name, metrics });
export const importRsData = (rsData: RsData) => action(ActionTypes.IMPORT_RS_DATA, rsData);
