import { Metric, ScoutMetricType } from '@robot-analytics/data/metric';
import { reduce } from 'lodash';
import { std, round, median, mean, mode, max, min } from 'mathjs';

export type Calculations = {
    [name: string]: Calculation
}

export interface Calculation<T = any> {
    type: ScoutMetricType,
    invoke: (...metrics: Array<Metric<T>>) => Metric
}

export const calculations: Calculations = {
    'Maximum': {
        type: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => ({
            type: ScoutMetricType.NUMBER,
            value: max(metrics.filter((metric) => !!metric).map((metric) => metric.value)),
            category: metrics[0].category,
        }),
    },
    'Minimum': {
        type: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => ({
            type: ScoutMetricType.NUMBER,
            value: min(metrics.filter((metric) => !!metric).map((metric) => metric.value)),
            category: metrics[0].category,
        }),
    },
    'Average': {
        type: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => ({
            type: ScoutMetricType.NUMBER,
            value: mean(metrics.filter((metric) => !!metric).map((metric) => metric.value)),
            category: metrics[0].category,
        }),
    },
    'Median': {
        type: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => ({
            type: ScoutMetricType.NUMBER,
            value: median(metrics.filter((metric) => !!metric).map((metric) => metric.value)),
            category: metrics[0].category,
        }),
    },
    'Mode': {
        type: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => ({
            type: ScoutMetricType.NUMBER,
            value: mode(metrics.filter((metric) => !!metric).map((metric) => metric.value)),
            category: metrics[0].category,
        }),
    },
    'Standard Deviation': {
        type: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => ({
            type: ScoutMetricType.NUMBER,
            value: std(metrics.filter((metric) => !!metric).map((metric) => metric.value)),
            category: metrics[0].category,
        }),
    },
};
