import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import TeamTable from '@robot-analytics/routes/TableView/TeamTable';

const TableView = class extends React.Component {
    render() {
        return (
            <>
                <div style={{ flex: '0 1 auto', border: '1px solid red', overflow: 'hidden' }}>
                    <Typography variant="display2">Table View</Typography>
                </div>
                <div style={{ flex: '1 1 auto', border: '1px solid blue' }}>
                    <TeamTable />
                </div>
            </>
        );
    }
};

export default TableView;
