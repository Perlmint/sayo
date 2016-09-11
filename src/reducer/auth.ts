/// <reference path="../../typings/index.d.ts" />
import { Action } from "redux";

export interface IState {
    authrozied: boolean
}

const defaultState: IState = {
    authrozied: false
};

export function reducer(state: IState = defaultState, action: Action & any): IState {
    switch (action.type) {
        case SET_AUTHORIZED:
            return Object.assign({}, state, { authorized: true });
        case UNSET_AUTHORIZED:
            return Object.assign({}, state, { authorized: false });
    }
    return state;
}

const SET_AUTHORIZED = "SET_AUTHORIZED";
export function SetAuthorized() {
    return {
        type: SET_AUTHORIZED
    };
}

const UNSET_AUTHORIZED = "UNSET_AUTHORIZED";
export function UnsetAuthorized() {
    return {
        type: UNSET_AUTHORIZED
    };
}