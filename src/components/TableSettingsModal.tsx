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
import Dialog from '@material-ui/core/Dialog';
import DialogHeader from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { backup, safe, take, takeNotNull } from '../utils';
import { calculations } from '../data/calculations';
import { Button, withMobileDialog } from '@material-ui/core';
import { theme } from '../theme';

const styles = (theme: Theme) => createStyles({
    checkboxContainer: {
        height: theme.spacing.unit * 24,
        border: '1px solid grey',
        margin: take(theme.spacing.unit * 3, m => `0 ${m}px ${m}px ${m}px`)
    },
    nestedCheckboxes: {
        paddingLeft: theme.spacing.unit * 4,
    }
});

export const TableSettingsModal = compose(
    connect((state, ownProps: TableSettingsModalProps) => ({ ...state, ...ownProps })),
    withStyles(styles),
    withMobileDialog({ breakpoint: 'xs' })
)(
    class extends React.Component<TableSettingsModalConnectProps, TableSettingsModalState> {
        state: TableSettingsModalState = {
            gameName: backup(Object.keys(this.props.games)[0], ''),
            metricCheckboxes: {}
        };

        handleModalAccept = () => {
            this.props.handleModalClose();
            this.props.configureTable(
                this.state.gameName,
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
            takeNotNull(this.props.games[this.state.gameName], game => {
                this.setState(take(game.metrics, metrics => ({
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
            });
        }

        render() {
            const { games, classes, isModalOpen, handleModalClose, fullScreen } = this.props;
            const { gameName, metricCheckboxes } = this.state;
            return (
                <Dialog
                    open={isModalOpen}
                    onClose={handleModalClose}
                    fullWidth
                    fullScreen={fullScreen}
                >
                    <DialogHeader>Table Settings</DialogHeader>
                    <div style={{
                        padding: take(theme.spacing.unit * 3, p => `0 ${p}px ${p}px ${p}px`)
                    }}>
                        <Select
                            value={gameName}
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
                    </div>
                    <DialogContent className={classes.checkboxContainer}>
                        {...Object.keys(backup(safe(games[gameName], 'metrics'), {})).map((metricName) => {
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
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleModalClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleModalAccept} color="primary" variant="contained">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            )
        }
    }
);

export interface TableSettingsModalProps {
    configureTable: (gameName: string, calculations: Array<{ metricName: string, calculationName: string }>) => void
    isModalOpen: boolean
    handleModalClose: () => void
}

export interface TableSettingsModalConnectProps extends WithStyles<typeof styles>, TableSettingsModalProps {
    teams: Teams
    games: Games
    fullScreen: boolean
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
