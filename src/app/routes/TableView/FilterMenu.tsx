import * as React from 'react';
import { ColumnData } from '@robot-analytics/routes/TableView/data';
import { map, includes, filter } from 'lodash';
import { IconButton, Checkbox, Popover, FormControlLabel, FormControl, FormGroup, WithStyles, withStyles,
    Theme, createStyles, Typography, Divider } from '@material-ui/core';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';

const styles = (theme: Theme) => createStyles({
    root: {
        padding: '16px 24px 16px 24px',
        fontFamily: 'Roboto',
    },
    title: {
        marginLeft: 8,
        fontSize: 14,
        color: theme.palette.text.secondary,
        textAlign: 'left',
        fontWeight: 500,
    },
    formGroup: {
        marginTop: 8,
    },
    formControl: {},
    checkbox: {
        padding: 0,
        width: 32,
        height: 32,
    },
    label: {
        fontSize: 15,
        marginLeft: 8,
        color: theme.palette.text.primary,
    }
});

class FilterMenu extends React.Component<FilterMenuProps, FilterMenuState> {
    state: FilterMenuState = {
        anchorEl: null,
        filteredColumns: []
    };

    onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.columns.length > 1) {
            this.setState({ anchorEl: event.currentTarget })
        }
    };

    onExit = () => {
        this.setState({ anchorEl: null });
        this.props.onFilter(this.state.filteredColumns)
    };

    createCheckboxChangeHandler = (column: ColumnData) => () => {
        this.setState({
            filteredColumns: (filteredColumns => {
                switch (filteredColumns.indexOf(column)) {
                    case -1:
                        return [...filteredColumns, column];
                    default:
                        return filter(filteredColumns, c => c !== column)
                }
            })(this.state.filteredColumns)
        });
    };

    handleSelectAll = () => {
        this.setState({
            filteredColumns: this.state.filteredColumns.length === 0 ? this.props.columns : []
        });
    };

    componentWillReceiveProps(nextProps: Readonly<FilterMenuProps>, nextContext: any): void {
        this.setState({ filteredColumns: nextProps.filterOut })
    }

    render() {
        const { columns, classes } = this.props;
        const { anchorEl, filteredColumns } = this.state;
        return (
            <>
                <IconButton
                    aria-label="Filter list"
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.onClick}
                >
                    <ViewColumnIcon/>
                </IconButton>
                <Popover open={Boolean(anchorEl)} onClose={this.onExit} anchorEl={anchorEl}>
                    <FormControl className={classes.root}>
                        <Typography variant="caption" className={classes.title}>
                            Select columns
                        </Typography>
                        <FormGroup className={classes.formGroup}>
                            <FormControlLabel
                                classes={{
                                    root: classes.label
                                }}
                                label="Select all"
                                control={<Checkbox
                                    className={classes.checkbox}
                                    checked={filteredColumns.length === 0}
                                    onChange={this.handleSelectAll}
                                    indeterminate={filteredColumns.length > 0 && filteredColumns.length < columns.length}
                                />}
                            />
                        </FormGroup>
                        <Divider/>
                        <FormGroup className={classes.formGroup}>
                            {map(columns, (column, index) => (
                                <FormControlLabel
                                    key={index}
                                    label={column.name}
                                    className={classes.label}
                                    control={<Checkbox
                                        className={classes.checkbox}
                                        checked={!includes(filteredColumns, column)}
                                        onChange={this.createCheckboxChangeHandler(column)}
                                    />}
                                />
                            ))}
                        </FormGroup>
                    </FormControl>
                </Popover>
            </>
        );
    }
}

interface FilterMenuProps extends WithStyles<typeof styles> {
    onFilter: (filterRequest: Array<ColumnData>) => void,
    columns: Array<ColumnData>
    filterOut: Array<ColumnData>
}

interface FilterMenuState {
    filteredColumns: Array<ColumnData>
    anchorEl: HTMLElement | null
}

export default withStyles(styles)(FilterMenu);
