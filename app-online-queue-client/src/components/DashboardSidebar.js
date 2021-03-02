import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from "reactstrap";
import Badge from 'react-bootstrap/Badge';
import {Link} from "react-router-dom";
import {FaUsers, FaUser, FaMapMarkedAlt, FaMicrosoft, FaUserShield, FaUserEdit, FaFileAlt} from 'react-icons/fa';
import {FiMonitor, FiLogOut} from 'react-icons/fi';
import {GiBriefcase} from 'react-icons/gi';
import {IoIosMenu} from 'react-icons/io';
import {MdContactMail} from 'react-icons/md';
import {AiOutlineTeam, AiFillDashboard, AiOutlineMenu} from 'react-icons/ai';
import {connect} from "dva";

@connect(({globalModel}) => ({globalModel}))
class DashboardSidebar extends Component {
  render() {
    const {globalModel} = this.props;
    const {currentUser, isAdmin, isModer, isReception, isOperator, isDirector, message, isMenu} = globalModel;
    return (
      <div style={{"width": isMenu ? "17%" : "0%"}} className="katalog-sidebar ">
        <div style={{"width": isMenu ? "17%" : "0%"}} className="menuSidebar">
          <div className="userStatus text-center text-white">
            <h5 className="">{currentUser.firstName}</h5>
            <div className="m-auto w-25">
              <h6>Online</h6>
            </div>
          </div>
          <ListGroup className="">
            <ListGroupItem
              className={isAdmin || isDirector || isModer || isOperator || isReception ? "d-block" : "d-none"}>
              <Link to="/admin/dashboard"
                    className={window.location.pathname === "/admin/dashboard" ? "active-katalog nav-link" : "nav-link"}>
                <AiFillDashboard className="list-group-item-icon"/> Dashboard</Link>
            </ListGroupItem>
            <ListGroupItem className={isAdmin ? "d-block" : "d-none"}>
              <Link to="/admin/category"
                    className={window.location.pathname === "/admin/category" ? "active-katalog nav-link" : "nav-link"}>
                <IoIosMenu className="list-group-item-icon"/> Kategoriyalar</Link>
            </ListGroupItem>
            <ListGroupItem className={isAdmin ? "d-block" : "d-none"}>
              <Link to="/admin/map"
                    className={window.location.pathname === "/admin/map" ? "active-katalog nav-link" : "nav-link"}>
                <FaMapMarkedAlt className="list-group-item-icon"/> Hududlar</Link>
            </ListGroupItem>
            <ListGroupItem className={isAdmin ? "d-block" : "d-none"}>
              <Link to="/admin/moderator"
                    className={window.location.pathname === "/admin/moderator" ? "active-katalog nav-link" : "nav-link"}>
                <FaUserShield className="list-group-item-icon"/> Moderatorlar</Link>
            </ListGroupItem>
            <ListGroupItem className={isAdmin ? "d-block" : "d-none"}>
              <Link to="/admin/company"
                    className={window.location.pathname === "/admin/company" ? "active-katalog nav-link" : "nav-link"}>
                <GiBriefcase className="list-group-item-icon"/> Kompaniyalar</Link>
            </ListGroupItem>
            <ListGroupItem className={isDirector ? "d-block" : "d-none"}>
              <Link to="/admin/direction"
                    className={window.location.pathname === "/admin/direction" ? "active-katalog nav-link" : "nav-link"}>
                <FaMicrosoft className="list-group-item-icon"/> Bo'limlar</Link>
            </ListGroupItem>
            <ListGroupItem className={isDirector ? "d-block" : "d-none"}>
              <Link to="/admin/reception"
                    className={window.location.pathname === "/" ? "active-katalog nav-link" : "nav-link"}>
                <FaUserShield className="list-group-item-icon"/> Receptionlar</Link>
            </ListGroupItem>
            <ListGroupItem className={isDirector || isReception ? "d-block" : "d-none"}>
              <Link to="/admin/operator"
                    className={window.location.pathname === "/moderator" ? "active-katalog nav-link" : "nav-link"}>
                <FaUsers className="list-group-item-icon"/> Operatorlar</Link>
            </ListGroupItem>
            <ListGroupItem
              className={isAdmin || isDirector || isModer || isOperator || isReception ? "d-block" : "d-none"}>
              <Link to="/admin/queue"
                    className={window.location.pathname === "/reception" ? "active-katalog nav-link" : "nav-link"}>
                <AiOutlineTeam className="list-group-item-icon"/> Navbatlar</Link>
            </ListGroupItem>
            <ListGroupItem
              className={!isAdmin && (isDirector || isModer || isOperator || isReception) ? "d-block" : "d-none"}>
              <Link to={isOperator?`/operator/kiosk`:`/admin/kiosk`}
                    className={window.location.pathname === "/operator" ? "active-katalog nav-link" : "nav-link"}><FiMonitor
                className="list-group-item-icon"/> Kiosk</Link>
            </ListGroupItem>
            <ListGroupItem className={isDirector ? "d-block" : "d-none"}>
              <Link to=""
                    className={window.location.pathname === "/admin/contact" ? "active-katalog nav-link" : "nav-link"}>
                <FaFileAlt className="list-group-item-icon"/> Bog'lanish</Link>
            </ListGroupItem>
            <ListGroupItem className={isAdmin || isDirector ? "d-block" : "d-none"}>
              <Link to=""
                    className={window.location.pathname === "/operator" ? "active-katalog nav-link" : "nav-link"}>
                <MdContactMail className="list-group-item-icon"/>
                {isAdmin ? " Bog'lanish " : isDirector ? " Bildirishnoma " : ""}
                <Badge className="ml-sm-2 ml-md-4 " variant={!message ? "secondary"
                  : "primary"}> {message}</Badge>
              </Link>
            </ListGroupItem>
            <ListGroupItem
              className={isAdmin || isDirector || isModer || isOperator || isReception ? "d-block" : "d-none"}>
              <Link to="/admin/profil"
                    className={window.location.pathname === "/operator" ? "active-katalog nav-link" : "nav-link"}>
                <FaUserEdit className="list-group-item-icon"/> Profil</Link>
            </ListGroupItem>
            <ListGroupItem className={isAdmin || isDirector ? "d-block" : "d-none"}>
              <Link to=""
                    className={window.location.pathname === "/operator" ? "active-katalog nav-link" : "nav-link"}>
                <FaFileAlt className="list-group-item-icon"/> Hisobot</Link>
            </ListGroupItem>
          </ListGroup>
        </div>
      </div>
    );
  }
}

DashboardSidebar.propTypes = {};

export default DashboardSidebar;
