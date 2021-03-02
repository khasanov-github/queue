import React, {Component} from 'react';
import {connect} from "dva";
import DashboardLayout from "../../components/DashboardLayout";

@connect(({globalModel}) => ({globalModel}))
class Cabinet extends Component {
  render() {
    const {currentUser, isAdmin, isModer} = this.props.globalModel;
    console.log(currentUser);
    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          <h6 className="m-5 ml-0 font-weight-normal"> Assalomu Aleykum!
            <b> {currentUser.firstName}</b>
            <br/>
            Boshqaruv paneliga xush kelibsiz!</h6>
        </DashboardLayout>
      </div>
    );
  }
}

Cabinet.propTypes = {};

export default Cabinet;
