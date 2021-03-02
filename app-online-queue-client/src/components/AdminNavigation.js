import React, {Component} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
  PopoverHeader,
  Row,
  UncontrolledTooltip
} from "reactstrap";
import {connect} from "dva";
import {TOKEN_NAME} from "../constants/constants";
import {router} from "umi";
import logo from "../assets/logo.png";
import menu from "../assets/menu.svg"
import notification from "../assets/notification.svg"
import report from "../assets/warning.svg"

@connect(({globalModel}) => ({globalModel}))
class AdminNavigation extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'globalModel/getNotifs'
    })
    if (window.location.pathname.includes('/admin') || window.location.pathname.includes('/director') || window.location.pathname.includes('/cabinet')) {
      dispatch({
        type: 'globalModel/updateState',
        payload: {isNotifPage: true}
      })
    }
    if (window.location.pathname.includes('/company') || window.location.pathname.includes('/direction')) {
      dispatch({
        type: 'globalModel/updateState',
        payload: {isReportPage: true}
      })
    }

    dispatch({
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
    const {currentUser, isAdmin, isModer, isDirector, isOperator, isReception, popoverOpen, isMenu, isOpenReport, isOpenReportInput, unViews, isNotifPage, isReportPage} = globalModel;
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
    const openReport = () => {
      this.props.dispatch({
        type: 'globalModel/updateState',
        payload: {
          isOpenReport: !isOpenReport
        }
      });
    };
    const sendReport = (v) => {
      console.log(v);
      this.props.dispatch({
        type: 'globalModel/sendReport',
        payload: {
          data: v
        }
      });
    };
    return (
      <div className="admin-menu sticky-top admin-navigation">
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
              <NavLink style={isReportPage ? {display: 'block'} : {display: 'none'}} id="reportTooltip"
                       className="bordered mr-md-3 mr-2 report" onClick={openReport}>
                <img src={report} alt="" width="22px" height="22px" className="img-fluid"/>
                <UncontrolledTooltip placement="bottom" target="reportTooltip">
                  Report
                </UncontrolledTooltip>
              </NavLink>

              <NavItem className={isDirector || isAdmin ? "d-block" : "d-none"}>
                <NavLink id="messageTooltip" className="message-icon" href="/message">
                  <img src={notification} alt="" width="25px" height="25px" className="img-fluid"/>
                  <span style={unViews.length === 0 ? {background: 'black'} : {background: 'red'}}
                        className="badge">{unViews.length}
                  </span>
                </NavLink>
                <UncontrolledTooltip placement="bottom" target="messageTooltip">
                  Messages
                </UncontrolledTooltip>
              </NavItem>


              <NavItem>
                <Button id="PopoverLegacy" type="button"
                        className="bg-transparent border-0 text-white font-weight-bolder">
                  {currentUser.firstName}
                  <UncontrolledTooltip placement="bottom" target="PopoverLegacy">
                    Log out
                  </UncontrolledTooltip>
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

        <Collapse isOpen={isOpenReport}>
          <Container className="py-md-1 py-1">
            <Row className="my-md-1 my-1">
              <Button onClick={() => sendReport(1)} className="btn btn-sm" color="danger">
                Companiya nomida yoki bo'lim nomida siyosatimizga zid bo'lgan so'zlar ishlatilgan
              </Button>
            </Row>
            <Row>
              <Button onClick={() => sendReport(2)} className="btn btn-sm" color="danger">
                Companiya nomida yoki bo'lim nomida so'kinish so'zlari ishlatilgan
              </Button>
            </Row>
            <Row>
              <Button onClick={() => sendReport(3)} className="btn btn-sm" color="danger">
                Companiya nomida yoki bo'lim nomida faxsh so'zlar ishlatilgan
              </Button>
            </Row>
          </Container>
        </Collapse>
        {isNotifPage ?
          <div className="notification" style={unViews.length > 0 ? {display: 'block'} : {display: 'none'}}>
            <Card outline color='danger'>
              <CardHeader className='bg-primary'>
                <h5 className="text-white">Yangi habar</h5>
              </CardHeader>
              <CardBody>
                <p>{unViews.length} ta xabar kelgan</p>
              </CardBody>
            </Card>
          </div>
          :
          ''
        }
      </div>
    );
  }
}

AdminNavigation.propTypes = {};

export default AdminNavigation;
