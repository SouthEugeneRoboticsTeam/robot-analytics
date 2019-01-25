import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import TeamTable from '@robot-analytics/routes/TableView/TeamTable';
import { AutoSizer } from 'react-virtualized/dist/es/AutoSizer';
import { Paper } from '@material-ui/core';

const TableView = class extends React.Component {
    render() {
        return (
            <>
                <div style={{ flex: '0 1 auto', overflow: 'hidden' }}>
                    <Typography variant="display2">Table View</Typography>
                </div>
                <div style={{ flex: '1 1 auto' }}>
                    <AutoSizer>
                        {(metrics) => (
                            <Paper style={metrics}>
                                <TeamTable {...metrics} />
                            </Paper>
                        )}
                    </AutoSizer>
                </div>
            </>
        );
    }
};

export default TableView;
