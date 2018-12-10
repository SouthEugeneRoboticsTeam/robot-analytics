import { action } from 'typesafe-actions';
import { Scout, Scouts } from '@robot-analytics/data/scout';
import { Metric, Metrics } from '@robot-analytics/data/metric';
import { Teams } from '@robot-analytics/datateam';

export const enum ActionTypes {
    ADD_TEAM = 'ADD_TEAM',
    ADD_SCOUT = 'ADD_SCOUT',
    ADD_GAME = 'ADD_GAME',
    ADD_DATA = 'ADD_DATA',
    ADD_METRIC = 'ADD_METRIC'
}

export const addTeam = (name: string, number: number, scouts: Scouts = {}) => action(ActionTypes.ADD_TEAM, { name, number, scouts });
export const addScout = (teamNumber: number, scoutName: string, scout: Scout) => action(ActionTypes.ADD_SCOUT, { teamNumber, scoutName, scout });
export const addGame = (name: string, metrics: Metrics) => action(ActionTypes.ADD_GAME, { name, metrics });
export const addData = (data: { teams: Teams, metrics: Metrics }) => action(ActionTypes.ADD_DATA, data);
export const addMetric = (name: string, metric: Metric) => action(ActionTypes.ADD_METRIC, { metricName: name, metric});
