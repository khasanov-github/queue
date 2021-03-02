import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CustomerLayout from "../../../components/CustomerLayout";
import {connect} from "dva";



import CarouselPage from "../../../components/CarouselPage";


@connect(({globalModel}) => ({globalModel}))
class Customer extends Component {

  render() {


    return (


      <div>


        {/*<CustomerLayout pathname={this.props.pathname}>*/}
        {/*  <CarouselPage/>*/}



        {/*</CustomerLayout>*/}


      </div>
    );
  }
}

Customer.propTypes = {};

export default Customer;
