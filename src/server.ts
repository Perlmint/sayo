/// <reference path="../typings/index.d.ts" />

import http = require("http");
import path = require("path");
import fs = require("fs");
import express = require("express");
import { match, RouterContext, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { renderToString } from 'react-dom/server';
import React = require('react');
import { routes } from './routes';
import { template } from './server_template';
import * as passport from 'passport';
import { InitPassportDB, InitPassportGoogle, AuthRequired } from './auth';
import { configureStore } from "./store";
import config = require('config');
import _ = require("lodash");
import URL = require('url');

import errorhandler = require('errorhandler');
import bodyParser = require('body-parser');

var app = express();

const debug = config.get<boolean>('server.debug');
const port = config.get<number>("server.port");
InitPassportDB();
InitPassportGoogle('client_secret.json', '127.0.0.1:' + port );

import wit = require('webpack-isomorphic-tools');
const witConfig = require(
    path.join(process.cwd(), 'webpack-isomorphic-tools-config'));
const webpackIsomorphicTools = new wit(witConfig).development(debug);

webpackIsomorphicTools.server(process.cwd(), () => {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(passport.initialize());

    app.set('port', port);

    let static_root = '/static';
    if (debug) {
        app.use(errorhandler());
        static_root = 'http://localhost:' + require('../webpack.dev.config').devServer.port + '/static';
        app.use('/static', (req, res) => {
            res.redirect(static_root + URL.parse(req.url).path);
        });;
    }
    else {
        app.use('/static', express.static(path.join(__dirname, 'asset')));
    }
    app.use('/favicon.ico', (req, res, next) => {
        res.redirect(302, '/static/favicon.ico');
    });
    app.use(
        '/auth/google$',
        passport.authenticate('google', {
            scope: [
                'https://www.googleapis.com/auth/calendar.readonly',
                'profile'
            ]
        })
    );
    app.use(
        '/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/'
        }),
        (req, res, next) => {
            console.log("asdf");
            res.redirect("/import");
        }
    );
        app.use('/favicon.ico', (req, res, next) => {
            res.redirect(302, '/static/favicon.ico');
        });

    app.use('*', AuthRequired(['/'], '/'), (req, res, next) => {
        if (debug) {
            webpackIsomorphicTools.refresh();
        }
        const assets = webpackIsomorphicTools.assets();
        let additional_header: string =
            _.map(assets.styles, (styleUrl, styleName) =>
                  `<link href="${styleUrl}" rel="stylesheet" type="text/css" />`
                 ).join("\n");
        let after_app = _.map(assets.javascript, (jsUrl, jsName) =>
                              `<script src="${jsUrl}"></script>`
                             ).join("\n");
        let memoryHistory = createMemoryHistory(req.url);
        let store = configureStore(memoryHistory, {}, true);
        let history = syncHistoryWithStore(memoryHistory, store);
        match({
            history,
            routes,
            location: req.url
        }, (error, redirection, renderProp) => {
            if (error) {
                res.status(500).send(error.message)
            } else if (redirection) {
                res.redirect(302, redirection.pathname + redirection.search)
            } else if (renderProp) {
                res.status(200).send(
                    template({
                        title: "SAYO",
                        content:
                        renderToString(
                            React.createElement(RouterContext, <any>renderProp)
                        )
                    })
                );
            }
        });
    });

    if (debug) {
        app.use(errorhandler());
    }

    http.createServer(app).listen(app.get('port'), function(){
        console.log("Express server listening on port " + app.get('port'));
    });
});