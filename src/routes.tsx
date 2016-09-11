/// <reference path="../typings/index.d.ts" />

import * as React from "react";
import { Router, Route, IndexRoute, browserHistory, RouterState, RedirectFunction } from "react-router";
import { Application } from "./application";
import { LoginPage } from "./login";
import { Index } from "./index";
import { ImportIndex } from "./import/index";
import { isAuthenticated } from "./auth";

export function authNeeded(nextState: RouterState, replace: RedirectFunction, callback) {
    isAuthenticated()
        .then((authenticated) => {
            if (!authenticated) {
                replace({
                    pathname: "/login",
                    query: {
                        redirect: `${nextState.location.pathname}${nextState.location.search}`
                    }
                });
            }
            callback();
        });
}

export var routes = <Router history={browserHistory}>
    <Route path="/" component={Application}>
        <IndexRoute component={Index}/>
        <Route path="/login" component={LoginPage} />
        <Route path="/import" component={ImportIndex} onEnter={authNeeded}/>
    </Route>
</Router>;
