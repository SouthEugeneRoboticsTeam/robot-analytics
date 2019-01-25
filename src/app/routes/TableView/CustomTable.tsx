import * as React from 'react';
import CustomTableBody from '@robot-analytics/routes/TableView/CustomTableBody';
import { ColumnData, RowData } from '@robot-analytics/routes/TableView/data';

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
            <div>
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
