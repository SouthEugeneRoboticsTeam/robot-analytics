import { Metric, ScoutMetricType } from '@robot-analytics/data/metric';
import { reduce } from 'lodash';
import { std, round, median, mode, max, min } from 'mathjs';

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
            value: max(metrics.map((metric) => metric.value})),
            category: metrics[0].category,
        })
    },
    'Minimum': {
        type: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => reduce(metrics, (acc: Metric, metric) => {
            if (metric.value > -1 && acc.value == -1) acc.value = metric.value
            else if (metric.value < acc.value) acc.value = metric.value
            return acc
          }, {type: ScoutMetricType.NUMBER, value: -1, category: metrics[0].category})
    },
    'Average': {
        type: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => ({type:ScoutMetricType.NUMBER, value: round(reduce(metrics, (acc, metric) => { 
            return acc + metric.value}, 0) / metrics.length, 2), category: metrics[0].category
        })
    },
    'Standard Deviation': {
        type: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => ({type: ScoutMetricType.NUMBER, value: round(std(reduce(metrics, (acc, metric) => { 
            acc.push(metric.value)
            return acc
            }, [])), 2), category: metrics[0].category})
    },
    'Median': {
        type: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => ({type: ScoutMetricType.NUMBER, value: median(reduce(metrics, (acc, metric) => {
            acc.push(metric.value)
            return acc
        }, [])), category: metrics[0].category})
    },
    'Mode': {
        type: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => ({type: ScoutMetricType.NUMBER, value: mode(reduce(metrics, (acc, metric) => {
            acc.push(metric.value)
            return acc
        }, [])), category: metrics[0].category})
    }
};
