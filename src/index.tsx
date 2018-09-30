import * as React from 'react';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './components/App';
import { store } from './state/store';
import './firebase';
import './style.scss';
import { addScout, addTeam } from './state/actions';

//test
store.dispatch(addTeam('Sert', 2521));
store.dispatch(addTeam('ChezyPoofs', 254));
store.dispatch(addScout({
    name: 'Helo',
    templateName: 'Hai',
    team: store.getState().teams[0],
    sections: []
}));

const Root = () => (
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);

render(<Root />, document.getElementById('root'));
