import * as React from 'react';
import { reduce, map, filter, keys } from 'lodash';
import FilterListIcon from '@material-ui/icons/FilterList';
import {  Menu, MenuItem, Tooltip, IconButton, Checkbox, ListItemText } from '@material-ui/core';

export class TableViewTableFilterButton extends React.Component<TableViewTableFilterButtonProps, TableViewTableFilterButtonState> {
    state: TableViewTableFilterButtonState = {
        modalOpen: false,
        checkboxes: reduce(this.props.columnNames, (checkboxes: Checkboxes, columnName) => {
            if (columnName !== 'Team Number') {
                checkboxes[columnName] = true;
            }
            return checkboxes;
        }, {}),
        anchorEl: null
    };

    handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.columnNames.length > 1) {
            this.setState({ anchorEl: event.currentTarget })
        }
    };

    handleClose = () => {
        const { columnNames } = this.props;
        this.setState({ modalOpen: false, anchorEl: null });
        this.props.onRequestFilter(filter(columnNames, columnName => !this.state.checkboxes[columnName]))
    };

    createCheckboxChangeHandler = (checkboxName: string) => () => {
        this.setState({
            checkboxes: {
                ...this.state.checkboxes,
                [checkboxName]: !this.state.checkboxes[checkboxName]
            }
        })
    };

    componentWillReceiveProps(nextProps: Readonly<TableViewTableFilterButtonProps>) {
        this.setState({ checkboxes: reduce(nextProps.columnNames, (checkboxes: Checkboxes, columnName) => {
            if (this.state.checkboxes[columnName] === undefined && columnName !== 'Team Number') {
                checkboxes[columnName] = true;
            }
            return checkboxes;
        }, this.state.checkboxes) })
    }

    render() {
        const { anchorEl, checkboxes } = this.state;
        return (
            <div>
                <Tooltip title="Filter list">
                    <IconButton
                        aria-label="Filter list"
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                        <FilterListIcon/>
                    </IconButton>
                </Tooltip>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    {map(checkboxes, (checkbox, checkboxName) => (
                        <MenuItem
                            key={checkboxName}
                            role="checkbox"
                            aria-checked={checkbox}
                            onClick={this.createCheckboxChangeHandler(checkboxName)}
                        >
                            <Checkbox checked={checkbox} onChange={this.createCheckboxChangeHandler(checkboxName)}/>
                            <ListItemText>{checkboxName}</ListItemText>
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

interface TableViewTableFilterButtonProps {
    columnNames: Array<string>
    onRequestFilter: (columnNames: Array<string>) => void
}

interface TableViewTableFilterButtonState {
    modalOpen: boolean
    checkboxes: Checkboxes
    anchorEl: HTMLElement | null
}

interface Checkboxes {
    [name: string]: boolean
}
