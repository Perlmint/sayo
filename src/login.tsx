/// <reference path="../typings/index.d.ts" />

import * as React from 'react';
import { SquareButton } from "./bootstrap";

export class LoginPage extends React.Component<any, any> {
    constructor() {
        super();
    }

    render() {
        return <SquareButton href="/auth/google" bsStyle="primary">Sign in with Google</SquareButton>
    }
}
