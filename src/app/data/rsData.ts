import { ScoutMetricType } from '@robot-analytics/data/metric';

export interface RsData {
    teams: RsTeams
}

export type RsTeams = {
    [number: string]: Array<RsScout>
}

export interface RsScout {
    name: string,
    metrics: RsMetrics
}

export type RsMetrics = {
    [key: string]: RsMetric
}

export type RsType = 'text' | 'number' | 'stopwatch' | 'boolean' | 'list';

export interface RsMetric {
    type: RsType
    name: string
    value: any
    category: string
}

export const toScoutMetricType = (rsType: RsType): ScoutMetricType => {
    switch (rsType) {
        case 'text': return ScoutMetricType.TEXT;
        case 'number': return ScoutMetricType.NUMBER;
        case 'boolean': return ScoutMetricType.BOOLEAN;
        case 'list': return ScoutMetricType.ENUM;
        case 'stopwatch': return ScoutMetricType.NUMBER_ARRAY
    }
};
