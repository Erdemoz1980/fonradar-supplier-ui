import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { Integrations } from '@sentry/tracing';
// import * as Sentry from '@sentry/react';
import { ConfigProvider } from 'antd';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import './services/Notification';

// Sentry.init({
//   dsn: SENTRY_KEY,
//   integrations: [
//     new Integrations.BrowserTracing(),
//   ],
//   tracesSampleRate: 1.0,
// });

const validateMessages = { required: 'Bu alanı boş bırakmayınız!' };

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <ConfigProvider form={{ validateMessages }}>
                <App />
            </ConfigProvider>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
