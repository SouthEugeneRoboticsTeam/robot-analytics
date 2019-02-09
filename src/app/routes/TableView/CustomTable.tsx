import * as React from 'react';
import CustomTableBody from '@robot-analytics/routes/TableView/CustomTableBody';
import { ColumnData, RowData } from '@robot-analytics/routes/TableView/data';
import CustomTableToolbar from '@robot-analytics/routes/TableView/CustomTableToolbar';
import { AutoSizer } from 'react-virtualized';
import { includes, filter } from 'lodash';
import { filterRows } from '@robot-analytics/routes/TableView/filtering';

class CustomTable extends React.Component<CustomTableProps, CustomTableState> {
    state: CustomTableState = {
        sortBy: null,
        sortDirection: 'asc',
        filterMenuAnchorEl: null,
        filteredColumns: [],
        searchOn: false,
        searchBarText: ''
    };

    onSort = (sortRequest: string | null) => {
        const { sortBy, sortDirection } = this.state;
        if (sortRequest !== sortBy) {
            this.setState({ sortBy: sortRequest })
        } else {
            this.setState({ sortDirection: sortDirection === 'asc' ? 'desc' : 'asc' })
        }
    };

    filterMenuCreateCheckboxChangeHandler = (column: ColumnData) => () => {
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

    setSearchOn = (searchOn: boolean) => {
        this.setState({ searchOn, searchBarText: '' })
    };

    componentWillReceiveProps(nextProps: Readonly<CustomTableProps>, nextContext: any): void {
        this.setState({ filteredColumns: nextProps.filterOut })
    }

    filterMenuHandleSelectAll = () => {
        this.setState({
            filteredColumns: this.state.filteredColumns.length === 0 ? filter(this.props.columns, c => !c.noFilter) : []
        });
    };

    onOpenFilterMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({ filterMenuAnchorEl: event.currentTarget });
    };

    onExitFilterMenu = () => {
        this.setState({ filterMenuAnchorEl: null });
        this.props.onFilter(this.state.filteredColumns);
    };

    onSearchBarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchBarText: event.currentTarget.value });
    };

    render() {
        const { columns, rows, width, height, title, onFilter, filterOut } = this.props;
        const { sortDirection, sortBy, filterMenuAnchorEl, filteredColumns, searchOn, searchBarText } = this.state;
        return (
            <div style={{ display: 'flex', flexFlow: 'column', width, height }}>
                <div style={{ flex: '0 1 auto', display: 'flex', width }}>
                    <CustomTableToolbar
                        title={title}
                        onFilter={onFilter}
                        columns={columns}
                        filterOut={filterOut}
                        filterMenuAnchorEl={filterMenuAnchorEl}
                        filteredColumns={filteredColumns}
                        onOpenFilterMenu={this.onOpenFilterMenu}
                        onExitFilterMenu={this.onExitFilterMenu}
                        filterMenuCreateCheckboxChangeHandler={this.filterMenuCreateCheckboxChangeHandler}
                        filterMenuHandleSelectAll={this.filterMenuHandleSelectAll}
                        searchOn={searchOn}
                        setSearchOn={this.setSearchOn}
                        searchBarText={searchBarText}
                        onSearchBarChange={this.onSearchBarChange}
                    />
                </div>
                <div style={{ flex: '1 1 auto', display: 'flex' }}>
                    <AutoSizer>
                        {({ width, height }) => (
                            <CustomTableBody
                                columns={filter(columns, c => !includes(filterOut, c))}
                                rows={filterRows(rows)}
                                sortBy={sortBy}
                                sortDirection={sortDirection}
                                rowHeight={56}
                                fixedColumnCount={2}
                                width={width}
                                height={height}
                                onSort={this.onSort}
                            />
                        )}
                    </AutoSizer>
                </div>
            </div>
        );
    }
}

interface CustomTableProps {
    rows: Array<RowData>
    columns: Array<ColumnData>
    width: number
    height: number
    title: string
    filterOut: Array<ColumnData>
    onFilter: (filterRequest: Array<ColumnData>) => void
}

interface CustomTableState {
    sortBy: string | null
    sortDirection: 'asc' | 'desc'
    filterMenuAnchorEl: HTMLElement | null
    filteredColumns: Array<ColumnData>
    searchOn: boolean
    searchBarText: string
}

export default CustomTable;
