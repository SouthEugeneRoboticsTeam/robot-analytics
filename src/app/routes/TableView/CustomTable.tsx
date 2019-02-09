import * as React from 'react';
import CustomTableBody from '@robot-analytics/routes/TableView/CustomTableBody';
import { ColumnData, RowData } from '@robot-analytics/routes/TableView/data';
import CustomTableToolbar from '@robot-analytics/routes/TableView/CustomTableToolbar';
import { AutoSizer } from 'react-virtualized';
import { includes, filter, forEach } from 'lodash';

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

    parseSearchBar = (searchBarText: string) => {
        let token: string = '';
        let first: string | number = '';
        let operator: string = '';
        let second: string | number = '';
        let result: any = {};
        let didSetTeamNumber = false;
        let afterOperator = false;
        let inQuotes = false;
        forEach(searchBarText, char => {
            switch (char) {
                case '"': {
                    inQuotes = !inQuotes;
                    break;
                }
                // TODO fix broken > and < operators; cannot end on these, which causes borkage
                case '!':
                case '>':
                case '<': {
                    if (inQuotes) token += char;
                    else if (!afterOperator) operator += char;
                    break;
                }
                case '-':
                case '=': {
                    if (inQuotes) token += char;
                    else {
                        afterOperator = true;
                        operator += char;
                        first = token;
                        token = '';
                    }
                    break;
                }
                case ',': {
                    if (inQuotes) token += char;
                    else {
                        if (!afterOperator) {
                            first = token;
                            token = '';
                            result['Team Number'] = ['<-', first];
                            didSetTeamNumber = true;
                        } else {
                            second = token;
                            token = '';
                            result[first] = [operator, second];
                        }
                        first = '';
                        operator = '';
                        second = '';
                        afterOperator = false;
                    }
                    break;
                }
                case ' ': {
                    if (inQuotes) token += char;
                    break;
                }
                default: {
                    token += char;
                }
            }
        });
        if (!afterOperator) {
            if (!didSetTeamNumber){
                first = token;
                result['Team Number'] = ['<-', first];
            }
        } else {
            second = token;
            result[first] = [operator, second]
        }
        return result;
    };

    filterRows = (rows: Array<RowData>): Array<RowData> => {
        const filterOptions = this.parseSearchBar(this.state.searchBarText);
        return filter(rows, row => {
            let shouldInclude = false;
            forEach(filterOptions, (value, key) => {
                if (row[key] !== undefined) {
                    switch (filterOptions[key][0]) {
                        case '=': {
                            shouldInclude = row[key] === parseFloat(filterOptions[key][1]);
                            break;
                        }
                        case '!=': {
                            shouldInclude = row[key] !== parseFloat(filterOptions[key][1]);
                            break;
                        }
                        case '>': {
                            shouldInclude = row[key] > parseFloat(filterOptions[key][1]);
                            break;
                        }
                        case '<': {
                            shouldInclude = row[key] < parseFloat(filterOptions[key][1]);
                            break;
                        }
                        case '>=': {
                            shouldInclude = row[key] >= parseFloat(filterOptions[key][1]);
                            break;
                        }
                        case '<=': {
                            shouldInclude = row[key] <= parseFloat(filterOptions[key][1]);
                            break;
                        }
                        case '<-': {
                            shouldInclude = includes(`${row[key]}`, filterOptions[key][1]);
                            break;
                        }
                    }
                }
            });
            return shouldInclude;
        })
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
                                rows={this.filterRows(rows)}
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
