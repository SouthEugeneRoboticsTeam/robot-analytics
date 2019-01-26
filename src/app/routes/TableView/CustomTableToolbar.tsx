import * as React from 'react';
import { Toolbar, Theme, WithStyles, createStyles, withStyles, Typography } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { compose } from 'redux';
import { ColumnData } from '@robot-analytics/routes/TableView/data';
import FilterMenu from '@robot-analytics/routes/TableView/FilterMenu';
import { filter } from 'lodash';

const styles = (theme: Theme) => createStyles({
    root: {
        paddingRight: theme.spacing.unit,
        width: '100%',
        backgroundColor: 'whitesmoke',
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
        color: theme.palette.text.secondary
    },
    title: {
        flex: '0 0 auto'
    }
});

const CustomTableToolbar = ({ classes, theme, title, columns, onFilter }: CustomTableToolbarProps) => (
    <Toolbar className={classes.root}>
        <div className={classes.title}>
            <Typography variant="title" style={{ color: theme.palette.text.secondary }}>{title}</Typography>
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
            <FilterMenu onFilter={onFilter} columns={filter(columns, c => !c.noFilter)} />
        </div>
    </Toolbar>
);

interface CustomTableToolbarProps extends WithStyles<typeof styles, true> {
    title: string,
    columns: Array<ColumnData>
    onFilter: (filterRequest: Array<ColumnData>) => void
}

export default compose(withStyles(styles, { withTheme: true }))(CustomTableToolbar);
