/// <reference path="../typings/index.d.ts" />
import { createStore, combineReducers, compose, applyMiddleware, Store } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { History } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import { reducers } from './reducer';
export var globalStore: Store<{}> = null;

export function configureStore(history: HistoryModule.History, initialState = {}, reset = false) {
    if (globalStore == null || reset) {
        const reducer = combineReducers({
            routing: routerReducer
        });

        globalStore = createStore(
            reducer,
            initialState,
            compose(
                applyMiddleware(
                    thunkMiddleware,
                    routerMiddleware(history)
                )
            )
        );
    }

    return globalStore;
}
