import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormFeedback,
  FormGroup, FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Row,
  UncontrolledDropdown
} from "reactstrap";
import StaticComponents from "./StaticComponents";
import {AvField, AvForm} from "availity-reactstrap-validation";
// import {Col, Container, Row} from "reactstrap";
import image from "../../public/assets/image_4_u51.jpg"
import image1 from "../../public/assets/univ.jpg"
import logo from "../../public/assets/u77.svg";
import logotype from "../../public/assets/logo_on.png"
import CustomerSidebar from "../components/CustomerSidebar";
import * as ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import phoneImg from "../../public/assets/iphonexmockup.png"
import CarouselPage from "./CarouselPage";


class UserNavigation extends Component {


  render() {


    // const opts = {
    //   height: '390',
    //   width: '600',
    //   playerVars: { // https://developers.google.com/youtube/player_parameters
    //     autoplay: 0
    //   }
    // };


    return (
      <div className="head-nav">

        <Navbar light expand="md">
          <NavbarBrand href="">
            <img src={logotype} alt="" className="img-fluid" width="180px" height="60px"/>
          </NavbarBrand>

          <div className="navs mx-md-5 mx-sm-2">
            <span className="active"></span>
            <Button className="button" size="md" href="/company">Biznes</Button>
            <Button className="button px-4" size="md" href="/cabinet">Mijoz</Button>
          </div>

          <Collapse navbar>

            <Nav className="mx-auto" navbar>
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
              <NavItem className="mr-5 search-input">
                <InputGroup>
                  <Input/>
                  <InputGroupAddon addonType="append">
                    <Button color="primary">Search</Button>
                  </InputGroupAddon>
                </InputGroup>

              </NavItem>
            </Nav>

            <Button color="primary">
              <Link className="login-link" to={"auth/login"}>Login</Link>
            </Button>

            <UncontrolledDropdown>
              <DropdownToggle nav caret color="primary">
                Uz
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  Uz
                </DropdownItem>
                <DropdownItem>
                  Ru
                </DropdownItem>
                <DropdownItem>
                  En
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Collapse>
        </Navbar>

        {/*<CustomerSidebar/>*/}


        <CarouselPage/>
      </div>

    )
  }
}

UserNavigation.propTypes = {};

export default UserNavigation;
