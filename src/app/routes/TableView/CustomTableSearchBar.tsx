import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { Theme, Grow, WithStyles, IconButton, withStyles } from '@material-ui/core';

const styles = (theme: Theme) => ({
    main: {
        display: 'flex',
    },
    searchIcon: {
        color: theme.palette.text.secondary,
        marginTop: '10px',
        marginRight: '8px',
    },
    searchText: {
        flex: '0.8 0',
    },
    clearIcon: {
        '&:hover': {
            color: theme.palette.error.main,
        },
    },
});

const CustomTableSearchBar = ({ searchBarText, onSearchBarChange, onExit, classes }: CustomTableSearchBarProps) => (
    <Grow appear in={true} timeout={300}>
        <div className={classes.main}>
            <SearchIcon className={classes.searchIcon} />
            <TextField
                className={classes.searchText}
                autoFocus
                InputProps={{
                    'aria-label': 'searchBar',
                }}
                onChange={onSearchBarChange}
                fullWidth
            />
            <IconButton className={classes.clearIcon} onClick={onExit}>
                <ClearIcon />
            </IconButton>
        </div>
    </Grow>
);

interface CustomTableSearchBarProps extends WithStyles<typeof styles> {
    searchBarText: string
    onSearchBarChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onExit: () => void
}

export default withStyles(styles)(CustomTableSearchBar);