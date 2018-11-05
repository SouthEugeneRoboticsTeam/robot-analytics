import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogHeader from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Button, withMobileDialog } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { reduce, forEach, map, mapKeys, mapValues, isEmpty, keys } from 'lodash';
import { Teams } from '../data/team';
import { Games } from '../data/game';
import { calculations } from '../data/calculations';
import { CalculationSetting } from '../routes/TableView';

const styles = (theme: Theme) => createStyles({
    selectContainer: {
        padding: (p => `0 ${p}px ${p}px ${p}px`)(theme.spacing.unit * 3)
    },
    checkboxContainer: {
        height: theme.spacing.unit * 24,
        border: '1px solid grey',
        margin: (m => `0 ${m}px ${m}px ${m}px`)(theme.spacing.unit * 3)
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
            gameName: (games => !isEmpty(games) ? keys(games)[0] : '')(this.props.games),
            metricCheckboxes: {}
        };

        handleModalAccept = () => {
            const { handleModalClose, configureTable } = this.props;
            const { gameName, metricCheckboxes } = this.state;
            handleModalClose();
            configureTable(
                gameName,
                reduce(metricCheckboxes, (result: Array<CalculationSetting>, metricCheckbox, metricName) => {
                    if (metricCheckbox.checked) {
                        forEach(metricCheckbox.calculationCheckboxes, (calculationCheckbox, calculationName) => {
                            if (calculationCheckbox) {
                                result.push({ metricName, calculationName });
                            }
                        })
                    }
                    return result;
                }, [])
            );
        };

        handleGameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
            const { games } = this.props;
            const { gameName } = this.state;
            const game = games[gameName];
            if (game != null) {
                this.setState({
                    metricCheckboxes: reduce(game.metrics, (result: MetricCheckboxes, metric, metricName) => {
                        result[metricName] = {
                            checked: false,
                            calculationCheckboxes: reduce(calculations, (result: CalculationCheckboxes, calculation, calculationName) => {
                                result[calculationName] = false;
                                return result;
                            }, {})
                        };
                        return result;
                    }, {})
                })
            }
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
                    <div className={classes.selectContainer}>
                        <Select value={gameName} onChange={this.handleGameChange}>
                            {map(games, (game, gameName) => (
                                <MenuItem key={gameName} value={gameName}>
                                    {gameName}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <DialogContent className={classes.checkboxContainer}>
                        {map((games[gameName] != null ? games[gameName].metrics : {}), (metric, metricName) => (
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
                                    {map(calculations, (calculation, calculationName) => (
                                        <FormControlLabel
                                            control={<Checkbox
                                                    checked={metricCheckboxes[metricName].calculationCheckboxes[calculationName]}
                                                    onChange={this.handleCalculationChange(metricName, calculationName)}
                                                    color="primary"
                                            />}
                                            label={calculationName}
                                            key={calculationName}
                                        />
                                    ))}
                                </FormGroup>
                            </div>
                        ))}
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
    configureTable: (gameName: string, calculations: Array<CalculationSetting>) => void
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
