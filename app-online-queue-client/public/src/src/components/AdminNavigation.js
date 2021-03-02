import React, {Component} from 'react';
import {
  Button,
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink, Popover, PopoverBody, PopoverHeader,
  UncontrolledDropdown
} from "reactstrap";
import PropTypes from 'prop-types';
import {connect} from "dva";
import {TOKEN_NAME} from "../constants/constants";
import {router} from "umi";
import logo from "../assets/logo.png";
import menu from "../assets/menu.svg"
import {IoIosNotificationsOutline} from "react-icons/io";

@connect(({globalModel}) => ({globalModel}))
class AdminNavigation extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'globalModel/updateState',
      payload: {
        popoverOpen: false
      }
    });
  }

  constructor() {
    super();
    this.state = {
      isOpen: false,
    }
  }

  render() {
    const {globalModel} = this.props;
    const {currentUser, isAdmin, isModer, isDirector, isOperator, isReception, popoverOpen, isMenu} = globalModel;
    const toggle = () => {
      this.state.isopen = !this.state.isopen;
      this.setState(this.state.isopen);
    };
    const togglePopover = () => {
      this.props.dispatch({
        type: 'globalModel/updateState',
        payload: {
          popoverOpen: !popoverOpen
        }
      });
    };
    const openMenu = () => {
      this.props.dispatch({
        type: 'globalModel/updateState',
        payload: {
          isMenu: !isMenu
        }
      });
    };
    const logOut = () => {
      localStorage.removeItem(TOKEN_NAME);
      this.props.dispatch({
        type: 'globalModel/updateState',
        payload: {
          currentUser: '',
          isAdmin: '',
          isDirector: '',
          isModer: '',
          isReception: '',
          isOperator: '',
          popoverOpen: false
        }
      });
      router.push("/auth/login");
    };

    return (
      <div className="admin-menu admin-navigation">
        <Navbar light expand="md" className="m-0 p-0 ml-3 admin-navbar">
          {isMenu ?
            <NavbarBrand href="/" className="mr-5">
              <img src={logo} alt="" className="img-fluid" width="180px" height="60px"/>
            </NavbarBrand>
            : ""}
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink onClick={openMenu}>
                  <img src={menu} alt="" width="20px" height="10px" className="img-fluid"/>
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              <NavItem className={isDirector ? "d-block" : "d-none"}>
                <NavLink className="bg-white" href=""><IoIosNotificationsOutline/></NavLink>
              </NavItem>
              <NavItem>
                <Button id="PopoverLegacy" type="button"
                        className="bg-transparent border-0 text-white font-weight-bolder">
                  {currentUser.firstName}
                </Button>
                <Popover className="popoverProfile bg-danger" placement="bottom" isOpen={popoverOpen}
                         target="PopoverLegacy" toggle={togglePopover}>
                  <PopoverBody className="pb-md-5 pt-md-5">
                    <h6 className="text-center px-md-4">
                      {currentUser.firstName} {currentUser.lastName}
                    </h6>
                    <h6 className="text-center p-0">
                      {currentUser.phoneNumber}
                    </h6>
                  </PopoverBody>
                  <PopoverHeader className=""><Button className="" onClick={logOut}>Chiqish</Button></PopoverHeader>
                </Popover>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

AdminNavigation.propTypes = {};

export default AdminNavigation;
