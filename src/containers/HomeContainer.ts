import { connect } from 'preact-redux';
import { Home } from "../routes/Home";
import { setDrawerOpened } from "../state/actions";

export const HomeContainer = connect(
    (state) => ({
        drawerOpened: state.home.drawerOpened
    }),
    (dispatch) => ({
        setDrawerOpened: (value: boolean) => dispatch(setDrawerOpened(value))
    })
)(Home);
