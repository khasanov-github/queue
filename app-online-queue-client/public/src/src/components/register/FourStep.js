import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {AvField, AvForm} from "availity-reactstrap-validation";

class FourStep extends Component {

  render() {
    const {login, activeStep,  currentRegUser, getInputValue} = this.props;
    if (activeStep !== 4) { // Prop: The current step
      return null
    }
    return (
      <div className="register-step-content">
        <AvForm onValidSubmit={login}>
          <div className="row">
            <div className="col-md-12">
              <div className="sending-message">
                <h6 className="font-small font-weight-light">Hurmatli ro'yhatdan o'tuvchi
                  shaxsingizni tasdiqlashinigiz uchun
                  sizning <b
                    className="font-weight-bold">{currentRegUser.phoneNumber ? "+998" + currentRegUser.phoneNumber : " 00000 "}</b> telefon
                  raqamigizga tasdiqlash kodini yuborildi. Tasdiqlash kodini quyidagi
                  qatorga kiriting:</h6>
              </div>
            </div>

            <div className="col-md-7 mx-auto mt-md-3">
              <div className="countDownBlock " id="countDownBlock"></div>
              <div className="mx-auto" id="verify-input-form">
                <AvField type="text" className="verifyCode font-weight-bold" id="verifyCode" name="verifyCode"
                         autoFocus
                         onChange={getInputValue}
                         validate={{
                           required: {value: true, errorMessage: 'Tasdiqlash kodinin yozish majburiy!!!'},
                           pattern: {
                             value: '[0-9]{6}',
                             errorMessage: 'Faqat raqamlar'
                           },
                           minLength: {
                             value: 6,
                             errorMessage: "Uzunligi 6 ta belgidan iborat bo'lishi kerak"
                           },
                           maxLength: {
                             value: 6,
                             errorMessage: "Uzunligi 6 ta belgidan iborat bo'lishi kerak"
                           }
                         }}/>
              </div>
            </div>
          </div>
        </AvForm>
      </div>
    );
  }
}

FourStep.propTypes = {};

export default FourStep;
