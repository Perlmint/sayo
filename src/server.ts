/// <reference path="../typings/index.d.ts" />

import http = require("http");
import path = require("path");
import fs = require("fs");
import express = require("express");
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import React = require('react');
import { routes } from './routes';
import { template } from './server_template';
import * as passport from 'passport';
import { InitPassportGoogle, AuthRequired } from './auth';
//import { User } from './model/user';
var errorhandler = require('errorhandler');

var app = express();

var env  = process.env.NODE_ENV || 'development';

passport.serializeUser((user, done) => {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser((id, done) => {
    //User.findById(id, (err, user) => {
    //    done(err, user);
    //});
});
InitPassportGoogle('client_secret.json', '127.0.0.1:3000');

app.set('port', process.env.PORT || 3000);
app.use('/static', express.static(path.join(__dirname, 'asset')));
app.use('/favicon.ico', (req, res, next) => {
    res.redirect(302, '/static/favicon.ico');
});
app.use('/auth/google$', (req, res, next) => {
    console.log("auth");
    next();
}, passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/calendar.readonly',
        'profile'
    ]
}));
app.use('/auth/google/callback', (req, res, next) => {
    console.log("callback");
    next();
}, passport.authorize('google', {
    successRedirect: '/import',
    failureRedirect: '/'
}));
app.use('/', AuthRequired(['/'], '/'), (req, res, next) => {
    match({
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

if (env == 'development') {
    app.use(errorhandler());
}

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
