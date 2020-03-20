import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default function SiteBar(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Navbar color="dark" dark expand='sm'>
                <Link to="/" className="navbar-brand">My Game Library</Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <Link to="/user/mygames">My Games</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/user/myaccount">My Account</Link>
                        </NavItem>
                        {/* <NavItem>
                            <Link to="/user/myfriends">My Friends</Link>
                        </NavItem> */}
                        <NavItem>
                            <Link to="/game/search">Search for Games</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/" onClick={props.clickLogout}>Log Out</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    )
}
