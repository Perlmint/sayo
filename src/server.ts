/// <reference path="../typings/index.d.ts" />

import * as http from "http";
import * as path from "path";
import * as express from "express";
import { match, RouterContext, createMemoryHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { renderToString } from "react-dom/server";
import * as React from "react";
import { routes } from "./routes";
import { template } from "./server_template";
import * as passport from "passport";
import { InitPassportDB, InitPassportGoogle, AuthRequired, authApp } from "./auth_server";
import { configureStore } from "./store";
import * as config from "config";
import * as _ from "lodash";
import * as URL from "url";
import { SetAuthorized, UnsetAuthorized } from "./reducer/auth";

import * as errorhandler from "errorhandler";
import * as bodyParser from "body-parser";

var app = express();

const debug = config.get<boolean>("server.debug");
const port = config.get<number>("server.port");
InitPassportDB();
InitPassportGoogle("client_secret.json", `127.0.0.1:${port}`);

let wit = require("webpack-isomorphic-tools");
const witConfig = require(
    path.join(process.cwd(), "webpack-isomorphic-tools-config"));
const webpackIsomorphicTools = new wit(witConfig).development(debug);

import * as cookieParser from "cookie-parser";
import * as expressSession from "express-session";

webpackIsomorphicTools.server(process.cwd(), () => {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(expressSession({ secret: config.get<string>("sessionSecret"), resave: false, saveUninitialized: false }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.set("port", port);

    let staticRoot = "/static";
    if (debug) {
        app.use(errorhandler());
        app.use(staticRoot, (req, res) => {
            res.redirect(staticRoot + URL.parse(req.url).path);
        });;
        staticRoot = `http://localhost:${require("../webpack.dev.config").devServer.port}/static`;
    }
    else {
        app.use(staticRoot, express.static(path.join(__dirname, "asset")));
    }
    app.use("/favicon.ico", (req, res) => {
        res.redirect(302, "/static/favicon.ico");
    });
    app.use(
        "/auth/google$",
        passport.authenticate("google", {
            scope: [
                "https://www.googleapis.com/auth/calendar.readonly",
                "profile"
            ]
        })
    );
    app.use(
        "/auth/google/callback",
        passport.authenticate("google", {
            failureRedirect: "/"
        }),
        (req, res) => {
            res.redirect("/import");
        }
    );
        app.use("/favicon.ico", (req, res) => {
            res.redirect(302, "/static/favicon.ico");
    });

    app.use("/api", authApp);

    app.use("/", AuthRequired(["/", "/login"], "/"), (req, res) => {
        console.log(`render HTML for '${req.url}'`);
        if (debug) {
            webpackIsomorphicTools.refresh();
        }
        const assets = webpackIsomorphicTools.assets();
        const additionalHeader = _.map(assets.styles, (styleUrl, styleName) =>
            `<link href="${styleUrl}" rel="stylesheet" type="text/css" /><!--//${styleName}-->`
        ).join("\n");
        const afterApp = _.map(assets.javascript, (jsUrl, jsName) =>
            `<script src="${jsUrl}"></script><!--//${jsName}-->`
        ).join("\n");
        const memoryHistory = createMemoryHistory(req.url);
        const store = configureStore(memoryHistory, {}, true);
        const history = syncHistoryWithStore(memoryHistory, store);
        if (req.isAuthenticated()) {
            store.dispatch(SetAuthorized());
        }
        match({
            history,
            routes,
            location: req.url
        }, (error, redirection, renderProp) => {
            if (error) {
                res.status(500).send(error.message);
            } else if (redirection) {
                res.redirect(302, redirection.pathname + redirection.search);
            } else if (renderProp) {
                const content = renderToString(
                    React.createElement(RouterContext, renderProp as any)
                );
                store.dispatch(UnsetAuthorized());
                res.status(200).send(
                    template({
                        title: "SAYO",
                        content,
                        initialstate: JSON.stringify(store.getState()),
                        additionalHeader,
                        afterApp
                    })
                );
            }
        });
    });

    if (debug) {
        app.use(errorhandler());
    }

    http.createServer(app).listen(app.get("port"), () => {
        console.log(`Express server listening on port ${app.get("port")}`);
    });
});
