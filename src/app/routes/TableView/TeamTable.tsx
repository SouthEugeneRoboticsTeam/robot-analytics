import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '@robot-analytics/state/state';
import { ColumnData, RowData } from '@robot-analytics/routes/TableView/data';
import CustomTable from '@robot-analytics/routes/TableView/CustomTable';
import { setTeamTableFilterOut } from '@robot-analytics/state/actions';

const TeamTable = connect(
    ({ teams, metrics, teamTable }: AppState, { width, height }: TeamTableProps) => ({
        columns: teamTable.columns as Array<ColumnData>,
        rows: teamTable.rows as Array<RowData>,
        width,
        height,
        filterOut: teamTable.filterOut as Array<ColumnData>,
        title: "Teams"
    }),
    dispatch => ({
        onFilter: (filterRequest: Array<ColumnData>) => dispatch(setTeamTableFilterOut(filterRequest))
    })
)(CustomTable);

interface TeamTableProps {
    width: number,
    height: number
}

export default TeamTable;
