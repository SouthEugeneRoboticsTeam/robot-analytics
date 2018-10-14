export interface Metrics {
    [name: string]: Metric
}

export interface Metric<T = any> {
    type: ScoutMetricType
    value: T
}

export enum ScoutMetricType {
    TEXT = "text",
    NUMBER = "number",
    NUMBER_ARRAY = "numberArray",
    BOOLEAN = "boolean",
    ENUM = "enum",
}

export interface TextMetric extends Metric<string> {
    type: ScoutMetricType.TEXT
}

export interface NumberMetric extends Metric<number> {
    type: ScoutMetricType.NUMBER
}

export interface NumberArrayMetric extends Metric<Array<number>> {
    type: ScoutMetricType.NUMBER_ARRAY
}

export interface BooleanMetric extends Metric<boolean> {
    type: ScoutMetricType.BOOLEAN
}

export interface EnumMetric extends Metric<string> {
    type: ScoutMetricType.TEXT
}

export const isTextMetric = (metric: Metric): metric is TextMetric => metric.type === 'text';

export const isNumberMetric = (metric: Metric): metric is NumberMetric => metric.type === 'number';

export const isNumberArrayMetric = (metric: Metric): metric is NumberArrayMetric => metric.type === 'numberArray';

export const isBooleanMetric = (metric: Metric): metric is BooleanMetric => metric.type === 'text';

export const isEnumMetric = (metric: Metric): metric is EnumMetric => metric.type === 'text';
