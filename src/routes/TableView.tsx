import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import { TableSettingsModal } from '../components/TableSettingsModal';

export class TableView extends React.Component<React.Props<any>, TableViewState> {
    state: TableViewState = {
        isModalOpen: false
    };

    handleModalOpen = ()  => {
        this.setState({ isModalOpen: true });
    };

    handleModalClose = ()  => {
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
                    <TableSettingsModal />
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
}
