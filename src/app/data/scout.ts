import { Metrics } from '@robot-analytics/data/metric';

export interface Scouts {
    [name: string]: Scout
}

export interface Scout {
    gameName: string
    sections: ScoutSections
}

export interface ScoutSections {
    [name: string]: ScoutSection
}

export interface ScoutSection {
    metrics: Metrics
}