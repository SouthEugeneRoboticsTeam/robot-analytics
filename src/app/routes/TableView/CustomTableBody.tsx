import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { ColumnData, RowData } from '@robot-analytics/routes/TableView/data';
import classNames = require('classnames');
import { MultiGrid, GridCellProps } from 'react-virtualized';
import { createStyles, Theme } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import { TableSortLabel } from '@material-ui/core';
import { orderBy } from 'lodash';

const styles = (theme: Theme) => createStyles({
    root: { width: '100%', height: '100%' },
    cell: {
        flex: 1,
        background: 'transparent'
    },
    grid: {
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.fontSize
    },
    fixedGrid: {
        background: 'whitesmoke'
    },
    topLeftGrid: {
        borderRight: '1px solid grey',
        borderBottom: '1px solid grey'
    },
    bottomLeftGrid: {
        borderRight: '1px solid grey'
    },
    topRightGrid: {
        borderBottom: '1px solid grey'
    },
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    }
});

const CustomTableBody = ({
     classes,
     width,
     height,
     rowHeight,
     columns,
     rows,
     sortBy,
     sortDirection,
     fixedColumnCount,
     onSort
}: CustomTableProps) => {
    const sortedRows = sortBy ? orderBy(rows, [sortBy], [sortDirection]) : rows;
    return (
        <MultiGrid
            cellRenderer={({ style, rowIndex, columnIndex }: GridCellProps) => {
                return (
                    <TableCell
                        component="div"
                        style={style}
                        className={classNames(classes.cell, classes.flexContainer)}
                        variant={rowIndex !== 0 ? 'body' : 'head'}
                        key={`${columnIndex}.${rowIndex}`}
                    >
                        {(rowIndex === 0) ? (
                            <TableSortLabel
                                active={columns[columnIndex].name === sortBy}
                                direction={sortDirection}
                                onClick={() => onSort(columns[columnIndex].name)}
                            >
                                {columns[columnIndex].name}
                            </TableSortLabel>
                        ) : (
                            ((data: any) => {
                                if (typeof data === 'string' && data.length > 50) {
                                    return data.substring(0, 47) + '...';
                                } else {
                                    return data;
                                }
                            })(sortedRows[rowIndex - 1][columns[columnIndex].name])
                        )}
                    </TableCell>
                );
            }}
            rowCount={rows.length + 1}
            rowHeight={rowHeight}
            height={height}
            width={width}
            columnCount={columns.length}
            columnWidth={({ index }) => index < fixedColumnCount ? 120 : 200}
            fixedColumnCount={fixedColumnCount}
            fixedRowCount={1}
            classNameTopLeftGrid={classNames(classes.grid, classes.topLeftGrid, classes.fixedGrid)}
            classNameBottomLeftGrid={classNames(classes.grid, classes.bottomLeftGrid, classes.fixedGrid)}
            classNameTopRightGrid={classNames(classes.grid, classes.topRightGrid, classes.fixedGrid)}
            classNameBottomRightGrid={classes.grid}
            sortBy={sortBy}
            sortDirection={sortDirection}
            overscanColumnCount={3}
            overscanRowCount={5}
        />
    )
};

interface CustomTableProps extends WithStyles<typeof styles> {
    columns: Array<ColumnData>
    rows: Array<RowData>
    fixedColumnCount: number
    rowHeight: number
    width: number
    height: number
    sortBy: string
    sortDirection: 'asc' | 'desc',
    onSort: (sortRequest: string | null) => void
}

export default withStyles(styles)(CustomTableBody)
