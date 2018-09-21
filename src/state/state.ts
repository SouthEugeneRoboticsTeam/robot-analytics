import { DeepReadonly } from 'utility-types';
import { Team } from '../files/team';
import { Scout } from '../files/scout';

export type AppState = DeepReadonly<{
    teams: Array<Team>
    scouts: Array<Scout>
    scoutTemplates: Array<Scout>
    home: HomeState
}>

export type HomeState = DeepReadonly<{
    drawerOpened: Boolean
}>

export const defaultHomeState: HomeState = {
    drawerOpened: false
};
