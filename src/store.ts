/// <reference path="../typings/index.d.ts" />
import { createStore, combineReducers, compose, applyMiddleware, Store } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { History } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import { reducers, IState as IReducerState } from './reducer';

interface IState {
    routing: {
        locationBeforeTransitions: {
            action: "POP" | "PUSH",
            hash: string,
            key: string,
            pathname: string,
            query: {
                [key:string]: string
            },
            search: string,
            state: any
        }
    },
    reducers: IReducerState
};

export var store: Store<IState> = null;

export function configureStore(history: HistoryModule.History, initialState: any = {}, reset = false) {
    if (store == null || reset) {
        const reducer = combineReducers<IState>({
            routing: routerReducer,
            reducers
        });

        store = createStore<IState>(
            reducer,
            initialState,
            compose(
                applyMiddleware(
                    thunkMiddleware,
                    routerMiddleware(history)
                )
            ) as any
        );
    }

    return store;
}
