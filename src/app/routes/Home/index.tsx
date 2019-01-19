import * as React from 'react';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

const styles = (theme: Theme) => createStyles({
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroTitle: {
        fontWeight: 300,
    },
    heroDescription: {
        fontWeight: 500,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
});

export const Home = (uploadFile: Function) => withStyles(styles)(
    class extends React.Component<WithStyles<typeof styles>> {
        render() {
            const { classes } = this.props;
            return (
                <div className={classes.heroContent}>
                    <Typography className={classes.heroTitle} variant="display3" align="center" color="textPrimary" gutterBottom>
                        Robot Analytics
                    </Typography>
                    <Typography className={classes.heroDescription} variant="subheading" align="center" color="textSecondary" paragraph>
                        A <a href="https://github.com/SUPERCILEX/Robot-Scouter">Robot Scouter</a> companion app that
                        allows for comprehensive data processing and analytics of FRC scouting data. Processing your
                        scouting data has never been so easy and elegant.
                    </Typography>
                    <div className={classes.heroButtons}>
                        <Grid container spacing={16} justify="center">
                            <Grid item>
                                <Link to="/table-view" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" color="primary">
                                        Go to table
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="primary" onClick={() => uploadFile()}>
                                    Upload Robot Scouter data
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            );
        }
    }
);

export default Home
