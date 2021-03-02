import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {AvField, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";
import {Button, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import {IoMdStar} from "react-icons/io";

class FirstStep extends Component {

  render() {
    const {login, goLogin, activeStep, getInputValue, currentRegUser} = this.props;
    if (activeStep !== 1) { // Prop: The current step
      return null
    }
    return (
      <div className="register-step-content">
        <AvForm>
          <div className="row">
            <div className="col-md-12 first-step-left">
              <AvGroup>
                <label className="field-label  text-secondary">Ism va familiya:
                  <sup> <IoMdStar className="text-danger"/></sup>
                </label>
                <AvField className="form-control-md" name="userName"
                         onChange={getInputValue}
                         defaultValue={currentRegUser.userName ? currentRegUser.userName : ''}
                         validate={{
                           required: {value: true, errorMessage: 'Iltimos,  ismingizni yozing!!!'},
                           minLength: {
                             value: 3,
                             errorMessage: "Sizning ismingiz uzunligi 6 tadan  16 ta belgilargacha iborat bo'lishi kerak"
                           },
                           maxLength: {
                             value: 32,
                             errorMessage: "Sizning ismingiz uzunligi 6 tadan 16 ta belgilargacha iborat bo'lishi kerak"
                           }
                         }}
                         placeholder=""/>
              </AvGroup>
              <AvGroup className="">
                <label className="field-label  text-secondary">Telefon raqam:
                  <sup> <IoMdStar className="text-danger"/></sup>
                </label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend" className="">
                    <InputGroupText style={{"backgroundColor": "#57a6dc"}}
                                    className="text-white font-weight-bold">+998</InputGroupText>
                  </InputGroupAddon>
                  <AvInput className="form-control-md" name="phoneNumber"
                           id="phoneNumber"
                           defaultValue={currentRegUser.phoneNumber ? currentRegUser.phoneNumber : ''}
                           onChange={getInputValue}
                           validate={{
                             required: {value: true, errorMessage: 'Iltimos,  telefon raqam yozish majburiy!!!'},
                             pattern: {
                               value: '[0-9]{9}',
                               errorMessage: 'Misol uchun +998901234567'
                             },
                             minLength: {
                               value: 9,
                               errorMessage: "Uzunligi 9 ta belgidan iborat bo'lishi kerak"
                             },
                             maxLength: {
                               value: 9,
                               errorMessage: "Uzunligi 9 ta belgidan iborat bo'lishi kerak"
                             }
                           }}
                           placeholder=""/>
                </InputGroup>
              </AvGroup>

              <AvGroup>
                <label className="field-label text-secondary">Parol:
                  <sup> <IoMdStar className="text-danger"/></sup>
                </label>
                <AvField className="form-control-md" name="password" type="password"
                         defaultValue={currentRegUser.password ? currentRegUser.password : ''}
                         onChange={getInputValue} placeholder="" validate={{
                  required: {value: true, errorMessage: 'Iltimos, parolni kiriting!!!'},
                  minLength: {
                    value: 6,
                    errorMessage: "Sizning parolingiz uzunligi 6 tadan  16 ta belgilargacha iborat bo'lishi kerak"
                  },
                  maxLength: {
                    value: 16,
                    errorMessage: "Sizning parolingiz uzunligi 6 tadan 16 ta belgilargacha iborat bo'lishi kerak"
                  }
                }}/>
              </AvGroup>
            </div>
          </div>
          <div className="isHaveAccount">
            <span className="text-secondary"> Sizning allaqachon hisobingiz bormi? </span>
            <Button type="button" onClick={goLogin}
                    className="btn bg-white  px-md-2 py-md-0 btn-sm btn-outline-primary">Kirish</Button>
          </div>
        </AvForm>
      </div>
    );
  }
}

FirstStep.propTypes = {};

export default FirstStep;
