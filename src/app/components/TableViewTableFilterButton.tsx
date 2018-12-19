import * as React from 'react';
import { reduce, map, filter, keys, forEach, includes } from 'lodash';
import FilterListIcon from '@material-ui/icons/FilterList';
import {  Menu, MenuItem, Tooltip, IconButton, Checkbox, ListItemText } from '@material-ui/core';

export class TableViewTableFilterButton extends React.Component<TableViewTableFilterButtonProps, TableViewTableFilterButtonState> {
    state: TableViewTableFilterButtonState = {
        modalOpen: false,
        filter: [],
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
        this.setState({ modalOpen: false, anchorEl: null });
        this.props.onRequestFilter(this.state.filter)
    };

    createCheckboxChangeHandler = (checkboxName: string) => () => {
        this.setState({
            filter: (included => {
                switch (included.indexOf(checkboxName)) {
                    case -1:
                        return [...included, checkboxName];
                    default:
                        return filter(included, cn => cn !== checkboxName)
                }
            })(this.state.filter)
        });
    };

    componentWillReceiveProps(nextProps: Readonly<TableViewTableFilterButtonProps>) {
        this.setState({
            filter: filter(nextProps.columnNames, columnName => includes(this.state.filter, columnName))
        })
    }

    render() {
        const { columnNames } = this.props;
        const { anchorEl, filter } = this.state;
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
                    {map(columnNames, columnName => (
                        <MenuItem
                            key={columnName}
                            role="checkbox"
                            aria-checked={!includes(filter, columnName)}
                            onClick={this.createCheckboxChangeHandler(columnName)}
                        >
                            <Checkbox
                                checked={!includes(filter, columnName)}
                                onChange={this.createCheckboxChangeHandler(columnName)}
                            />
                            <ListItemText>{columnName}</ListItemText>
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    };
}

interface TableViewTableFilterButtonProps {
    columnNames: Array<string>
    onRequestFilter: (columnNames: Array<string>) => void
}

interface TableViewTableFilterButtonState {
    modalOpen: boolean
    filter: Array<string>
    checkboxes: Checkboxes
    anchorEl: HTMLElement | null
}

interface Checkboxes {
    [name: string]: boolean
}
