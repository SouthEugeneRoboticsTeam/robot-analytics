import * as React from 'react';
import List from '@material-ui/core/List'
import { TeamListItem } from './TeamListItem';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Team } from "../files/team";
import { Scout } from '../files/scout';

export const styles = createStyles({
    root: {
        width: '250px'
    }
});

export class TeamList extends React.Component<TeamListProps> {
    render() {
        const { classes, teams, scouts } = this.props;
        return (
            <List className={classes.root}>
                {...teams.map(team => <TeamListItem
                    team={team}
                    scouts={scouts.filter((scout) => scout.team.name === team.name)}
                />)}
            </List>
        );
    }
}

export interface TeamListProps extends WithStyles<typeof styles> {
    teams: Array<Team>
    scouts: Array<Scout>
}
