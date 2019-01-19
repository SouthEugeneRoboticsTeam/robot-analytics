import * as React from 'react';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { App } from '@robot-analytics/components/App';
import { store } from '@robot-analytics/state/store';
import '@robot-analytics/firebase';
import { theme } from '@robot-analytics/theme';
import registerServiceWorker from './registerServiceWorker';
import { processRsData } from '@robot-analytics/processing/scoutFormatter';

console.log(processRsData({
    teams: {
        '0000': [
            {
                name: 'Q1',
                metrics: {
                    'a': {
                        type: 'text',
                        name: 'metric1',
                        value: 'abc',
                        category: 'category1'
                    },
                    'b': {
                        type: 'number',
                        name: 'metric2',
                        value: 5,
                        category: 'category1'
                    },
                    'c': {
                        type: 'boolean',
                        name: 'metric3',
                        value: true,
                        category: 'category2'
                    }
                }
            },
            {
                name: 'Q2',
                metrics: {
                    'a': {
                        type: 'text',
                        name: 'metric1',
                        value: 'def',
                        category: 'category1'
                    },
                    'b': {
                        type: 'number',
                        name: 'metric2',
                        value: 1,
                        category: 'category1'
                    },
                    'c': {
                        type: 'boolean',
                        name: 'metric3',
                        value: false,
                        category: 'category2'
                    }
                }
            }
        ],
        '0001': [
            {
                name: 'Q1',
                metrics: {
                    'a': {
                        type: 'text',
                        name: 'metric1',
                        value: 'ghi',
                        category: 'category1'
                    },
                    'b': {
                        type: 'number',
                        name: 'metric2',
                        value: 3,
                        category: 'category1'
                    },
                    'c': {
                        type: 'boolean',
                        name: 'metric3',
                        value: false,
                        category: 'category2'
                    }
                }
            },
            {
                name: 'Q2',
                metrics: {
                    'a': {
                        type: 'text',
                        name: 'metric1',
                        value: 'jkl',
                        category: 'category1'
                    },
                    'b': {
                        type: 'number',
                        name: 'metric2',
                        value: 6,
                        category: 'category1'
                    },
                    'c': {
                        type: 'boolean',
                        name: 'metric3',
                        value: false,
                        category: 'category2'
                    }
                }
            }
        ]
    }
}));

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

registerServiceWorker();
