import * as React from 'react';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Team } from "../files/team";

const styles = createStyles({
    root: {
        width: '250px'
    }
});

export const TeamList = withStyles(styles)((props: TeamListProps) => (
    <List className={props.classes.root}>
        {...props.teams.map(team => (
            <ListItem button>
                <ListItemText primary={team.name} secondary={team.number}/>
            </ListItem>
        ))}
    </List>
));

export interface TeamListProps extends WithStyles<typeof styles> {
    teams: Array<Team>
}
