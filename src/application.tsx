/// <reference path="../typings/index.d.ts" />

import * as React from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { RouteClick } from "./util";

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
                        <a href="/" onClick={RouteClick()}>SAYO</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav activeHref={this.props.location.pathname}>
                        <NavItem href="/import" onClick={RouteClick()}>
                            Import
                        </NavItem>
                        <NavItem href="/arrange" onClick={RouteClick()}>
                            Arrange
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div>
                {this.props.children}
            </div>
        </div>
    }
}
