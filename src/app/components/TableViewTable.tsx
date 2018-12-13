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
    class extends React.Component<TableViewTableProps, TableViewTableState> {
        getColumns = (settings: Array<CalculationSetting>) => [
            'Team Number',
            ...map(settings, setting => `${setting.metricName} (${setting.calculationName})`)
        ];

        getData = (settings: Array<CalculationSetting>, teams: Teams) => map(teams, (team, teamNumber) => [
            teamNumber,
            ...map(settings, setting => (
                calculations[setting.calculationName].invoke(
                    ...map(team.scouts, scout => (
                        scout.metrics[setting.metricName]
                    ))
                ).value
            ))
        ]);

        state = {
            columns: this.getColumns(this.props.settings),
            data: this.getData(this.props.settings, this.props.teams)
        };

        componentWillReceiveProps(nextProps: Readonly<TableViewTableProps>) {
            this.setState({
                columns: this.getColumns(nextProps.settings),
                data: this.getData(nextProps.settings, nextProps.teams)
            })
        }

        render() {
            const { classes } = this.props;
            const { columns, data } = this.state;
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
                                {map(columns, (column, index) => <TableCell key={index}>{column}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {map(data, (row, index) => (
                                <TableRow key={index}>
                                    {map(row, (cell, index) => <TableCell key={index}>{cell}</TableCell>)}
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

interface TableViewTableState {
    columns: Array<string>,
    data: Array<Array<any>>
}
