import * as React from 'react';
import TeamTable from '@robot-analytics/routes/TableView/TeamTable';
import { AutoSizer } from 'react-virtualized/dist/es/AutoSizer';
import { Paper } from '@material-ui/core';

class TableView extends React.Component {
    render() {
        return (
            <>
                <div style={{ flex: '1 1 auto' }}>
                    <AutoSizer>
                        {({ width, height }) => (
                            <Paper style={{ width, height }}>
                                <TeamTable width={width} height={height}/>
                            </Paper>
                        )}
                    </AutoSizer>
                </div>
            </>
        );
    }
}

export default TableView;
