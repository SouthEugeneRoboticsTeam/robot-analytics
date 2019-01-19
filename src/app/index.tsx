import * as React from 'react';
import { Switch, Route } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Main } from '@robot-analytics/routes/Main';

const App = () => (
    <>
        <CssBaseline />
        <Switch>
            <Route path="/" component={Main} />
        </Switch>
    </>
);

export default App;
