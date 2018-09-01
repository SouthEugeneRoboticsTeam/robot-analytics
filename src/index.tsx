import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import { App } from './components/App';

const Root = () => <Provider><App /></Provider>;

render(<Root />, document.body, document.getElementById("root"));
