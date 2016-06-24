/// <reference path="../typings/index.d.ts" />

import React = require('react');
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Application } from './application';
import { LoginPage } from './login';
import { ImportIndex } from './import/index';

export var routes = <Router history={browserHistory}>
    <Route path="/" component={Application}>
        <IndexRoute component={LoginPage}/>
        <Route path="import" component={ImportIndex} />
    </Route>
</Router>;
