import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from "reactstrap";
import Badge from 'react-bootstrap/Badge';
import {Link} from "react-router-dom";
import {FaUsers, FaUser, FaMapMarkedAlt, FaMicrosoft, FaUserShield, FaUserEdit, FaFileAlt} from 'react-icons/fa';
import {FiMonitor, FiLogOut, FiUserCheck} from 'react-icons/fi';
import {GiBriefcase} from 'react-icons/gi';
import {IoIosMenu} from 'react-icons/io';
import {MdContactMail} from 'react-icons/md';
import {AiOutlineTeam, AiFillDashboard, AiOutlineMenu} from 'react-icons/ai';
import {connect} from "dva";

@connect(({globalModel}) => ({globalModel}))
class DashboardSidebar extends Component {
  render() {
    const {globalModel} = this.props;
    const {currentUser, isAdmin, isModer, isReception, isOperator, isDirector, message} = globalModel;
    return (
      <div className="custom-sidebar">
        <div className="menuSidebar">
          <div className="userStatus text-center text-white">

          </div>
          <ListGroup className="">
            <ListGroupItem className="">
              <Link to="/"
                    className="nav-link">
                <AiFillDashboard className="list-group-item-icon"/> Dashboard</Link>
            </ListGroupItem>

            <ListGroupItem className="d-block">
              <Link to="/category"
                    className="nav-link">
                <IoIosMenu className="list-group-item-icon"/> Kategoriyalar</Link>
            </ListGroupItem>

            <ListGroupItem className="d-block">
              <Link to="/maps"
                    className="nav-link">
                <FaMapMarkedAlt className="list-group-item-icon"/> Hududlar</Link>
            </ListGroupItem>

            <ListGroupItem className="d-block">
              <Link to="/direction"
                    className="nav-link">
                <FaUserShield className="list-group-item-icon"/> Moderatorlar</Link>
            </ListGroupItem>
            <ListGroupItem className="d-block">
              <Link to="/company"
                    className="nav-link">
                <GiBriefcase className="list-group-item-icon"/> Kompaniyalar</Link>
            </ListGroupItem>
            <ListGroupItem className="d-block">
              <Link to="/direction"
                    className="nav-link">
                <FaMicrosoft className="list-group-item-icon"/> Bo'limlar</Link>
            </ListGroupItem>
            <ListGroupItem className="d-block">
              <Link to="/direction"
                    className="nav-link">
                <FiUserCheck className="list-group-item-icon"/> Receptionlar</Link>
            </ListGroupItem>
            <ListGroupItem className="d-block">
              <Link to="/moderator"
                    className="nav-link">
                <FaUsers className="list-group-item-icon"/> Operatorlar</Link>
            </ListGroupItem>
            <ListGroupItem className="d-block">
              <Link to="/reception"
                    className="nav-link">
                <AiOutlineTeam className="list-group-item-icon"/> Navbatlar</Link>
            </ListGroupItem>




          </ListGroup>
        </div>


      </div>
    );
  }
}

DashboardSidebar.propTypes = {};

export default DashboardSidebar;
