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
