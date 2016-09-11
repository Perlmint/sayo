/// <reference path="../typings/index.d.ts" />
import * as fs from "fs";
import * as passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import * as _ from 'lodash';
import { Request, Response, NextFunction, Router } from "express";
import { RouterState, RedirectFunction } from "react-router";
import { User } from "./model/db";
import { UserInstance } from "./model/gen/user_models";
import { store } from "./store";

export function InitPassportDB() {
    passport.serializeUser((user: UserInstance, done) => {
        console.log("[Auth]", "serialize user");
        done(null, user.google_id);
    });

    // used to deserialize the user
    passport.deserializeUser((id, done) => {
        console.log("[Auth]", "deserialize user");
        User.findById(id)
            .then((user) => done(null, user))
            .catch((error) => done(error, null));;
    });
}

export function InitPassportGoogle(secretJsonPath: string, host: string) {
    fs.readFile(secretJsonPath, (err, content) => {
        if (err !== null) {
            console.error("Google API Secret load error - ", err);
        }
        var credentials = JSON.parse(content.toString());
        var callback = <string>_.find(credentials.web.redirect_uris, (o) => {
            return (<string>o).indexOf(host) != -1;
        });
        passport.use(new GoogleStrategy({
            clientID: credentials.web.client_id,
            clientSecret: credentials.web.client_secret,
            callbackURL: callback,
        }, (token, refreshToken, profile, done) => {
            // make the code asynchronous
            // User.findOne won't fire until we have all our data back from Google
            process.nextTick(() => {
                User.findOrCreate({
                    where: { google_id: profile.id },
                    defaults: {
                        google_id: profile.id,
                        token: token,
                        name: profile.displayName
                    }
                }).spread((user, created) => {
                    if (!created) {
                        user.token = token;
                        user.name = profile.displayName;
                        user.save();
                    }

                    done(null, user);
                });
            });
        }));
    });
};

export function AuthRequired(exceptions: string[], redirect: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (_.includes(exceptions, req.url) || req.isAuthenticated()) {
            next();
        }
        else {
            console.log("[Auth]", "Not authorized - redirect", req.url);
            res.redirect(redirect);
        }
    }
};

const app = Router();

app.get("/isAuthorized",
    (req, res) => {
        console.log(req.authInfo);
        console.log(req.authenticatedUser);
        res.write(JSON.stringify(req.isAuthenticated()));
        res.end();
    }
);

export const authApp = app;

export function isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
        resolve(store.getState().reducers.auth.authrozied);
    });
}
