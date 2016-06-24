/// <reference path="../typings/index.d.ts" />

import * as React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';

export class LoginPage extends React.Component<any, any> {
    constructor() {
        super();
    }

    render() {
        return <Jumbotron>
            <h1>S<small>chedule</small> A<small>rrangement for </small>Y<small>ou with </small>O<small>thers</small></h1>
            <Button href="/auth/google">Sign in with Google</Button>
        </Jumbotron>
    }
}
