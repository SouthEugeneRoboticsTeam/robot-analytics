import * as React from 'react';
import { forEach, keys, map, reduce, slice, orderBy, filter, includes } from 'lodash';
import { createStyles, Theme, withStyles, WithStyles, TableCell, TableSortLabel } from '@material-ui/core';
import { connect } from 'react-redux';
import { AppState } from '@robot-analytics/state/state';
import { compose } from 'redux';
import { ColumnData, RowData } from '@robot-analytics/routes/TableView/data';
import { MultiGrid, GridCellProps } from 'react-virtualized';
import classNames = require('classnames');
import { calculations } from '@robot-analytics/data/calculations';

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

const TeamTable = compose(
    connect(
        ({ teams, metrics }: AppState, ownProps: TeamTableOwnProps) => ({
            columns: [
                { name: 'Team Number' },
                { name: 'Scout Count' },
                ...reduce(metrics, (acc: Array<ColumnData>, metric, metricName) => {
                    forEach(calculations, (calculation, calculationName) => {
                        if (calculation.inputTypes.indexOf(metric.type) !== -1) {
                            acc.push({ name: `${metricName} (${calculationName})` })
                        }
                    });
                    return acc;
                }, [])
            ],
            rows: map(teams, (team, teamNumber) => ({
                'Team Number': parseInt(teamNumber),
                'Scout Count': keys(team.scouts).length,
                ...reduce(metrics, (row: RowData, metric, metricName) => {
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
            })),
            fixedColumnCount: 2,
            rowHeight: 56,
            ...ownProps
        })
    ),
    withStyles(styles)
)(
    class extends React.Component<TeamTableProps, TeamTableState> {
        state: TeamTableState = {
            sortDirection: 'asc',
            sortBy: 'Team Number',
        };

        sortedRows = orderBy(this.props.rows, [this.state.sortBy], [this.state.sortDirection]);

        limitCharacters = (data: any) => {
            if (typeof data === 'string' && data.length > 50) {
                return data.substring(0, 47) + '...';
            } else {
                return data;
            }
        };

        cellRenderer = ({ style, rowIndex, columnIndex }: GridCellProps) => {
            const { classes, columns } = this.props;
            const { sortBy, sortDirection } = this.state;
            return (
                <TableCell
                    component="div"
                    style={style}
                    className={classNames(classes.cell, classes.flexContainer)}
                    variant="head"
                    key={`${columnIndex}.${rowIndex}`}
                >
                    {(rowIndex === 0) ? (
                        <TableSortLabel
                            active={columns[columnIndex].name === sortBy}
                            direction={sortDirection}
                            onClick={() => {
                                if (columns[columnIndex].name === sortBy) {
                                    this.setState({
                                        sortDirection: sortDirection === 'asc' ? 'desc' : 'asc'
                                    })
                                } else {
                                    this.setState({
                                        sortBy: columns[columnIndex].name,
                                        sortDirection: 'asc'
                                    })
                                }
                            }}
                        >
                            {columns[columnIndex].name}
                        </TableSortLabel>
                    ) : (
                        this.limitCharacters(this.sortedRows[rowIndex - 1][columns[columnIndex].name])
                    )}
                </TableCell>
            );
        };

        componentWillUpdate(nextProps: Readonly<TeamTableProps>, nextState: Readonly<TeamTableState>) {
            this.sortedRows = orderBy(nextProps.rows, [nextState.sortBy], [nextState.sortDirection])
        }

        render() {
            const { classes, columns, rows, rowHeight, fixedColumnCount, width, height } = this.props;
            const { sortBy, sortDirection } = this.state;
            console.log("Table is rendering");
            return (
                <MultiGrid
                    cellRenderer={this.cellRenderer}
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
            );
        }
    }
);

interface TeamTableProps extends WithStyles<typeof styles> {
    columns: Array<ColumnData>
    rows: Array<RowData>
    fixedColumnCount: number
    rowHeight: number,
    width: number,
    height: number
}

interface TeamTableOwnProps {
    width: number,
    height: number
}

interface TeamTableState {
    sortBy: string,
    sortDirection: 'asc' | 'desc',
}

export default TeamTable;
