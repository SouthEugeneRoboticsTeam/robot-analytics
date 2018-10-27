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
import { take } from '../utils';
import { calculations } from '../data/calculations';

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

        handleMetricChange = (metric: string) => () => {
            this.setState({
                metricCheckboxes: {
                    ...this.state.metricCheckboxes,
                    [metric]: {
                        ...this.state.metricCheckboxes[metric],
                        checked: !this.state.metricCheckboxes[metric].checked
                    }
                }
            })
        };

        handleCalculationChange = (metric: string, calculation: string) => () => {
            this.setState({
                metricCheckboxes: {
                    ...this.state.metricCheckboxes,
                    [metric]: {
                        ...this.state.metricCheckboxes[metric],
                        calculationCheckboxes: {
                            ...this.state.metricCheckboxes[metric].calculationCheckboxes,
                            [calculation]: !this.state.metricCheckboxes[metric].calculationCheckboxes[calculation]
                        }
                    }
                }
            })
        };

        componentWillMount() {
            this.setState(take(this.props.games[this.state.gameName].metrics, metrics => ({
                metricCheckboxes: Object.keys(metrics).reduce(
                    (result: MetricCheckboxes, metricName) => {
                        result[metricName] = {
                            checked: false,
                            calculationCheckboxes: take(metrics[metricName], (metric) => {
                                return Object.keys(calculations[metric.type]).reduce((result: CalculationCheckboxes, key) => {
                                    result[key] = false;
                                    return result;
                                }, {})
                            })
                        };
                        return result;
                    },
                    {}
                )
            })))
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
                    {...Object.keys(games[gameName].metrics).map((metricName) => {
                        return take(games[gameName].metrics[metricName], metric => (
                            <div key={metricName}>
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={metricCheckboxes[metricName].checked}
                                        onChange={this.handleMetricChange(metricName)}
                                        color="primary"
                                    />}
                                    label={metricName}
                                />
                                <FormGroup className={classes.nestedCheckboxes} style={{ display: metricCheckboxes[metricName].checked ? null : 'none' }}>
                                    {...Object.keys(calculations[metric.type]).map((submetricName) => (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={metricCheckboxes[metricName].calculationCheckboxes[submetricName]}
                                                    onChange={this.handleCalculationChange(metricName, submetricName)}
                                                    color="primary"
                                                />
                                            }
                                            label={submetricName}
                                            key={submetricName}
                                        />
                                    ))}
                                </FormGroup>
                            </div>
                        ))
                    })}
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
    calculationCheckboxes: CalculationCheckboxes
}

interface CalculationCheckboxes {
    [name: string]: boolean
}
