import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1976d2',
            light: '#63a4ff',
            dark: '#004ba0',
            contrastText: '#fff'
        },
        secondary: {
            main: '#d81b60',
            light: '#ff5c8d',
            dark: '#a00037',
            contrastText: '#fff'
        },
    },
});
