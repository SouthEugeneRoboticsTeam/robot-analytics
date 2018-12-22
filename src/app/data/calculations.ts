import { Metric, ScoutMetricType } from '@robot-analytics/data/metric';
import { std, median, mean, mode, max, min, round } from 'mathjs';

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
            value: round(max(metrics.filter((metric) => !!metric).map((metric) => metric.value)), 2),
            category: metrics[0].category,
        })
    },
    'Minimum': {
        inputTypes: [ScoutMetricType.NUMBER],
        outputType: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => ({
            type: ScoutMetricType.NUMBER,
            value: round(min(metrics.filter((metric) => !!metric).map((metric) => metric.value)), 2),
            category: metrics[0].category,
        }),
    },
    'Average': {
        inputTypes: [ScoutMetricType.NUMBER],
        outputType: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => ({
            type: ScoutMetricType.NUMBER,
            value: round(mean(metrics.filter((metric) => !!metric).map((metric) => metric.value)), 2),
            category: metrics[0].category,
        }),
    },
    'Median': {
        inputTypes: [ScoutMetricType.NUMBER],
        outputType: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => ({
            type: ScoutMetricType.NUMBER,
            value: round(median(metrics.filter((metric) => !!metric).map((metric) => metric.value)), 2),
            category: metrics[0].category,
        }),
    },
    'Mode': {
        inputTypes: [ScoutMetricType.NUMBER],
        outputType: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => ({
            type: ScoutMetricType.NUMBER,
            value: round(parseFloat(mode(metrics.filter((metric) => !!metric).map((metric) => metric.value))), 2),
            category: metrics[0].category,
        }),
    },
    'Standard Deviation': {
        inputTypes: [ScoutMetricType.NUMBER],
        outputType: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => ({
            type: ScoutMetricType.NUMBER,
            value: round(std(metrics.filter((metric) => !!metric).map((metric) => metric.value)), 2),
            category: metrics[0].category,
        }),
    },
};
