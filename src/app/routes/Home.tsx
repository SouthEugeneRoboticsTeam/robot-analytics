import * as React from 'react';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import AccoutCircleIcon from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TableChartIcon from '@material-ui/icons/TableChart';
import ImportExport from '@material-ui/icons/ImportExport'
import { TableView } from './TableView';
import { Switch, Route } from 'react-router-dom'
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { NavigationItem } from '@robot-analytics/components/NavigationItem';
import { addTeams } from '@robot-analytics/processing/scoutFormatter'
import { store } from '@robot-analytics/state/store'

const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex'
    },
    title: {
        flexGrow: 1,
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    drawer: {
        height: '100vh'
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        overflow: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        overflow: 'hidden',
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    appBarSpacer: theme.mixins.toolbar,
});

export const Home = withStyles(styles)(
    class extends React.Component<HomeProps, HomeState> {
        state = {
            drawerOpened: false,
        };

        handleDrawerOpen = () => this.setState({ drawerOpened: true });

        handleDrawerClose = () => this.setState({ drawerOpened: false });
        
        fileUploader:HTMLInputElement
        // Reads and parses the imported JSON file and adds it to the state
        handleFileUpload = (event:any) => {
                            var reader = new FileReader()
                            reader.readAsText(event.target.files[0])
                            // TODO: Have user specify which game they're importing data from
                            reader.onload = (event:any) => {addTeams(JSON.parse(event.target.result).teams,'frc2018-powerup')
                                                            // Logs the state to the console
                                                            console.log(store.getState()) 
                                                        }
                        }
        
        render() {
            const { classes } = this.props;
            const { drawerOpened } = this.state;
            return (
                <div className={classes.root}>
                    <Drawer
                        variant="permanent"
                        className={classes.drawer}
                        classes={{
                            paper: classNames(classes.drawerPaper, !drawerOpened && classes.drawerPaperClose)
                        }}
                        open={drawerOpened}
                    >
                        <div className={classes.toolbarIcon}>
                            <IconButton onClick={this.handleDrawerClose}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                            <NavigationItem icon={TableChartIcon} text="Table View" linkTo="table-view"/>
                        </List>
                    </Drawer>
                    <AppBar className={classNames(classes.appBar, drawerOpened && classes.appBarShift)}>
                        <Toolbar disableGutters={!drawerOpened} className={classes.toolbar}>
                            <IconButton
                                aria-label="Open drawer"
                                color="inherit"
                                onClick={this.handleDrawerOpen}
                                className={classNames(
                                    classes.menuButton,
                                    drawerOpened && classes.menuButtonHidden,
                                )}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                variant="title"
                                color="inherit"
                                component="h1"
                                noWrap
                                className={classes.title}
                            >
                                Robot Analytics
                            </Typography>
                            <IconButton color="inherit">
                                <SettingsIcon />
                            </IconButton>
                            <IconButton color="inherit">
                                <AccoutCircleIcon />
                            </IconButton>
                            <input id="dataImport" type="file" accept='.json' ref={(ref) => this.fileUploader = ref} style={{display: 'none' }} onChange={this.handleFileUpload}/>                
                            <IconButton
                            color="inherit"
                            onClick={() => this.fileUploader.click()}>
                                <ImportExport />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Switch>
                            <Route exact path="/" component={null}/>
                            <Route path="/table-view" component={TableView}/>
                        </Switch>
                    </main>
                </div>
            )
        }
    }
);

interface HomeProps extends WithStyles<typeof styles> {}

interface HomeState {
    drawerOpened: boolean,
}
