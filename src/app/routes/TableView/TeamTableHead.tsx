import * as React from 'react';
import { TableHead, TableRow, TableCell, Tooltip, TableSortLabel } from '@material-ui/core';
import { map } from 'lodash';
import { Column } from '@robot-analytics/routes/TableView/data';

class TeamTableHead extends React.Component<TeamTableHeadProps> {
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

interface TeamTableHeadProps {
    columns: Array<Column>
    onRequestSort: (event: React.MouseEvent<HTMLElement>, property: string) => void,
    order: 'asc' | 'desc'
    orderBy: string
    rowCount: number
}



export default TeamTableHead;
