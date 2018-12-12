import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import { TableSettingsModal } from '../components/TableSettingsModal';
import { flatten, has, keys, map, mapKeys, reduce, filter } from 'lodash';
import { TableViewTable } from '@robot-analytics/componentsTableViewTable';

export const TableView = class extends React.Component<{}, TableViewState> {
    state: TableViewState = {
        isModalOpen: false,
        gameName: '',
        calculationSettings: []
    };

    configureTable = (calculationSettings: Array<CalculationSetting>) => {
        this.setState({ calculationSettings });
    };

    handleModalOpen = () => {
        this.setState({ isModalOpen: true });
    };

    handleModalClose = () => {
        this.setState({ isModalOpen: false });
    };

    render() {
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
                <TableViewTable settings={calculationSettings}/>
            </div>
        );
    }
};

interface TableViewState {
    isModalOpen: boolean
    gameName: string
    calculationSettings: Array<CalculationSetting>
}

export interface CalculationSetting {
    metricName: string,
    calculationName: string
}
