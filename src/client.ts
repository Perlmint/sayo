/// <reference path="../typings/index.d.ts" />

import * as React from 'react'
import * as ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { routes } from './routes';
import { configureStore } from './store';

const store = configureStore(browserHistory, window['__INITIAL_STATE__']);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    React.createElement(Provider, {
        store:store,
        children: React.createElement(Router, {
            history:history,
            routes:routes
        })
    }),
    document.getElementById('app'));
