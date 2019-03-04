import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toastr from 'toastr';
import {Auth} from "../../api/auth";

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logout() {
        Auth.logout();
        toastr.success('You were successfully logged out.');
    }

    render() {
        return (
            <div>
                <Navbar light expand="md" className="bg-carShop">
                    <img src={require('../../logo.png')} width="5%" alt="logo"/>
                    <NavbarBrand>Instakilogram</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link to="/" className="nav-link"><FontAwesomeIcon icon="home"/> Home</Link>
                            </NavItem>
                            {!Auth.isLoggedIn() ?
                                <NavItem>
                                    <Link to="/login" className="nav-link">Sign in</Link>
                                </NavItem>
                                : null}
                            {!Auth.isLoggedIn() ? (
                                <NavItem>
                                    <Link to="/register" className="nav-link">Sign up</Link>
                                </NavItem>
                            ) : null}
                            {Auth.isLoggedIn() ? (
                                <NavItem>
                                    <Link to="/findFriends" className="nav-link"><FontAwesomeIcon icon="user-friends"/> Find friends</Link>
                                </NavItem>
                            ) : null}
                            {Auth.isLoggedIn() ? (
                                <NavItem>
                                    <Link to="/posts/create" className="nav-link"><FontAwesomeIcon icon="plus"/> Add post</Link>
                                </NavItem>
                            ) : null}
                            {Auth.isLoggedIn() ? (
                                <NavItem>
                                    <Link to={"/profile/" + Auth.getUserId()} className="nav-link"><FontAwesomeIcon icon="user"/> {Auth.getUsername()}</Link>
                                </NavItem>
                            ) : null}
                            {Auth.isAdmin() ? (
                                <NavItem>
                                    <Link to="/admin/users" className="nav-link"><FontAwesomeIcon icon="user-edit"/> Manage Users</Link>
                                </NavItem>
                            ) : null}
                            {Auth.isLoggedIn() ? (
                                <NavItem>
                                    <Link to="/login" onClick={this.logout} className="nav-link"><FontAwesomeIcon icon="sign-out-alt"/> Sign out</Link>
                                </NavItem>
                            ) : null}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Header;
