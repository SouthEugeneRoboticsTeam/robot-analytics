import { connect } from 'react-redux';
import { Home } from "../routes/Home";
import { setDrawerOpened } from "../state/actions";
import { AppState } from "../state/state";

export const HomeContainer = connect(
    (state: AppState) => ({
        drawerOpened: state.home.drawerOpened
    }),
    (dispatch) => ({
        setDrawerOpened: (value: boolean) => dispatch(setDrawerOpened(value))
    })
)(Home);
