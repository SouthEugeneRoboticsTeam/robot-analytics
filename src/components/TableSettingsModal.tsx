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
import { Modal } from '@material-ui/core';

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
    connect((state, ownProps: TableSettingsModalProps) => ({ ...state, ...ownProps })),
    withStyles(styles)
)(
    class extends React.Component<TableSettingsModalConnectProps, TableSettingsModalState> {
        state: TableSettingsModalState = {
            gameName: Object.keys(this.props.games)[0],
            metricCheckboxes: {}
        };

        handleModalClose = () => {
            this.props.handleModalClose();
            this.props.setCalculations(
                Object.keys(this.state.metricCheckboxes).reduce((result: Array<{ metricName: string, calculationName: string }>, metricName) => (
                    take(this.state.metricCheckboxes[metricName], (metricCheckbox) => {
                        if (metricCheckbox.checked) {
                            Object.keys(metricCheckbox.calculationCheckboxes).forEach((calculationName) => {
                                if (metricCheckbox.calculationCheckboxes[calculationName]) {
                                    result.push({ metricName, calculationName })
                                }
                            })
                        }
                        console.log(result);
                        return result;
                    })
                ), [])
            );
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
                <Modal
                    tabIndex={-1}
                    open={this.props.isModalOpen}
                    onClose={this.handleModalClose}
                >
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
                                    <FormGroup className={classes.nestedCheckboxes}
                                               style={{ display: metricCheckboxes[metricName].checked ? null : 'none' }}>
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
                </Modal>
            )
        }
    }
);

export interface TableSettingsModalProps {
    setCalculations: (config: Array<{ metricName: string, calculationName: string }>) => void
    isModalOpen: boolean
    handleModalClose: () => void
}

export interface TableSettingsModalConnectProps extends WithStyles<typeof styles>, TableSettingsModalProps {
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
