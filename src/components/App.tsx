import * as React from 'react';
import { Switch, Route } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import { HomeContainer } from "../containers/HomeContainer";

export const App = () => (
    <>
        <CssBaseline />
        <Switch>
            <Route exact path="/" component={HomeContainer} />
        </Switch>
    </>
);
