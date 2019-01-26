import * as React from 'react';
import Menu from '@material-ui/core/Menu';
import { ColumnData } from '@robot-analytics/routes/TableView/data';
import { map, includes, filter } from 'lodash';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton, Checkbox, ListItemText } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

class FilterMenu extends React.Component<FilterMenuProps, FilterMenuState> {
    state: FilterMenuState = {
        anchorEl: null,
        filteredColumns: []
    };

    onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.columns.length > 1) {
            this.setState({ anchorEl: event.currentTarget })
        }
    };

    onExit = () => {
        this.setState({ anchorEl: null });
        this.props.onFilter(this.state.filteredColumns)
    };

    createCheckboxChangeHandler = (column: ColumnData) => () => {
        this.setState({
            filteredColumns: (filteredColumns => {
                switch (filteredColumns.indexOf(column)) {
                    case -1:
                        return [...filteredColumns, column];
                    default:
                        return filter(filteredColumns, c => c !== column)
                }
            })(this.state.filteredColumns)
        });
    };

    render() {
        const { columns } = this.props;
        const { anchorEl, filteredColumns } = this.state;
        return (
            <>
                <IconButton
                    aria-label="Filter list"
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.onClick}
                >
                    <FilterListIcon/>
                </IconButton>
                <Menu open={Boolean(anchorEl)} onClose={this.onExit} anchorEl={anchorEl}>
                    {map(columns, (column, index) => (
                        (column.noFilter) ? null : (
                            <MenuItem
                                key={index}
                                role="checkbox"
                                aria-checked={!includes(filteredColumns, column)}
                                onClick={this.createCheckboxChangeHandler(column)}
                            >
                                <Checkbox
                                    checked={!includes(filteredColumns, column)}
                                    onChange={this.createCheckboxChangeHandler(column)}
                                />
                                <ListItemText>{column.name}</ListItemText>
                            </MenuItem>
                        )
                    ))}
                </Menu>
            </>
        );
    }
}

interface FilterMenuProps {
    onFilter: (filterRequest: Array<ColumnData>) => void,
    columns: Array<ColumnData>
}

interface FilterMenuState {
    filteredColumns: Array<ColumnData>
    anchorEl: HTMLElement | null
}

export default FilterMenu;
