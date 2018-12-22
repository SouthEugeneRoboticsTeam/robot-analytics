import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { TableViewTable } from '@robot-analytics/componentsTableViewTable';

export const TableView = class extends React.Component<{}, TableViewState> {
    state: TableViewState = {
        gameName: '',
        calculationSettings: []
    };

    render() {
        const { calculationSettings } = this.state;
        return (
            <div>
                <Typography variant="display2">Table View</Typography>
                <TableViewTable settings={calculationSettings}/>
            </div>
        );
    }
};

interface TableViewState {
    gameName: string
    calculationSettings: Array<CalculationSetting>
}

export interface CalculationSetting {
    metricName: string,
    calculationName: string
}
