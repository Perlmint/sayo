/// <reference path="../typings/index.d.ts" />

import { combineReducers } from 'redux'
import { reducer as auth, IState as IAuthState } from "./reducer/auth";

export interface IState {
    auth: IAuthState
}

export const reducers = combineReducers<IState>({
    auth
});