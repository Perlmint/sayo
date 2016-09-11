/// <reference path="../typings/index.d.ts" />

import * as React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { SquareButton } from "./bootstrap";

export class LoginPage extends React.Component<any, any> {
    constructor() {
        super();
    }

    render() {
        return <Jumbotron>
            <h1>S<small>chedule</small> A<small>rrangement for </small>Y<small>ou with </small>O<small>thers</small></h1>
            <SquareButton href="/auth/google" bsStyle="primary">Sign in with Google</SquareButton>
        </Jumbotron>
    }
}
