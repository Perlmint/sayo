/// <reference path="../typings/index.d.ts" />
import * as React from 'react';
import { push } from 'react-router-redux'
import { globalStore } from './store';

export function RouteClick() {
    return (e: React.MouseEvent) => {
        globalStore.dispatch(push((e.target as HTMLAnchorElement).pathname));
        e.preventDefault();
    };
}
