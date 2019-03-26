import { Metric, ScoutMetricType } from '@robot-analytics/data/metric';
import { max, mean, median, min, mode, round, std } from 'mathjs';
import { forEach } from 'lodash';

export type Calculations = {
    [name: string]: Calculation
}

export type TypeMapping = [ScoutMetricType, ScoutMetricType]

export const hasInput = (mappings: Array<TypeMapping>, input: ScoutMetricType): boolean => {
    let result = false;
    forEach(mappings, mapping => {
        if (mapping[0] === input) result = true
    });
    return result;
};

export interface Calculation<T = any> {
    typeMappings: Array<TypeMapping>
    invoke: (...metrics: Array<Metric<T>>)  => Metric
}

export const calculations: Calculations = {
    'Maximum': {
        typeMappings: [[ScoutMetricType.NUMBER, ScoutMetricType.NUMBER]],
        invoke: (...metrics: Array<Metric<number>>) => ({
            type: ScoutMetricType.NUMBER,
            value: round(max(metrics.filter((metric) => !!metric).map((metric) => metric.value)), 2),
            category: metrics[0].category,
        })
    },
    'Minimum': {
        typeMappings: [[ScoutMetricType.NUMBER, ScoutMetricType.NUMBER]],
        invoke: (...metrics: Array<Metric<number>>) => ({
            type: ScoutMetricType.NUMBER,
            value: round(min(metrics.filter((metric) => !!metric).map((metric) => metric.value)), 2),
            category: metrics[0].category,
        }),
    },
    'Average': {
        typeMappings: [[ScoutMetricType.NUMBER, ScoutMetricType.NUMBER], [ScoutMetricType.BOOLEAN, ScoutMetricType.NUMBER]],
        invoke: (...metrics: Array<Metric<number>>) => ({
            type: ScoutMetricType.NUMBER,
            value: round(mean(metrics.filter((metric) => !!metric).map((metric) => metric.value)), 2),
            category: metrics[0].category,
        }),
    },
    'Median': {
        typeMappings: [[ScoutMetricType.NUMBER, ScoutMetricType.NUMBER]],
        invoke: (...metrics: Array<Metric>) => ({
            type: ScoutMetricType.NUMBER,
            value: round(median(metrics.filter((metric) => !!metric).map((metric) => metric.value)), 2),
            category: metrics[0].category,
        }),
    },
    'Mode': {
        typeMappings: [
            [ScoutMetricType.NUMBER, ScoutMetricType.NUMBER],
            [ScoutMetricType.TEXT, ScoutMetricType.TEXT],
            [ScoutMetricType.BOOLEAN, ScoutMetricType.ENUM]
        ],
        invoke: (...metrics: (Array<Metric>)) => ({
                type: metrics[0].type === ScoutMetricType.NUMBER ? ScoutMetricType.NUMBER : ScoutMetricType.TEXT,
                value: mode(
                    metrics.filter((metric: Metric) => !!metric).map((metric: Metric) => metric.value)
                ).map((value) => value.toString().trim()).join(", "),
                category: metrics[0].category
        }),
    },
    'Standard Deviation': {
        typeMappings: [[ScoutMetricType.NUMBER, ScoutMetricType.NUMBER]],
        invoke: (...metrics: Array<Metric>) => ({
            type: ScoutMetricType.NUMBER,
            value: round(std(metrics.filter((metric) => !!metric).map((metric) => metric.value)), 2),
            category: metrics[0].category,
        }),
    },
};
