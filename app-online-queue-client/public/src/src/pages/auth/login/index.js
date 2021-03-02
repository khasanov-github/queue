import React, {Component} from 'react';
import {AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation'
import {connect} from "dva";
import {Button, InputGroup, InputGroupAddon, InputGroupText, Label} from "reactstrap";
import UserNavigation from "../../../components/UserNavigation";
import {router} from "umi";
import {IoMdStar} from "react-icons/io";

@connect(({globalModel}) => ({globalModel}))
class Login extends Component {
  componentDidMount() {
    const {dispatch, globalModel} = this.props;
    const {currentUser, isReception, isOperator, isAdmin, isModer, isDirector} = globalModel;
    if (isReception || isOperator || isAdmin || isModer || isDirector) {
      router.push("/admin")
    }
  }

  render() {
    const {dispatch, globalModel} = this.props;
    const {currentUser, isReception, isOperator, isAdmin, isModer, isDirector} = globalModel;
    if (isReception || isOperator || isAdmin || isModer || isDirector) {
      router.push("/admin")
    }
    const login = (e, v) => {
      v.phoneNumber = "+998" + v.phoneNumber;
      this.props.dispatch({
        type: 'globalModel/login',
        payload: {
          ...v
        }
      })
    };
    const goRegister = () => {
      router.push("/auth/register");
    };
    return (
      <div className=" sign-in-page" style={{}}>
        <div className="sing-in-block">
          <div className="container ">
            <div className="row pt-md-5">
              <div className="col-md-4 offset-4 login-logo-block">
                <div id="u162_text" className="text-center">
                  <p>
                    <span className="login-logo-left">Online</span>
                    <span className="login-logo-top">N</span>
                    <span className="login-logo-right">avbat</span>
                  </p>
                </div>
              </div>
              <div className="col-md-4 login-block mt-md-5 py-md-5 px-md-4 offset-4 rounded">
                <h3 className="text-center login-top-block rounded">Hisobga kirish</h3>
                <AvForm onValidSubmit={login}>
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
                               validate={{
                                 required: {value: true, errorMessage: 'Telefon raqamingizni kiritng!!!'},
                                 pattern: {
                                   value: '[0-9]{9}',
                                   errorMessage: 'Faqat raqamlar'
                                 },
                                 minLength: {
                                   value: 9,
                                   errorMessage: "Uzunligi 9 ta belgidan iborat bo'lishi kerak"
                                 },
                                 maxLength: {
                                   value: 9,
                                   errorMessage: "Uzunligi 9 ta belgidan iborat bo'lishi kerak"
                                 }
                               }}/>
                    </InputGroup>
                  </AvGroup>

                  <AvGroup>
                    <label className="field-label text-secondary">Parol:</label>
                    <AvField className="form-control-md" type="password" name="password"
                             errorMessage={"Parolingizni kiriting!"} required/>
                  </AvGroup>
                  <Button className="btn btn-md btn-block my-md-4 border-0">Kirish</Button>
                  <div className="row">
                    <div className="col-md-6 pr-1">
                      <Button type="button" className="btn bg-white btn-sm btn-outline-primary">Parolni
                        unutdingizmi?</Button>
                    </div>
                    <div className="col-md-6 text-right pl-1">
                      <Button onClick={goRegister} className="btn bg-white btn-sm btn-outline-primary">Ro'yhatdan
                        o'tish</Button>
                    </div>
                  </div>
                </AvForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {};

export default Login;
