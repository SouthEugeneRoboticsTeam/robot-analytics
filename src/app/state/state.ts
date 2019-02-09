import { DeepReadonly } from 'utility-types';
import { Teams } from '../data/team';
import { Metrics } from '@robot-analytics/data/metric';
import { ColumnData, RowData } from '@robot-analytics/routes/TableView/data';

export type AppState = DeepReadonly<{
    teams: Teams,
    metrics: Metrics
    teamTable: TeamTableState
}>;

export type TeamTableState = {
     columns: Array<ColumnData>
     rows: Array<RowData>
     filterOut: Array<ColumnData>
};
