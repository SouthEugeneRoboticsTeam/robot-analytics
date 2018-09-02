import { DeepReadonly } from 'utility-types';
import { Team } from '../files/team';
import { Scout } from '../files/scout';

export type AppState = DeepReadonly<{
    teams: Array<Team>
    scouts: Array<Scout>
}>
