import * as React from 'react';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { App } from './components/App';
import { store } from './state/store';
import './firebase';
import { theme } from './theme';

// Test code TODO remove this before merging!
import { addGame, addTeam } from './state/actions';
import { ScoutMetricType } from './data/metric';

store.dispatch(addGame('PowerUp', {
    'Cubes in Scale': { type: ScoutMetricType.NUMBER, value: 0 },
    'Cubes in Switch': { type: ScoutMetricType.NUMBER, value: 0 },
    'Cubes in Exchange': { type: ScoutMetricType.NUMBER, value: 0 }
}));

store.dispatch(addTeam('SERT', 2521, {
    'Q1': {
        gameName: 'PowerUp',
        sections: {
            'Teleop': {
                metrics: {
                    'Cubes in Scale': { type: ScoutMetricType.NUMBER, value: 4 },
                    'Cubes in Switch': { type: ScoutMetricType.NUMBER, value: 6 },
                    'Cubes in Exchange': { type: ScoutMetricType.NUMBER, value: 1 }
                }
            }
        }
    },
    'Q2': {
        gameName: 'PowerUp',
        sections: {
            'Teleop': {
                metrics: {
                    'Cubes in Scale': { type: ScoutMetricType.NUMBER, value: 5 },
                    'Cubes in Switch': { type: ScoutMetricType.NUMBER, value: 6 },
                    'Cubes in Exchange': { type: ScoutMetricType.NUMBER, value: 1 }
                }
            }
        }
    },
    'Q3': {
        gameName: 'PowerUp',
        sections: {
            'Teleop': {
                metrics: {
                    'Cubes in Scale': { type: ScoutMetricType.NUMBER, value: 9 },
                    'Cubes in Switch': { type: ScoutMetricType.NUMBER, value: 6 },
                    'Cubes in Exchange': { type: ScoutMetricType.NUMBER, value: 1 }
                }
            }
        }
    }
}));
// Do it!

const Root = () => (
    <BrowserRouter>
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        </Provider>
    </BrowserRouter>
);

render(<Root />, document.getElementById('root'));
