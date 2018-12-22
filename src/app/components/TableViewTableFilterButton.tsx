import * as React from 'react';
import { reduce, map, filter, keys, forEach, includes } from 'lodash';
import FilterListIcon from '@material-ui/icons/FilterList';
import {  Menu, MenuItem, Tooltip, IconButton, Checkbox, ListItemText } from '@material-ui/core';

export class TableViewTableFilterButton extends React.Component<TableViewTableFilterButtonProps, TableViewTableFilterButtonState> {
    state: TableViewTableFilterButtonState = {
        modalOpen: false,
        filterColumns: [],
        anchorEl: null
    };

    handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.columnNames.length > 1) {
            this.setState({ anchorEl: event.currentTarget })
        }
    };

    handleClose = () => {
        this.setState({ modalOpen: false, anchorEl: null });
        this.props.onRequestFilter(this.state.filterColumns)
    };

    createCheckboxChangeHandler = (columnName: string) => () => {
        this.setState({
            filterColumns: (included => {
                switch (included.indexOf(columnName)) {
                    case -1:
                        return [...included, columnName];
                    default:
                        return filter(included, cn => cn !== columnName)
                }
            })(this.state.filterColumns)
        });
    };

    componentWillReceiveProps(nextProps: Readonly<TableViewTableFilterButtonProps>) {
        this.setState({
            filterColumns: filter(nextProps.columnNames, columnName => includes(this.state.filterColumns, columnName))
        })
    }

    handleSelectAll = () => {
        this.setState({
            filterColumns: this.props.columnNames.length === this.state.filterColumns.length ? [] : this.props.columnNames
        });
    };

    render() {
        const { columnNames } = this.props;
        const { anchorEl, filterColumns } = this.state;
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
                    <MenuItem
                        role="checkbox"
                        aria-checked={filterColumns.length === 0}
                        onClick={this.handleSelectAll}
                    >
                        <Checkbox
                            checked={filterColumns.length === 0}
                            onChange={this.handleSelectAll}
                            indeterminate={filterColumns.length > 0 && filterColumns.length < columnNames.length}
                        />
                        <ListItemText>Select all</ListItemText>
                    </MenuItem>
                    {map(filter(columnNames, columnName => columnName !== 'Team number'), columnName => (
                        <MenuItem
                            key={columnName}
                            role="checkbox"
                            aria-checked={!includes(filterColumns, columnName)}
                            onClick={this.createCheckboxChangeHandler(columnName)}
                        >
                            <Checkbox
                                checked={!includes(filterColumns, columnName)}
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
    filterColumns: Array<string>
    anchorEl: HTMLElement | null
}

