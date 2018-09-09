import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import { App } from './components/App';
import { store } from './state/store';
import 'preact-material-components/style.css'
import './firebase';
import './style.scss'

const Root = () => <div id="root"><Provider store={store}><App /></Provider></div>;

render(<Root />, document.body, document.getElementById("root"));
