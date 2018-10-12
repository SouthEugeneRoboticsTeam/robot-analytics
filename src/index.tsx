import * as React from 'react';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { App } from './components/App';
import { store } from './state/store';
import './firebase';
import { theme } from './theme';
import { addGame } from './state/actions';
import { ScoutMetricType } from './data/metric';

store.dispatch(addGame("PowerUp", { someMetric: { type: ScoutMetricType.NUMBER, value: 4 }}));
store.dispatch(addGame("SteamWorks", {}));
store.dispatch(addGame("Bunnybots2018", {}));


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
