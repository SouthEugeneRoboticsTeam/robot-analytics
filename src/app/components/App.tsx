import * as React from 'react';
import { Switch, Route } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Home } from '@robot-analytics/routes/Home';

export const App = () => (
    <>
        <CssBaseline />
        <Switch>
            <Route path="/" component={Home} />
        </Switch>
    </>
);
