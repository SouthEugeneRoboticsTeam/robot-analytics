import { Metrics } from './metric';

export interface Scouts {
    [name: string]: Scout
}

export interface Scout {
    name: string,
    templateName: string
    sections: ScoutSections
}

export interface ScoutSections {
    [name: string]: ScoutSection
}

export interface ScoutSection {
    metrics: Metrics
}