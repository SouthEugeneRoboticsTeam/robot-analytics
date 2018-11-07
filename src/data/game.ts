import { Metrics } from './metric';

export interface Games {
    [name: string]: Game
}

export interface Game {
    metrics: Metrics
}