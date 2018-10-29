import { addTeam, addScout } from '../state/actions'
import { store } from '../state/store'
import { ScoutSections } from '../data/scout'

// Takes one object of raw scout data from one match. Will return a formatted object of the same data
function formatScout(scoutData: object, gameName:string) {
    const scoutMetrics = (scoutData as any)["metrics"]

    // Initialize object to store the formatted scout data
    var formattedMetrics: ScoutSections = {}

    // Finds all the different sections in the scout data and stores them in an array
    var allScoutSections: Array<string> = []
    for (var metric in scoutMetrics) {
        if (!allScoutSections.includes(scoutMetrics[metric]["category"])){
            allScoutSections.push(scoutMetrics[metric]["category"])
        }
    }

    // Add in the metrics object within each scout section
    for (var section in allScoutSections){
        formattedMetrics[allScoutSections[section]] = {metrics: {}}
    }

    // Format the individual metrics and organizes them to be in their correct section
    for (var metric in scoutMetrics) {
        for (var section in allScoutSections){
            // Puts the metric in its correct section
            if (scoutMetrics[metric]["category"] == allScoutSections[section]){
                formattedMetrics[allScoutSections[section]].metrics[scoutMetrics[metric]["name"]] = 
                    ({type: scoutMetrics[metric]["type"], value: scoutMetrics[metric]["value"]})
            }
        }
    }

    return {
        gameName: gameName, 
        sections: formattedMetrics
    }

}

// Add teams and their scouts to the state
// TODO: Use TBA to include team name in state instead of team number
export function addTeams(allTeams: object, gameName:string) {
    for (var team in allTeams) {
        // Add team to the state and creates the scouts object within the object
        store.dispatch(addTeam(team, Number(team), {}))
        // Format and associate each scout with its team
        for (var scout in (allTeams as any)[team]) {
            store.dispatch(addScout(Number(team),
                            (allTeams as any)[team][Number(scout)]["name"],
                            formatScout((allTeams as any)[team][Number(scout)], gameName))
            )
        }
    
    }
}