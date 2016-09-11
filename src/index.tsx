/// <reference path="../typings/index.d.ts" />

import * as React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { SquareButton } from "./bootstrap";

export class Index extends React.Component<any, any> {
    constructor() {
        super();
    }

    render() {
        return <div>
            <Jumbotron>
                <h1>
                    S<small>chedule</small><br />
                    A<small>rrangement for</small><br />
                    Y<small>ou with</small><br />
                    O<small>thers</small>
                </h1>
                <SquareButton href="/login" bsStyle="primary">Login</SquareButton>
            </Jumbotron>
        </div>
    }
}
