import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
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
        this.state.configuration.forEach((thing) => {
            console.log(`${thing.metricName} : ${thing.calculationName}`)
        })
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
                <Modal
                    tabIndex={-1}
                    open={isModalOpen}
                    onClose={this.handleModalClose}
                >
                    <TableSettingsModal
                        setCalculations={this.setConfiguration}
                        isModalOpen={this.state.isModalOpen}
                        handleModalClose={this.handleModalClose}
                    />
                </Modal>
                <IconButton onClick={this.handleModalOpen}>
                    <SettingsIcon />
                </IconButton>
            </div>
        );
    }
}

interface TableViewState {
    isModalOpen: boolean
    configuration: Array<{ metricName: string, calculationName: string }>
}
