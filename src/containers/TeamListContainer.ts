import { connect } from 'react-redux';
import { AppState } from "../state/state";
import { TeamList } from "../components/TeamList";

export const TeamListContainer = connect(
    (state: AppState) => ({
        teams: state.teams
    }),
    (dispatch) => ({
        classes: null
    })
)(TeamList);
