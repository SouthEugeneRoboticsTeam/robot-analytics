import { Metrics } from '@robot-analytics/data/metric';

export interface Scouts {
    [name: string]: Scout
}

export interface Scout {
    metrics: Metrics
}
