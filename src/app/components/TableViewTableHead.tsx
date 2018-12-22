import * as React from 'react';
import { TableHead, TableRow, TableCell, Tooltip, TableSortLabel } from '@material-ui/core';
import { map } from 'lodash';

export class TableViewTableHead extends React.Component<TableViewTableHeadProps> {
    createSortHandler = (property: string) => (event: React.MouseEvent<HTMLElement>) => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { columns, order, orderBy } = this.props;
        return (
            <TableHead>
                <TableRow>
                    {map(columns, column => (
                        <TableCell
                            key={column.name}
                            numeric={column.numeric}
                            padding={column.disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === column.name ? order : false}
                        >
                            <Tooltip
                                title="Sort"
                                placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                enterDelay={300}
                            >
                                <TableSortLabel
                                    active={orderBy === column.name}
                                    direction={order}
                                    onClick={this.createSortHandler(column.name)}
                                >
                                    {column.name}
                                </TableSortLabel>
                            </Tooltip>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }
}

interface TableViewTableHeadProps {
    columns: Array<Column>
    onRequestSort: (event: React.MouseEvent<HTMLElement>, property: string) => void,
    order: 'asc' | 'desc'
    orderBy: string
    rowCount: number
}

export interface Column {
    name: string,
    numeric: boolean,
    disablePadding: boolean
}
