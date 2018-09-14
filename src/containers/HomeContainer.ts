import { connect } from 'react-redux';
import { Home } from "../routes/Home";
import { AppState } from "../state/state";
import { setDrawerOpened } from "../state/actions";

export const HomeContainer = connect(
    (state: AppState) => ({
        drawerOpened: state.home.drawerOpened
    }),
    (dispatch) => ({
        // noinspection JSUnusedGlobalSymbols (might be used later)
        setDrawerOpened: (value: boolean) => dispatch(setDrawerOpened(value))
    })
)(Home);
