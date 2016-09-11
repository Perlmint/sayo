/// <reference path="../typings/index.d.ts" />
import * as fetch from "isomorphic-fetch";
import { RouterState, RedirectFunction } from "react-router";

export function isAuthenticated(): Promise<boolean> {
    return fetch("/api/isAuthorized",
        {
            credentials: "same-origin"
        })
        .then((resp) => resp.json())
        .then((res) => res as boolean);
}
