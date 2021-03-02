import React, {Component} from 'react';
import {connect} from "dva";
import 'bootstrap/dist/css/bootstrap.min.css';

@connect(({globalModel}) => ({globalModel}))
class Cabinet extends Component {
  render() {
    const {currentUser, isAdmin, isModer} = this.props.globalModel;

    return (
      <div style={currentUser ? {"background-color": "info"} : ''}>
        <h1>Home page</h1>
        {currentUser ? <h1>Mening navbatlarim</h1> : ''}
      </div>
    );
  }
}

Cabinet.propTypes = {};

export default Cabinet;
