import { Metrics } from '@robot-analytics/data/metric';

export interface Games {
    [name: string]: Game
}

export interface Game {
    metrics: Metrics
}