import { processRsData } from '@robot-analytics/processing/scoutFormatter'
import { Teams } from '@robot-analytics/data/team';
import { Metrics, ScoutMetricType } from '@robot-analytics/data/metric';

describe('Robot scouter data converts correctly', () => {
    const processedRsData = processRsData({
        teams: {
            '0000': [
                {
                    name: 'Q1',
                    metrics: {
                        'a': {
                            type: 'text',
                            name: 'metric1',
                            value: 'abc',
                            category: 'category1'
                        },
                        'b': {
                            type: 'number',
                            name: 'metric2',
                            value: 5,
                            category: 'category1'
                        },
                        'c': {
                            type: 'boolean',
                            name: 'metric3',
                            value: true,
                            category: 'category2'
                        }
                    }
                },
                {
                    name: 'Q2',
                    metrics: {
                        'a': {
                            type: 'text',
                            name: 'metric1',
                            value: 'def',
                            category: 'category1'
                        },
                        'b': {
                            type: 'number',
                            name: 'metric2',
                            value: 1,
                            category: 'category1'
                        },
                        'c': {
                            type: 'boolean',
                            name: 'metric3',
                            value: false,
                            category: 'category2'
                        }
                    }
                }
            ],
            '0001': [
                {
                    name: 'Q1',
                    metrics: {
                        'a': {
                            type: 'text',
                            name: 'metric1',
                            value: 'ghi',
                            category: 'category1'
                        },
                        'b': {
                            type: 'number',
                            name: 'metric2',
                            value: 3,
                            category: 'category1'
                        },
                        'c': {
                            type: 'boolean',
                            name: 'metric3',
                            value: false,
                            category: 'category2'
                        }
                    }
                },
                {
                    name: 'Q2',
                    metrics: {
                        'a': {
                            type: 'text',
                            name: 'metric1',
                            value: 'jkl',
                            category: 'category1'
                        },
                        'b': {
                            type: 'number',
                            name: 'metric2',
                            value: 6,
                            category: 'category1'
                        },
                        'c': {
                            type: 'boolean',
                            name: 'metric3',
                            value: false,
                            category: 'category2'
                        }
                    }
                }
            ]
        }
    });
    const data: { teams: Teams, metrics: Metrics } = {
        teams: {
            0: {
                name: '0000',
                scouts: {
                    'Q1': {
                        metrics: {
                            'metric1': {
                                type: ScoutMetricType.TEXT,
                                value: 'abc',
                                category: 'category1'
                            },
                            'metric2': {
                                type: ScoutMetricType.NUMBER,
                                value: 5,
                                category: 'category1'
                            },
                            'metric3': {
                                type: ScoutMetricType.BOOLEAN,
                                value: true,
                                category: 'category2'
                            }
                        }
                    },
                    'Q2': {
                        metrics: {
                            'metric1': {
                                type: ScoutMetricType.TEXT,
                                value: 'def',
                                category: 'category1'
                            },
                            'metric2': {
                                type: ScoutMetricType.NUMBER,
                                value: 1,
                                category: 'category1'
                            },
                            'metric3': {
                                type: ScoutMetricType.BOOLEAN,
                                value: false,
                                category: 'category2'
                            }
                        }
                    }
                }
            },
            1: {
                name: '0001',
                scouts: {
                    'Q1': {
                        metrics: {
                            'metric1': {
                                type: ScoutMetricType.TEXT,
                                value: 'ghi',
                                category: 'category1'
                            },
                            'metric2': {
                                type: ScoutMetricType.NUMBER,
                                value: 3,
                                category: 'category1'
                            },
                            'metric3': {
                                type: ScoutMetricType.BOOLEAN,
                                value: false,
                                category: 'category2'
                            }
                        }
                    },
                    'Q2': {
                        metrics: {
                            'metric1': {
                                type: ScoutMetricType.TEXT,
                                value: 'jkl',
                                category: 'category1'
                            },
                            'metric2': {
                                type: ScoutMetricType.NUMBER,
                                value: 6,
                                category: 'category1'
                            },
                            'metric3': {
                                type: ScoutMetricType.BOOLEAN,
                                value: false,
                                category: 'category2'
                            }
                        }
                    }
                }
            }
        },
        metrics: {
            'metric1': {
                type: ScoutMetricType.TEXT,
                value: null,
                category: 'category1'
            },
            'metric2': {
                type: ScoutMetricType.NUMBER,
                value: null,
                category: 'category1'
            },
            'metric3': {
                type: ScoutMetricType.BOOLEAN,
                value: null,
                category: 'category2'
            }
        }
    };
    test("Processed rsData matches data", () => {
        expect(processedRsData).toEqual(data)
    });
    test("Processed rsData metrics match data metrics", () => {
        expect(processedRsData.metrics).toEqual(data.metrics)
    });
    test("Processed rsData teams match data teams", () => {
        expect(processedRsData.metrics).toEqual(data.metrics)
    })
});
