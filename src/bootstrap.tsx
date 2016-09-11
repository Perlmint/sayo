/// <reference path="../typings/index.d.ts" />

import * as React from 'react';
import { Button, ButtonProps } from 'react-bootstrap';

export interface SquareButtonProps extends ButtonProps {
    bsStyle: "primary" | "warning";
};

interface SquareButtonState {
};

export class SquareButton extends React.Component<SquareButtonProps, SquareButtonState> {
    render() {
        return <Button {...this.props} className="btn-raised">{this.props.children}</Button>
    }
}
