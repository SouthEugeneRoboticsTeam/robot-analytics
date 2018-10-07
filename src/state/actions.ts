import { action } from 'typesafe-actions';
import { Scout } from '../files/scout';

export const enum ActionTypes {
    ADD_TEAM = 'ADD_TEAM',
    ADD_SCOUT = 'ADD_SCOUT',
    ADD_SCOUT_TEMPLATE = 'ADD_SCOUT_TEMPLATE'
}

export const addTeam = (name: String, number: Number) => action(ActionTypes.ADD_TEAM, { name, number });
export const addScout = (scout: Scout) => action(ActionTypes.ADD_SCOUT, scout);
export const addScoutTemplate = (template: Scout) => action(ActionTypes.ADD_SCOUT_TEMPLATE, template);
