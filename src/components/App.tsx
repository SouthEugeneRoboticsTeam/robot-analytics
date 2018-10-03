import * as React from 'react';
import { Switch, Route } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Home } from '../routes/Home';

export const App = () => (
    <>
        <CssBaseline />
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
    </>
);
