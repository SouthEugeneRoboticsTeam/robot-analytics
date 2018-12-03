import { addTeam, addScout } from '@robot-analytics/state/actions'
import { store } from '@robot-analytics/state/store'
import { ScoutSections } from '@robot-analytics/data/scout'

// Takes one object of raw scout data from one match. Will return a formatted object of the same data
const formatScout = (scoutData: any, gameName: string) => {
    const scoutMetrics = scoutData['metrics'];
    // Initialize object to store the formatted scout data
    let formattedMetrics: ScoutSections = {};
    // Finds all the different sections in the scout data and stores them in an array
    let allScoutSections: Array<string> = [];
    for (const metric in scoutMetrics) {
        if (!(scoutMetrics[metric]['category'] in allScoutSections)){
            allScoutSections.push(scoutMetrics[metric]['category']);
        }
    }
    // Add in the metrics object within each scout section
    for (const section in allScoutSections) {
        formattedMetrics[allScoutSections[section]] = { metrics: {} };
    }
    // Format the individual metrics and organizes them to be in their correct section
    for (let metric in scoutMetrics) {
        for (const section in allScoutSections) {
            // Puts the metric in its correct section
            if (scoutMetrics[metric]['category'] == allScoutSections[section]){
                formattedMetrics[allScoutSections[section]].metrics[scoutMetrics[metric]['name']] =
                    ({type: scoutMetrics[metric]['type'], value: scoutMetrics[metric]['value']})
            }
        }
    }
    return {
        gameName: gameName, 
        sections: formattedMetrics
    }
};

// Add teams and their scouts to the state
// TODO: Use TBA to include team name in state instead of team number
export const addTeams = (allTeams: any, gameName: string) => {
    for (const team in allTeams) {
        // Add team to the state and creates the scouts object within the object
        store.dispatch(addTeam(team, Number(team), {}));
        // Format and associate each scout with its team
        for (let scout in allTeams[team]) {
            store.dispatch(
                addScout(Number(team),
                allTeams[team][Number(scout)]['name'],
                formatScout(allTeams[team][Number(scout)], gameName))
            )
        }
    }
};
