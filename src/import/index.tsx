/// <reference path="../../typings/index.d.ts" />

import * as React from 'react';
import { ImportEveryTime } from './et';

export class ImportIndex extends React.Component<any, any> {
    render() {
        return <ul>
            <li>
                <ImportEveryTime />
            </li>
        </ul>
    }
}
