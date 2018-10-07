import { DeepReadonly } from 'utility-types';
import { Teams } from '../data/team';
import { Games } from '../data/game';

export type AppState = DeepReadonly<{
    teams: Teams
    games: Games
}>
