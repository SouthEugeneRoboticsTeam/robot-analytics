import { Scouts, ScoutSections } from '@robot-analytics/data/scout'
import { RsTeams, toScoutMetricType } from '@robot-analytics/data/rsData';
import { Teams } from '@robot-analytics/datateam';
import { reduce } from 'lodash';

// Convert RsTeams to Teams
export const processRsTeams = (rsTeams: RsTeams) => (
    reduce(rsTeams, (teams: Teams, rsTeam, rsTeamNumber) => {
        console.log(rsTeamNumber);
        teams[parseInt(rsTeamNumber)] = {
            // TODO: use real teamName, currently using teamNumber
            name: rsTeamNumber,
            scouts: reduce(rsTeam, (scouts: Scouts, rsScout) => {
                scouts[rsScout.name] = {
                    // TODO: use real gameName, currently empty
                    gameName: '',
                    sections: reduce(rsScout.metrics, (sections: ScoutSections, rsMetric) => {
                        sections[rsMetric.category] = {
                            ...sections[rsMetric.category],
                            ...{
                                metrics: {
                                    ...(sections[rsMetric.category] ? sections[rsMetric.category].metrics : {}),
                                    [rsMetric.name]: {
                                        type: toScoutMetricType(rsMetric.type),
                                        value: rsMetric.value
                                    }
                                }
                            }
                        };
                        return sections;
                    }, {})
                };
                return rsTeam
            }, {})
        };
        return teams
    }, {})
);
