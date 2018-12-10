import { DeepReadonly } from 'utility-types';
import { Teams } from '../data/team';
import { Metrics } from '@robot-analytics/datametric';

export type AppState = DeepReadonly<{
    teams: Teams,
    metrics: Metrics
}>;
