import { addTeams } from "./scoutDataFormatter"
// TODO: JSON importinng through UI
import * as data from './scout.json'
import { store } from '../state/store'

// TODO: Maybe make changing this possible through the UI
const preferences = {
    gameName : "frc2018powerup"
}

addTeams(data["teams"], preferences.gameName)

