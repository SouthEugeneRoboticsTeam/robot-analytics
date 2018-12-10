import { Metric, ScoutMetricType } from '@robot-analytics/data/metric';
import { reduce } from 'lodash';
import { std, round } from 'mathjs'

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
        invoke: (...metrics: Array<Metric>) => reduce(metrics, function (acc: Metric, metric) {
            if (metric.value > acc.value) acc.value = metric.value
            return acc
        }, { type: ScoutMetricType.NUMBER, value: 0, category: metrics[0].category})
    },
    'Minimum': {
        type: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => reduce(metrics, function(acc: Metric, metric) {
            if (metric.value > -1 && acc.value == -1) acc.value = metric.value
            else if (metric.value < acc.value) acc.value = metric.value
            return acc
          }, {type: ScoutMetricType.NUMBER, value: -1, category: metrics[0].category})
    },
    'Average': {
        type: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => ({type:ScoutMetricType.NUMBER, value: round(reduce(metrics, function (acc, metric){ 
            return acc + metric.value}, 0) / metrics.length, 2), category: metrics[0].category
        })
    },
    'Standard Deviation': {
        type: ScoutMetricType.NUMBER,
        invoke: (...metrics: Array<Metric>) => ({type: ScoutMetricType.NUMBER, value: round(std(reduce(metrics, function(acc, metric) { 
            acc.push(metric.value)
            return acc
            }, [])), 2), category: metrics[0].category})
    }
};
