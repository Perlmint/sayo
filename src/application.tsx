/// <reference path="../typings/index.d.ts" />

import * as React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

interface ApplicationState {
    loggedIn: boolean;
}

export class Application extends React.Component<any, ApplicationState> {
    constructor() {
        super();
    }

    render() {
        return  <div>
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">SAYO</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem href="/import">Import</NavItem>
                        <NavItem href="/arrange">Arrange</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div>
                {this.props.children}
            </div>
        </div>
    }
}
