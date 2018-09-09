import { h } from 'preact';
import { Router } from 'preact-router';
import { HomeContainer } from "../containers/HomeContainer";

export const App = () => (
    <div id="App">
        <Router>
            <HomeContainer path="/" />
        </Router>
    </div>
);
