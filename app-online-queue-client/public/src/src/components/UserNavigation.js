import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Container, DropdownItem, DropdownMenu, DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from "reactstrap";

class UserNavigation extends Component {
  render() {
    return (
      <div className="admin-menu user-navigation">
        <Container>
          <Navbar light expand="md">
            <NavbarBrand href="/">
              <img src="/assets/logo/logo.svg" alt=""/>
            </NavbarBrand>

            <Collapse  navbar>

              <Nav className="ml-5" navbar>
                <NavItem>
                  <NavLink href="/input">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/sells">Features</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/catalog/brand">Contact</NavLink>
                </NavItem>
              </Nav>

              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink>Menu</NavLink>
                </NavItem>
              </Nav>

            </Collapse>
          </Navbar>
        </Container>
      </div>
    );
  }
}

UserNavigation.propTypes = {};

export default UserNavigation;
