import * as React from 'react';
import { Teams } from '@robot-analytics/datateam';
import { CalculationSetting } from '@robot-analytics/routesTableView';
import { map } from 'lodash';
import { calculations } from '@robot-analytics/datacalculations';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { connect } from 'react-redux';
import { AppState } from '@robot-analytics/statestate';

export const TableViewTable = connect(
    (state: AppState, ownProps: TableConnectProps) => ({
        teams: state.teams,
        settings: ownProps.settings
    })
)(
    class extends React.Component<TableViewTableProps> {
        render() {
            const { settings, teams } = this.props;
            return (
                <Paper style={{ overflowX: 'auto' }}>
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

interface TableViewTableProps extends TableConnectProps{
    teams: Teams
}
