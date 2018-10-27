import { Metric, ScoutMetricType } from './metric';

export type Calculations = {
    [P in ScoutMetricType]: {
        [name: string]: (...metrics: Array<Metric>) => Metric
    }
}

export const calculations: Calculations = {
    'text': {},
    'number': {
        'Maximum': (...metrics: Array<Metric<number>>) => metrics[0],
        'Minimum': (...metrics: Array<Metric<number>>) => metrics[0],
        'Average': (...metrics: Array<Metric<number>>) => metrics[0],
        'Standard Deviation': (...metrics: Array<Metric<number>>) => metrics[0],
    },
    'numberArray': {},
    'boolean': {},
    'enum': {}
};
