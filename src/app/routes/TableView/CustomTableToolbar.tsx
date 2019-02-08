import * as React from 'react';
import { Toolbar, Theme, WithStyles, createStyles, withStyles, Typography, IconButton } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
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

const CustomTableToolbar = ({
    classes,
    theme,
    title,
    columns,
    onFilter,
    filterOut,
    onExitFilterMenu,
    filterMenuAnchorEl,
    filteredColumns,
    onOpenFilterMenu,
    filterMenuCreateCheckboxChangeHandler,
    filterMenuHandleSelectAll
}: CustomTableToolbarProps) => (
    <Toolbar className={classes.root}>
        <div className={classes.title}>
            <Typography variant="title" style={{ color: theme.palette.text.secondary }}>{title}</Typography>
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
            <div>
                <IconButton
                    aria-label="Filter list"
                    aria-owns={filterMenuAnchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={onOpenFilterMenu}
                >
                    <ViewColumnIcon/>
                </IconButton>
                <FilterMenu
                    onFilter={onFilter}
                    columns={filter(columns, c => !c.noFilter)}
                    filterOut={filterOut}
                    anchorEl={filterMenuAnchorEl}
                    filteredColumns={filteredColumns}
                    onExit={onExitFilterMenu}
                    createCheckboxChangeHandler={filterMenuCreateCheckboxChangeHandler}
                    handleSelectAll={filterMenuHandleSelectAll}
                />
            </div>
        </div>
    </Toolbar>
);

interface CustomTableToolbarProps extends WithStyles<typeof styles, true> {
    title: string,
    columns: Array<ColumnData>
    onFilter: (filterRequest: Array<ColumnData>) => void
    filterOut: Array<ColumnData>
    filterMenuAnchorEl: HTMLElement | null
    filteredColumns: Array<ColumnData>
    onOpenFilterMenu: (event: React.MouseEvent<HTMLButtonElement>) => void
    onExitFilterMenu: () => void
    filterMenuCreateCheckboxChangeHandler: (column: ColumnData) => () => void
    filterMenuHandleSelectAll: () => void
}

export default compose(withStyles(styles, { withTheme: true }))(CustomTableToolbar);
