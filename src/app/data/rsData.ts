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

export interface RsMetric {
    type: string
    name: string
    value: any
    category: string
}

export const toScoutMetricType = (rsType: string) => (
    rsType === 'text' ? ScoutMetricType.TEXT :
    rsType === 'number' ? ScoutMetricType.NUMBER :
    rsType === 'stopwatch' ? ScoutMetricType.NUMBER_ARRAY :
    rsType === 'boolean' ? ScoutMetricType.BOOLEAN :
    rsType === 'list' ? ScoutMetricType.ENUM :
    null
);
