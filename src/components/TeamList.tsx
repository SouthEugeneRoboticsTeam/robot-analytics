import * as React from 'react';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Team } from "../files/team";

export const styles = createStyles({
    root: {
        width: '250px'
    }
});

export class TeamList extends React.Component<TeamListProps> {
    render() {
        const { classes, teams } = this.props;
        return (
            <List className={classes.root}>
                {...teams.map(team => (
                    <ListItem button key={`${team.name}_${team.number}`}>
                        <ListItemText primary={team.name} secondary={team.number}/>
                    </ListItem>
                ))}
            </List>
        );
    }
}

export interface TeamListProps extends WithStyles<typeof styles> {
    teams: Array<Team>
}
