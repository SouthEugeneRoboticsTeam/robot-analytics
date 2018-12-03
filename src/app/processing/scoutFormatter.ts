import { addTeam, addScout } from '@robot-analytics/state/actions'
import { store } from '@robot-analytics/state/store'
import { ScoutSections } from '@robot-analytics/data/scout'
import { RsScout, RsTeams, toScoutMetricType } from '@robot-analytics/datarsData';

// Takes one object of raw scout data from one match. Will return a formatted object of the same data
const formatScout = (rsScout: RsScout, gameName: string) => {
    const rsMetrics = rsScout.metrics;
    // Initialize object to store the formatted scout data
    const scoutSections: ScoutSections = {};
    // Finds all the different sections in the scout data and stores them in an array
    const allScoutSections: Array<string> = [];
    for (const metric in rsMetrics) {
        if (!(rsScout.metrics[metric].category in allScoutSections)){
            allScoutSections.push(rsMetrics[metric].category);
        }
    }
    // Add in the metrics object within each scout section
    for (const section in allScoutSections) {
        scoutSections[allScoutSections[section]] = { metrics: {} };
    }
    // Format the individual metrics and organizes them to be in their correct section
    for (const metric in rsMetrics) {
        for (const section in allScoutSections) {
            // Puts the metric in its correct section
            if (rsMetrics[metric].category === allScoutSections[section]){
                scoutSections[allScoutSections[section]].metrics[rsMetrics[metric]['name']] = {
                    type: toScoutMetricType(rsMetrics[metric].type),
                    value: rsMetrics[metric].value
                };
            }
        }
    }
    return {
        gameName: gameName, 
        sections: scoutSections
    };
};

// Add teams and their scouts to the state
// TODO: Use TBA to include team name in state instead of team number
export const addTeams = (rsTeams: RsTeams, gameName: string) => {
    for (const team in rsTeams) {
        // Add team to the state and creates the scouts object within the object
        store.dispatch(addTeam(team, Number(team), {}));
        // Format and associate each scout with its team
        for (const scout in rsTeams[team]) {
            store.dispatch(addScout(
                Number(team),
                rsTeams[team][Number(scout)]['name'],
                formatScout(rsTeams[team][Number(scout)], gameName)
            ))
        }
    }
};
