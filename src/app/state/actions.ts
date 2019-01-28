import { action } from 'typesafe-actions';
import { Scout, Scouts } from '@robot-analytics/data/scout';
import { Metric, Metrics } from '@robot-analytics/data/metric';
import { Teams } from '@robot-analytics/data/team';
import { ColumnData } from '@robot-analytics/routes/TableView/data';

export const enum ActionTypes {
    ADD_TEAM = 'ADD_TEAM',
    ADD_SCOUT = 'ADD_SCOUT',
    ADD_GAME = 'ADD_GAME',
    ADD_DATA = 'ADD_DATA',
    ADD_METRIC = 'ADD_METRIC',
    SET_TEAM_TABLE_FILTER_OUT = 'SET_TEAM_TABLE_FILTER_OUT'
}

export const addTeam = (name: string, number: number, scouts: Scouts = {}) => action(ActionTypes.ADD_TEAM, { name, number, scouts });
export const addScout = (teamNumber: number, scoutName: string, scout: Scout) => action(ActionTypes.ADD_SCOUT, { teamNumber, scoutName, scout });
export const addGame = (name: string, metrics: Metrics) => action(ActionTypes.ADD_GAME, { name, metrics });
export const addData = (data: { teams: Teams, metrics: Metrics }) => action(ActionTypes.ADD_DATA, data);
export const addMetric = (name: string, metric: Metric) => action(ActionTypes.ADD_METRIC, { metricName: name, metric});
export const setTeamTableFilterOut = (filterRequest: Array<ColumnData>) => action(ActionTypes.SET_TEAM_TABLE_FILTER_OUT, filterRequest);
