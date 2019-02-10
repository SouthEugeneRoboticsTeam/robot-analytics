import * as React from 'react';
import { ColumnData } from '@robot-analytics/routes/TableView/data';
import { map, includes } from 'lodash';
import { Checkbox, Popover, FormControlLabel, FormControl, FormGroup, WithStyles, withStyles,
    Theme, createStyles, Typography, Divider } from '@material-ui/core';

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

class FilterMenu extends React.Component<FilterMenuProps> {


    render() {
        const { columns, classes, anchorEl, filteredColumns, onExit, createCheckboxChangeHandler, handleSelectAll } = this.props;
        return (
            <Popover open={Boolean(anchorEl)} onClose={onExit} anchorEl={anchorEl}>
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
                                onChange={handleSelectAll}
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
                                    onChange={createCheckboxChangeHandler(column)}
                                />}
                            />
                        ))}
                    </FormGroup>
                </FormControl>
            </Popover>
        );
    }
}

interface FilterMenuProps extends WithStyles<typeof styles> {
    onFilter: (filterRequest: Array<ColumnData>) => void,
    columns: Array<ColumnData>
    filterOut: Array<ColumnData>
    filteredColumns: Array<ColumnData>
    anchorEl: HTMLElement | null
    onExit: () => void
    createCheckboxChangeHandler: (column: ColumnData) => () => void
    handleSelectAll: () => void
}

export default withStyles(styles)(FilterMenu);
