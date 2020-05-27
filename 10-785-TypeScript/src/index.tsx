import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import './i18n';
import App from './App';
import rootReducer from './store/reducers';

const middleware = [thunk];
const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(...middleware),
));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);

const registerServiceWorker = (): void => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('service-worker.js')
                .then((registration) => {
                    console.info('ServiceWorker registration successful with scope: ', registration.scope);
                })
                .catch((error: Error) => {
                    console.warn('ServiceWorker registration failed: ', error);
                });
        });
    } else {
        console.warn('Service worker is not supported');
    }
};

registerServiceWorker();
