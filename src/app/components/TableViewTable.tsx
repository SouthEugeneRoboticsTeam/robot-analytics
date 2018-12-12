import * as React from 'react';
import { Teams } from '@robot-analytics/datateam';
import { CalculationSetting } from '@robot-analytics/routesTableView';
import { map } from 'lodash';
import { calculations } from '@robot-analytics/datacalculations';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, withStyles, Theme, createStyles, WithStyles, Toolbar,
    IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { connect } from 'react-redux';
import { AppState } from '@robot-analytics/statestate';
import { compose } from 'redux';

const styles = (theme: Theme) => createStyles({
    toolbarSpacer: {
        flex: '1 1 100%',
    },
    toolbarActions: {
        color: theme.palette.text.secondary,
    },
});

export const TableViewTable = compose(
    connect(
        (state: AppState, ownProps: TableConnectProps) => ({
            teams: state.teams,
            ...ownProps
        })
    ),
    withStyles(styles)
)(
    class extends React.Component<TableViewTableProps> {
        render() {
            const { settings, teams, classes } = this.props;
            return (
                <Paper style={{ overflowX: 'auto' }}>
                    <Toolbar>
                        <div className={classes.toolbarSpacer} />
                        <div className={classes.toolbarActions}>
                            <IconButton>
                                <SettingsIcon/>
                            </IconButton>
                        </div>
                    </Toolbar>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{'Team Name'}</TableCell>
                                <TableCell>{'Team Number'}</TableCell>
                                {map(settings, setting => (
                                    <TableCell key={`${setting.metricName}-${setting.calculationName}`}>
                                        {`${setting.metricName} (${setting.calculationName})`}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {map(teams, (team, teamNumber) => (
                                <TableRow key={team.name}>
                                    <TableCell>{team.name}</TableCell>
                                    <TableCell>{teamNumber}</TableCell>
                                    {map(settings, setting => (
                                        <TableCell key={`${setting.metricName}-${setting.calculationName}`}>
                                            {calculations[setting.calculationName].invoke(
                                                ...map(team.scouts, scout => (
                                                    scout.metrics[setting.metricName]
                                                ))
                                            ).value}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )
        }
    }
);

interface TableConnectProps {
    settings: Array<CalculationSetting>
}

interface TableViewTableProps extends TableConnectProps, WithStyles<typeof styles> {
    teams: Teams
}
