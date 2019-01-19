import * as React from 'react';
import { withStyles, Theme, Typography, WithStyles, Toolbar } from '@material-ui/core';
import TeamTableFilterButton from '@robot-analytics/routes/TableView/TeamTableFilterButton';

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

const TeamTableToolbar = withStyles(styles)(
    (props: TableToolbarProps) => (
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
                <TeamTableFilterButton columnNames={props.columnNames} onRequestFilter={props.onRequestFilter} />
            </div>
        </Toolbar>
    )
);

interface TableToolbarProps extends WithStyles<typeof styles>{
    onRequestFilter: (columnNames: Array<string>) => void
    columnNames: Array<string>
}

export default TeamTableToolbar;
