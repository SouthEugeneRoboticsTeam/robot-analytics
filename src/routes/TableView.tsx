import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import { TableSettingsModal } from '../components/TableSettingsModal';

export class TableView extends React.Component<React.Props<any>, TableViewState> {
    state: TableViewState = {
        isModalOpen: false,
        configuration: []
    };

    setConfiguration = (calculations: Array<{ metricName: string, calculationName: string }>) => {
        this.setState({ configuration: calculations });
    };

    handleModalOpen = () => {
        this.setState({ isModalOpen: true });
    };

    handleModalClose = () => {
        this.setState({ isModalOpen: false });
    };

    render() {
        const { isModalOpen } = this.state;
        return (
            <div>
                <Typography variant="display2">Table View</Typography>
                <TableSettingsModal
                    setCalculations={this.setConfiguration}
                    isModalOpen={isModalOpen}
                    handleModalClose={this.handleModalClose}
                />
                <IconButton onClick={this.handleModalOpen}>
                    <SettingsIcon/>
                </IconButton>
            </div>
        );
    }
}

interface TableViewState {
    isModalOpen: boolean
    configuration: Array<{ metricName: string, calculationName: string }>
}
