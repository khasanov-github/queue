import AdminNavigation from "@/components/AdminNavigation";
import {ToastContainer} from 'react-toastify';
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import {connect} from "dva";
import UserNavigation from "../components/UserNavigation";

@connect(({globalModel}) => ({globalModel}))
class BasicLayout extends React.Component {
  render() {
    const {globalModel} = this.props;
    const {currentUser, isReception, isOperator, isAdmin, isModer, isDirector} = globalModel;
    return (
      <div>
        <ToastContainer/>
        {isReception || isAdmin || isModer || isOperator || isDirector ?
          <AdminNavigation/> : (window.location.pathname === "/auth/login" || window.location.pathname === "/auth/register") ? '' :
            <UserNavigation/>
        }
        {this.props.children}
      </div>
    );
  }
}

export default BasicLayout;
