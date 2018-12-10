import { Scouts } from '@robot-analytics/data/scout'
import { RsData, toScoutMetricType } from '@robot-analytics/data/rsData';
import { Teams } from '@robot-analytics/datateam';
import { reduce, keys } from 'lodash';
import { store } from '@robot-analytics/statestore';
import { Metrics } from '@robot-analytics/datametric';

// Convert RsTeams to Teams
export const processRsData = (rsData: RsData) => (
    reduce(rsData.teams, (data: { teams: Teams, metrics: Metrics }, rsTeam, rsTeamNumber) => {
        data.teams[parseInt(rsTeamNumber)] = {
            // TODO: use real teamName, currently using teamNumber
            name: rsTeamNumber,
            scouts: reduce(rsTeam, (scouts: Scouts, rsScout) => {
                if (rsScout.name != null) {
                    scouts[rsScout.name] = {
                        metrics: reduce(rsScout.metrics, (metrics: Metrics, rsMetric) => {
                            if (!store.getState().hasOwnProperty(rsMetric.name)) {
                                data.metrics[rsMetric.name] = {
                                    type: toScoutMetricType(rsMetric.type),
                                    category: rsMetric.category,
                                    value: null
                                };
                            }
                            metrics[rsMetric.name] = {
                                type: toScoutMetricType(rsMetric.type),
                                value: rsMetric.value,
                                category: rsMetric.category
                            };
                            return metrics;
                        }, {})
                    };
                }
                return scouts
            }, {})
        };
        return data;
    }, { teams: {}, metrics: {} })
);
