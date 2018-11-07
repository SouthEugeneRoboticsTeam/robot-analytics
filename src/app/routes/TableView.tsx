import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Table from '@material-ui/core/Table';
import { Paper, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { TableSettingsModal } from '../components/TableSettingsModal';
import { flatten, has, keys, map, mapKeys } from 'lodash';
import { Teams } from '@robot-analytics/data/team';
import { calculations } from '@robot-analytics/data/calculations';
import { connect } from 'react-redux';
import { AppState } from '@robot-analytics/state/state';
import { take } from '@robot-analytics/utils';

export const TableView = connect(
    (state: AppState) => ({ teams: state.teams })
)(
    class extends React.Component<TableViewProps, TableViewState> {
    state: TableViewState = {
        isModalOpen: false,
        gameName: '',
        calculationSettings: []
    };

    configureTable = (gameName: string, calculationSettings: Array<CalculationSetting>) => {
        this.setState({ gameName, calculationSettings });
    };

    handleModalOpen = () => {
        this.setState({ isModalOpen: true });
    };

    handleModalClose = () => {
        this.setState({ isModalOpen: false });
    };

    render() {
        const { teams } = this.props;
        const { isModalOpen, calculationSettings } = this.state;
        return (
            <div>
                <Typography variant="display2">Table View</Typography>
                <TableSettingsModal
                    configureTable={this.configureTable}
                    isModalOpen={isModalOpen}
                    handleModalClose={this.handleModalClose}
                />
                <IconButton onClick={this.handleModalOpen}>
                    <SettingsIcon/>
                </IconButton>
                <Paper style={{ overflowX: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Team Name</TableCell>
                                <TableCell>Team Number</TableCell>
                                {map(calculationSettings, setting => (
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
                                    {map(calculationSettings, setting => (
                                        <TableCell key={`${setting.metricName}-${setting.calculationName}`}>
                                            {`${calculations[take(setting.calculationName, c => {
                                                console.log(c);
                                                return c
                                            })].invoke(
                                                ...flatten(map(team.scouts, scout => (
                                                    map(scout.sections, section => section.metrics[setting.metricName])
                                                )))
                                            ).value}`}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
});

interface TableViewProps {
    teams: Teams
}

interface TableViewState {
    isModalOpen: boolean
    gameName: string
    calculationSettings: Array<CalculationSetting>
}

export interface CalculationSetting {
    metricName: string,
    calculationName: string
}
