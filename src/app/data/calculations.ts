import { Metric, ScoutMetricType } from '@robot-analytics/data/metric';
import { reduce } from 'lodash';
import { max, mean, median, min, mode, std } from 'mathjs';

export type Calculations = {
    [name: string]: Calculation
}

export interface Calculation<T = any> {
    inputTypes: Array<ScoutMetricType>,
    outputType: ScoutMetricType,
    invoke: (...metrics: Array<Metric<T>>) => Metric
}

export const calculations: Calculations = {
    'Maximum': {
        inputTypes: [ScoutMetricType.NUMBER],
        outputType: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => ({
            type: ScoutMetricType.NUMBER,
            value: max(metrics.filter((metric) => !!metric).map((metric) => metric.value)),
            category: metrics[0].category,
        })
    },
    'Minimum': {
        inputTypes: [ScoutMetricType.NUMBER],
        outputType: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => ({
            type: ScoutMetricType.NUMBER,
            value: min(metrics.filter((metric) => !!metric).map((metric) => metric.value)),
            category: metrics[0].category,
        }),
    },
    'Average': {
        inputTypes: [ScoutMetricType.NUMBER],
        outputType: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => ({
            type: ScoutMetricType.NUMBER,
            value: mean(metrics.filter((metric) => !!metric).map((metric) => metric.value)),
            category: metrics[0].category,
        }),
    },
    'Median': {
        inputTypes: [ScoutMetricType.NUMBER],
        outputType: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => ({
            type: ScoutMetricType.NUMBER,
            value: median(metrics.filter((metric) => !!metric).map((metric) => metric.value)),
            category: metrics[0].category,
        }),
    },
    'Mode': {
        inputTypes: [ScoutMetricType.NUMBER],
        outputType: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => ({
            type: ScoutMetricType.NUMBER,
            value: parseFloat(mode(metrics.filter((metric) => !!metric).map((metric) => metric.value))),
            category: metrics[0].category,
        }),
    },
    'Standard Deviation': {
        inputTypes: [ScoutMetricType.NUMBER],
        outputType: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => ({
            type: ScoutMetricType.NUMBER,
            value: std(metrics.filter((metric) => !!metric).map((metric) => metric.value)),
            category: metrics[0].category,
        }),
    },
};
