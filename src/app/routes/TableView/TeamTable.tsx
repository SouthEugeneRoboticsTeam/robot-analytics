import * as React from 'react';
import { Teams } from '@robot-analytics/data/team';
import { forEach, keys, map, reduce, slice, orderBy, filter, includes } from 'lodash';
import { calculations } from '@robot-analytics/data/calculations';
import { createStyles, Table, Theme, withStyles, WithStyles, Paper, TableBody, TableRow, TableCell,
    TablePagination } from '@material-ui/core';
import { connect } from 'react-redux';
import { AppState } from '@robot-analytics/state/state';
import { compose } from 'redux';
import TeamTableHead from '@robot-analytics/routes/TableView/TeamTableHead';
import { Column } from '@robot-analytics/routes/TableView/data';
import { Metrics, ScoutMetricType } from '@robot-analytics/data/metric';
import { min } from 'mathjs';
import TeamTableToolbar from '@robot-analytics/routes/TableView/TeamTableToolbar';
import { Row } from '@robot-analytics/routes/TableView/data';

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

const TeamTable = compose(
    connect(
        (state: AppState) => ({
            teams: state.teams,
            metrics: state.metrics
        })
    ),
    withStyles(styles)
)(
    class extends React.Component<TeamTableProps, TeamTableState> {
        state: TeamTableState = {
            columns: [
                { name: 'Team number', numeric: true, disablePadding: false },
                { name: 'Scout count', numeric: true, disablePadding: false }
            ],
            data: [],
            order: 'asc',
            orderProperty: 'Team number',
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
                        ['Team number']: parseInt(teamNumber),
                        ['Scout count']: keys(team.scouts).length,
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

        componentWillReceiveProps(nextProps: Readonly<TeamTableProps>) {
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
                        ['Team number']: parseInt(teamNumber),
                        ['Scout count']: keys(team.scouts).length,
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
            const { data, columns, order, orderProperty, page, rowsPerPage, filterColumns } = this.state;
            const emptyRows = rowsPerPage - min(rowsPerPage, data.length - page * rowsPerPage);
            return (
                <Paper className={classes.root}>
                    <TeamTableToolbar
                        onRequestFilter={this.handleRequestFilter}
                        columnNames={map(columns, column => column.name)}
                    />
                    <div className={classes.tableWrapper}>
                        <Table>
                            <TeamTableHead
                                columns={filter(columns, column => filterColumns.indexOf(column.name) === -1 || column.name === 'Team Number')}
                                onRequestSort={this.handleRequestSort}
                                order={order}
                                orderBy={orderProperty}
                                rowCount={data.length}
                            />
                            <TableBody>
                                {map(slice(orderBy(data, [orderProperty], [order]), page * rowsPerPage, page * rowsPerPage + rowsPerPage), row => {
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row['Team number']}
                                        >
                                            {map(
                                                filter(row, (cell, cellName) => (
                                                    filterColumns.indexOf(cellName) === -1 || cellName === 'Team number'
                                                )), (cell, cellName) => (
                                                <TableCell numeric={typeof cell === 'number'} key={`${row['Team number']}-${cellName}`}>
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

interface TeamTableProps extends WithStyles<typeof styles> {
    teams: Teams,
    metrics: Metrics
}

interface TeamTableState {
    columns: Array<Column>,
    data: Array<Row>,
    order: 'asc' | 'desc',
    orderProperty: string,
    filterColumns: Array<string>
    page: number,
    rowsPerPage: number
}

export default TeamTable;
