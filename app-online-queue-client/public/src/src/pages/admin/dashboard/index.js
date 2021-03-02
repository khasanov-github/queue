import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DashboardLayout from "../../../components/DashboardLayout";
import {Button, Table} from "reactstrap";

class Dashboard extends Component {
  render() {
    return (
      <DashboardLayout pathname={this.props.pathname}>
        <div className="container">
          <div className="row mt-md-5 ">
            <div className="col-md-6">
              <h1>Dashboard</h1>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }
}

Dashboard.propTypes = {};

export default Dashboard;
