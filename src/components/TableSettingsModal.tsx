import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Teams } from '../data/team';
import { Games } from '../data/game';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Paper from '@material-ui/core/Paper';

const styles = (theme: Theme) => createStyles({
    root: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    },
    nestedCheckboxes: {
        paddingLeft: theme.spacing.unit * 4,
    }
});

export const TableSettingsModal = compose(
    withStyles(styles),
    connect(state => (state))
)(
    class extends React.Component<TableSettingsModalProps, TableSettingsModalState> {
        state: TableSettingsModalState = {
            gameName: Object.keys(this.props.games)[0],
            metricCheckboxes: {}
        };

        handleGameChange = (event: any) => {
            if (event.target.value !== this.state.gameName) {
                this.setState({ gameName: event.target.value })
            }
        };

        handleMetricChange = (metric: string, aspect: MetricCheckboxKey) => () => {
            this.setState({
                metricCheckboxes: {
                    ...this.state.metricCheckboxes,
                    [metric]: {
                        ...this.state.metricCheckboxes[metric],
                        [aspect]: !this.state.metricCheckboxes[metric][aspect]
                    }
                }
            })
        };

        componentWillMount() {
            this.setState({
                metricCheckboxes: Object.keys(this.props.games[this.state.gameName].metrics).reduce(
                    (result: MetricCheckboxes, metricName) => {
                        result[metricName] = {
                            checked: false,
                            avgChecked: false,
                            maxChecked: false,
                            minChecked: false
                        };
                        return result;
                    },
                    {}
                )
            })
        }

        render() {
            const { games, classes } = this.props;
            const { gameName, metricCheckboxes } = this.state;
            return (
                <Paper className={classes.root} tabIndex={-1}>
                    <Select
                        value={this.state.gameName}
                        onChange={this.handleGameChange}
                    >
                        {...Object.keys(games).map((gameName) => (
                            <MenuItem
                                key={gameName}
                                value={gameName}
                            >
                                {gameName}
                            </MenuItem>
                        ))}
                    </Select>
                    {...Object.keys(games[gameName].metrics).map((metricName) => (
                        <div key={metricName}>
                            <FormControlLabel
                                control={<Checkbox
                                    checked={metricCheckboxes[metricName].checked}
                                    onChange={this.handleMetricChange(metricName, MetricCheckboxKey.CHECKED)}
                                    color="primary"
                                />}
                                label={metricName}
                            />
                            <FormGroup className={classes.nestedCheckboxes} style={{ visibility: metricCheckboxes[metricName].checked ? 'visible' : 'hidden' }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={metricCheckboxes[metricName].avgChecked}
                                            onChange={this.handleMetricChange(metricName, MetricCheckboxKey.AVG_CHECKED)}
                                            color="primary"
                                        />
                                    }
                                    label="avg"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={metricCheckboxes[metricName].maxChecked}
                                            onChange={this.handleMetricChange(metricName, MetricCheckboxKey.MAX_CHECKED)}
                                            color="primary"
                                        />
                                    }
                                    label="max"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={metricCheckboxes[metricName].minChecked}
                                            onChange={this.handleMetricChange(metricName, MetricCheckboxKey.MIN_CHECKED)}
                                            color="primary"
                                        />
                                    }
                                    label="min"
                                />
                            </FormGroup>
                        </div>
                    ))}
                </Paper>
            )
        }
    }
);

export interface TableSettingsModalProps extends WithStyles<typeof styles> {
    teams: Teams
    games: Games
}

export interface TableSettingsModalState {
    gameName: string
    metricCheckboxes: MetricCheckboxes
}

interface MetricCheckboxes {
    [metricName: string]: MetricCheckbox
}

interface MetricCheckbox {
    checked: boolean
    maxChecked: boolean
    minChecked: boolean
    avgChecked: boolean
}

enum MetricCheckboxKey {
    CHECKED = 'checked',
    MAX_CHECKED = 'maxChecked',
    MIN_CHECKED = 'minChecked',
    AVG_CHECKED = 'avgChecked'
}
