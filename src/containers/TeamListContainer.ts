import { connect } from 'react-redux';
import { AppState } from '../state/state';
import { TeamList, styles } from '../components/TeamList';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';

export const TeamListContainer = compose(
    withStyles(styles),
    connect(
        (state: AppState) => ({
            teams: state.teams,
            scouts: state.scouts
        })
    )
)(TeamList);
