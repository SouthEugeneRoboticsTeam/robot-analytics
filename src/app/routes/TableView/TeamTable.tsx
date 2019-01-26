import * as React from 'react';
import { forEach, keys, map, reduce, slice, orderBy, filter, includes } from 'lodash';
import { connect } from 'react-redux';
import { AppState } from '@robot-analytics/state/state';
import { ColumnData, RowData } from '@robot-analytics/routes/TableView/data';
import { calculations } from '@robot-analytics/data/calculations';
import CustomTable from '@robot-analytics/routes/TableView/CustomTable';

const TeamTable = connect(
    ({ teams, metrics }: AppState, { width, height }: TeamTableProps) => ({
        columns: [
            { name: 'Team Number', noFilter: true },
            { name: 'Scout Count', noFilter: true },
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
        width,
        height
    })
)(CustomTable);

interface TeamTableProps {
    width: number,
    height: number
}

export default TeamTable;
