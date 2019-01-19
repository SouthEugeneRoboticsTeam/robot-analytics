import * as React from 'react';
import { withStyles, Theme, Typography, WithStyles, Toolbar } from '@material-ui/core';
import { TableViewTableFilterButton } from '@robot-analytics/components/TableViewTableFilterButton';

const styles = (theme: Theme) => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

export const TableViewTableToolbar = withStyles(styles)(
    (props: TableViewTableToolbarProps) => (
        <Toolbar
            className={props.classes.root}
        >
            <div className={props.classes.title}>
                <Typography variant="title" id="tableTitle">
                    Teams
                </Typography>
            </div>
            <div className={props.classes.spacer}/>
            <div className={props.classes.actions}>
                <TableViewTableFilterButton columnNames={props.columnNames} onRequestFilter={props.onRequestFilter} />
            </div>
        </Toolbar>
    )
);

interface TableViewTableToolbarProps extends WithStyles<typeof styles>{
    onRequestFilter: (columnNames: Array<string>) => void
    columnNames: Array<string>
}
