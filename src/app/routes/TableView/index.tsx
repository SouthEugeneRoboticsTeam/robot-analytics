import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import TeamTable from '@robot-analytics/routes/TableView/TeamTable';

const TableView = class extends React.Component {
    render() {
        return (
            <div>
                <Typography variant="display2">Table View</Typography>
                <TeamTable />
            </div>
        );
    }
};

export default TableView;
