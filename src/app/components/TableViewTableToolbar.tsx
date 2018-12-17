import * as React from 'react';
import { withStyles, Theme, Typography, WithStyles, Tooltip, IconButton, Toolbar } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import DeleteIcon from '@material-ui/icons/Delete';
import classNames = require('classnames');
import { TableViewTableFilterButton } from '@robot-analytics/componentsTableViewTableFilterButton';

const styles = (theme: Theme) => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
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
            className={classNames(props.classes.root, {
                [props.classes.highlight]: props.numSelected > 0,
            })}
        >
            <div className={props.classes.title}>
                {props.numSelected > 0 ? (
                    <Typography color="inherit" variant="title">
                        {props.numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="title" id="tableTitle">
                        Teams
                    </Typography>
                )}
            </div>
            <div className={props.classes.spacer}/>
            <div className={props.classes.actions}>
                {props.numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <TableViewTableFilterButton columnNames={props.columnNames} onRequestFilter={props.onRequestFilter} />
                )}
            </div>
        </Toolbar>
    )
);

interface TableViewTableToolbarProps extends WithStyles<typeof styles>{
    numSelected: number
    onRequestFilter: (columnNames: Array<string>) => void
    columnNames: Array<string>
}
