/// <reference path="../../typings/index.d.ts" />

import * as React from 'react';
import { ImportEveryTime } from './et';
import { ListGroup, ListGroupItem } from "react-bootstrap";

export class ImportIndex extends React.Component<any, any> {
    render() {
        return <ListGroup>
            <ListGroupItem>
                <ImportEveryTime />
            </ListGroupItem>
        </ListGroup>
    }
}
