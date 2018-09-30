import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { Team } from '../files/team';
import { Scout } from '../files/scout';

const styles = createStyles({
    list: {
        padding: 0
    },
    nested: {
        paddingLeft: '25px',
    }
});

export const TeamListItem = withStyles(styles)(
    class extends React.Component<TeamListItemProps, TeamListItemState> {
        state = {
            open: false
        };

        handleClick = () => this.setState({ open: !this.state.open });

        render() {
            const { classes, team, scouts } = this.props;
            const { open } = this.state;
            return (
                <>
                    <ListItem button key={`${team.name}_${team.number}`} onClick={this.handleClick}>
                        <ListItemText primary={team.name} secondary={team.number}/>
                        {scouts.length ? (open ? <ExpandLess /> : <ExpandMore />) : null}
                    </ListItem>
                    {scouts
                        ? <Collapse in={open}>
                            <List style={{ padding: 0 }}>
                                {...scouts.map((scout) => (
                                    <ListItem button className={classes.nested} key={scout.name}>
                                        <ListItemText primary={scout.name}/>
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                        : null
                    }
                </>
            )
        }
    }
);

interface TeamListItemProps extends WithStyles<typeof styles> {
    team: Team
    scouts: Array<Scout>
}

interface TeamListItemState {
    open: boolean
}
