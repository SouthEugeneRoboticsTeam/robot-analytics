import { Team } from './team'

export interface Scout {
    name: string,
    team: Team,
    templateName: string
    sections: Array<ScoutSection>
}

export interface ScoutSection {
    name: string,
    metrics: Array<ScoutMetric<any>>
}

export interface ScoutMetric<T> {
    type: ScoutMetricType,
    name: string,
    value: T
}

export enum ScoutMetricType {
    TEXT = "text",
    NUMBER = "number",
    NUMBER_ARRAY = "numberArray",
    BOOLEAN = "boolean",
    ENUM = "enum",
}
