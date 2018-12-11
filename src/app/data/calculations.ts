import { Metric, ScoutMetricType } from '@robot-analytics/data/metric';
import { reduce, map } from 'lodash';

export type Calculations = {
    [name: string]: Calculation
}

export interface Calculation<T = any> {
    types: Array<ScoutMetricType>,
    invoke: (...metrics: Array<Metric<T>>) => Metric
}

export const calculations: Calculations = {
    'Maximum': {
        types: [ScoutMetricType.NUMBER],
        invoke: (...metrics: Array<Metric>) => metrics[0]
    },
    'Minimum': {
        types: [ScoutMetricType.NUMBER],
        invoke: (...metrics: Array<Metric>) => metrics[0]
    },
    'Average': {
        types: [ScoutMetricType.NUMBER],
        invoke: (...metrics: Array<Metric>) => metrics[0]
    },
    'Standard Deviation': {
        types: [ScoutMetricType.NUMBER],
        invoke: (...metrics: Array<Metric>) => metrics[0]
    }
};
