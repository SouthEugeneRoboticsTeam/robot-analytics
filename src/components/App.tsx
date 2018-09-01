import { h } from 'preact';
import { Router } from 'preact-router';
import { Home } from '../routes/Home';

export const App = () => (
    <div id="App">
        <Router>
            <Home path="/" />
        </Router>
    </div>
);
