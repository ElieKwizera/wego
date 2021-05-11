import App from './layout/App';
import ReactDOM from 'react-dom';
import './assets/tailwind.css';
import { Provider} from 'react-redux';
import store from './store/store';




ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root"));