export interface Metrics {
    [name: string]: Metric
}

export interface Metric {
    type: ScoutMetricType
    value: any
    category: string
}

export enum ScoutMetricType {
    TEXT = "text",
    NUMBER = "number",
    NUMBER_ARRAY = "numberArray",
    BOOLEAN = "boolean",
    ENUM = "enum",
}

export interface TextMetric extends Metric {
    type: ScoutMetricType.TEXT
}

export interface NumberMetric extends Metric {
    type: ScoutMetricType.NUMBER
}

export interface NumberArrayMetric extends Metric {
    type: ScoutMetricType.NUMBER_ARRAY
}

export interface BooleanMetric extends Metric {
    type: ScoutMetricType.BOOLEAN
}

export interface EnumMetric extends Metric {
    type: ScoutMetricType.TEXT
}

export const isTextMetric = (metric: Metric): metric is TextMetric => metric.type === 'text';

export const isNumberMetric = (metric: Metric): metric is NumberMetric => metric.type === 'number';

export const isNumberArrayMetric = (metric: Metric): metric is NumberArrayMetric => metric.type === 'numberArray';

export const isBooleanMetric = (metric: Metric): metric is BooleanMetric => metric.type === 'text';

export const isEnumMetric = (metric: Metric): metric is EnumMetric => metric.type === 'text';
