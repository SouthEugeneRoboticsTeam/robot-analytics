import * as React from 'react';
import CustomTableBody from '@robot-analytics/routes/TableView/CustomTableBody';
import { ColumnData, RowData } from '@robot-analytics/routes/TableView/data';
import CustomTableToolbar from '@robot-analytics/routes/TableView/CustomTableToolbar';
import Typography from '@robot-analytics/routes/TableView/index';
import { AutoSizer } from 'react-virtualized';

class CustomTable extends React.Component<CustomTableProps, CustomTableState> {
    state: CustomTableState = {
        sortBy: null,
        sortDirection: 'asc'
    };

    onSort = (sortRequest: string | null) => {
        const { sortBy, sortDirection } = this.state;
        if (sortRequest !== sortBy) {
            this.setState({ sortBy: sortRequest })
        } else {
            this.setState({ sortDirection: sortDirection === 'asc' ? 'desc' : 'asc' })
        }
    };

    render() {
        const { columns, rows, width, height } = this.props;
        const { sortDirection, sortBy } = this.state;
        return (
            <div style={{ display: 'flex', flexFlow: 'column', width, height }}>
                <div style={{ flex: '0 1 auto', display: 'flex', width }}>
                    <CustomTableToolbar title="Team Graph" />
                </div>
                <div style={{ flex: '1 1 auto', display: 'flex' }}>
                    <AutoSizer>
                        {({ width, height }) => (
                            <CustomTableBody
                                columns={columns}
                                rows={rows}
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
    rows: Array<RowData>,
    columns: Array<ColumnData>,
    width: number,
    height: number
}

interface CustomTableState {
    sortBy: string | null,
    sortDirection: 'asc' | 'desc'
}

export default CustomTable;
