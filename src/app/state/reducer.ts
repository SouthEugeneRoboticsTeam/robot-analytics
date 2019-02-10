import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import { Teams } from '../data/team';
import * as actions from './actions';
import { ActionTypes } from './actions';
import { Metrics } from '@robot-analytics/data/metric';
import { TeamTableState } from '@robot-analytics/state/state';
import { ColumnData, RowData } from '@robot-analytics/routes/TableView/data';
import { calculations } from '@robot-analytics/data/calculations';
import { forEach, keys, map, reduce } from 'lodash';

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

const teamTableInitialState: TeamTableState = {
    columns: [
        { name: 'Team Number', noFilter: true },
        { name: 'Scout Count', noFilter: true }
    ],
    rows: [],
    filterOut: []
};

const teamTable = (
    state: TeamTableState = teamTableInitialState,
    action: ActionType<typeof actions>
): TeamTableState => {
    switch (action.type) {
        case ActionTypes.ADD_DATA: {
            return {
                ...state,
                columns: [
                    { name: 'Team Number', noFilter: true },
                    { name: 'Scout Count', noFilter: true },
                    ...reduce(action.payload.metrics, (acc: Array<ColumnData>, metric, metricName) => {
                        forEach(calculations, (calculation, calculationName) => {
                            if (calculation.inputTypes.indexOf(metric.type) !== -1) {
                                acc.push({ name: `[${metric.category}] ${metricName} (${calculationName})` })
                            }
                        });
                        return acc;
                    }, [])
                ],
                rows: map(action.payload.teams, (team, teamNumber) => ({
                    'Team Number': parseInt(teamNumber),
                    'Scout Count': keys(team.scouts).length,
                    ...reduce(action.payload.metrics, (row: RowData, metric, metricName) => {
                        forEach(calculations, (calculation, calculationName) => {
                            if (calculation.inputTypes.indexOf(metric.type) !== -1) {
                                row[`[${metric.category}] ${metricName} (${calculationName})`] = calculation.invoke(
                                    ...map(team.scouts, scout => (
                                        scout.metrics[metricName]
                                    ))
                                ).value
                            }
                        });
                        return row;
                    }, {})
                }))
            }
        }
        case ActionTypes.SET_TEAM_TABLE_FILTER_OUT: {
            return {
                ...state,
                filterOut: action.payload
            };
        }
        default: return state
    }
};

export const reducer = combineReducers({ teams, metrics, teamTable });
