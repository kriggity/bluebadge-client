import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

export default function SiteBar(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Navbar color="light" light expand='md'>
                <NavbarBrand href="/">Home/Brand</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="/user/mygames">My Games</NavLink>
                        </NavItem>
                        {/* <NavItem>
                            <NavLink href="/user/myprofile">My Profile</NavLink>
                        </NavItem> */}
                        {/* <NavItem>
                            <NavLink href="/user/myfriends">My Friends</NavLink>
                        </NavItem> */}
                        <NavItem>
                            <NavLink href="/game/search">Search for Games</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/" onClick={props.clickLogout}>Log Out</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    )
}
