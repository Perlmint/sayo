/// <reference path="../typings/index.d.ts" />
import * as React from 'react';
import { push } from 'react-router-redux'
import { store } from './store';

export function RouteClick() {
    return (e: React.MouseEvent) => {
        store.dispatch(push((e.target as HTMLAnchorElement).pathname));
        e.preventDefault();
    };
}
