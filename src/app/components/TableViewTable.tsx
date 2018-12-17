import * as React from 'react';
import { Teams } from '@robot-analytics/datateam';
import { CalculationSetting } from '@robot-analytics/routesTableView';
import { forEach, keys, map, reduce, slice, orderBy, filter } from 'lodash';
import { calculations } from '@robot-analytics/datacalculations';
import { createStyles, Table, Theme, withStyles, WithStyles, Paper, TableBody, TableRow, TableCell, Checkbox,
    TablePagination } from '@material-ui/core';
import { connect } from 'react-redux';
import { AppState } from '@robot-analytics/statestate';
import { compose } from 'redux';
import { Column, TableViewTableHead } from '@robot-analytics/componentsTableViewTableHead';
import { Metrics, ScoutMetricType } from '@robot-analytics/datametric';
import { min } from 'mathjs';
import { TableViewTableToolbar } from '@robot-analytics/componentsTableViewTableToolbar';

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto'
    }
});

export const TableViewTable = compose(
    connect(
        (state: AppState, ownProps: TableConnectProps) => ({
            teams: state.teams,
            metrics: state.metrics,
            ...ownProps
        })
    ),
    withStyles(styles)
)(
    class extends React.Component<TableViewTableProps, TableViewTableState> {
        state: TableViewTableState = {
            columns: [
                { name: 'Team Number', numeric: true, disablePadding: false }
            ],
            data: [],
            order: 'asc',
            orderProperty: 'Team Number',
            selected: [],
            page: 0,
            rowsPerPage: 5,
            filterColumns: []
        };

        handleRequestSort = (event: React.MouseEvent<HTMLElement>, property: string) => {
            this.setState({
                order: this.state.orderProperty === property && this.state.order === 'asc' ? 'desc' : 'asc',
                orderProperty: property
            });
        };

        handleRequestFilter = (columnNames: Array<string>) => {
            this.setState({ filterColumns: columnNames })
        };

        handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.checked) {
                this.setState(state => ({ selected: state.data.map(n => n['']) }));
                return;
            }
            this.setState({ selected: [] });
        };

        handleChangePage = (event: React.MouseEvent<HTMLButtonElement>, page: number) => {
            this.setState({ page });
        };

        handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (typeof event.target.value === 'number') {
                this.setState({ rowsPerPage: event.target.value });
            }
        };

        componentWillMount() {
            this.setState({
                columns: [
                    ...this.state.columns,
                    ...reduce(this.props.metrics, (acc: Array<Column>, metric, metricName) => {
                        forEach(calculations, (calculation, calculationName) => {
                            if (calculation.inputTypes.indexOf(metric.type) !== -1) {
                                acc.push({
                                    name: `${metricName} (${calculationName})`,
                                    numeric: calculation.outputType === ScoutMetricType.NUMBER,
                                    disablePadding: false
                                })
                            }
                        });
                        return acc;
                    }, [])
                ],
                data: map(this.props.teams, (team, teamNumber) => (
                    {
                        ['Team Number']: parseInt(teamNumber),
                        ...reduce(this.props.metrics, (row: Row, metric, metricName) => {
                            forEach(calculations, (calculation, calculationName) => {
                                if (calculation.inputTypes.indexOf(metric.type) !== -1) {
                                    row[`${metricName} (${calculationName})`] = calculation.invoke(
                                        ...map(team.scouts, scout => (
                                            scout.metrics[metricName]
                                        ))
                                    ).value
                                }
                            });
                            return row;
                        }, {})
                    }
                )),
            })
        };

        componentWillReceiveProps(nextProps: Readonly<TableViewTableProps>) {
            this.setState({
                columns: [
                    ...this.state.columns,
                    ...reduce(nextProps.metrics, (acc: Array<Column>, metric, metricName) => {
                        forEach(calculations, (calculation, calculationName) => {
                            if (calculation.inputTypes.indexOf(metric.type) !== -1) {
                                acc.push({
                                    name: `${metricName} (${calculationName})`,
                                    numeric: calculation.outputType === ScoutMetricType.NUMBER,
                                    disablePadding: false
                                })
                            }
                        });
                        return acc;
                    }, [])
                ],
                data: map(nextProps.teams, (team, teamNumber) => (
                    {
                        ['Team Number']: parseInt(teamNumber),
                        ...reduce(nextProps.metrics, (row: Row, metric, metricName) => {
                            forEach(calculations, (calculation, calculationName) => {
                                if (calculation.inputTypes.indexOf(metric.type) !== -1) {
                                    row[`${metricName} (${calculationName})`] = calculation.invoke(
                                        ...map(team.scouts, scout => (
                                            scout.metrics[metricName]
                                        ))
                                    ).value
                                }
                            });
                            return row;
                        }, {})
                    }
                )),
            })
        }

        render() {
            const { classes } = this.props;
            const { data, columns, selected, order, orderProperty, page, rowsPerPage, filterColumns } = this.state;
            const emptyRows = rowsPerPage - min(rowsPerPage, data.length - page * rowsPerPage);
            return (
                <Paper className={classes.root}>
                    <TableViewTableToolbar
                        numSelected={selected.length}
                        onRequestFilter={this.handleRequestFilter}
                        columnNames={map(columns, column => column.name)}
                    />
                    <div className={classes.tableWrapper}>
                        <Table>
                            <TableViewTableHead
                                columns={filter(columns, column => filterColumns.indexOf(column.name) === -1 || column.name === 'Team Number')}
                                numSelected={selected.length}
                                onRequestSort={this.handleRequestSort}
                                onSelectAllClick={this.handleSelectAllClick}
                                order={order}
                                orderBy={orderProperty}
                                rowCount={data.length}
                            />
                            <TableBody>
                                {map(slice(orderBy(data, [orderProperty], [order]), page * rowsPerPage, page * rowsPerPage + rowsPerPage), row => {
                                    //const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            //onClick={event => this.handleClick(event, n.id)}
                                            role="checkbox"
                                            //aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            //selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox /*checked={isSelected}*/ />
                                            </TableCell>
                                            {map(
                                                filter(row, (cell, cellName) => (
                                                    filterColumns.indexOf(cellName) === -1 || cellName === 'Team Number'
                                                )), cell => (
                                                <TableCell numeric={typeof cell === 'number'}>
                                                    {cell}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    )
                                })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 49 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
            )
        }
    }
);

interface TableConnectProps {
    settings: Array<CalculationSetting>
}

interface TableViewTableProps extends TableConnectProps, WithStyles<typeof styles> {
    teams: Teams,
    metrics: Metrics
}

interface TableViewTableState {
    columns: Array<Column>,
    data: Array<Row>,
    order: 'asc' | 'desc',
    orderProperty: string,
    selected: Array<string | number>,
    filterColumns: Array<string>
    page: number,
    rowsPerPage: number
}

interface Row {
    [columnName: string]: string | number
}
