import React, {Component} from 'react';
import {Button} from "reactstrap";
import {FaCheck, FaLongArrowAltLeft, FaLongArrowAltRight} from "react-icons/fa";
import {connect} from "dva";
import {router} from "umi";
import FirstStep from "../../../components/register/FirstStep";
import SecondStep from "../../../components/register/SecondStep";
import ThreeStep from "../../../components/register/ThreeStep";
import FourStep from "../../../components/register/FourStep";
import {IoMdStar} from "react-icons/io";
import moment from "moment";
import {toast} from "react-toastify";

@connect(({globalModel, registerModel}) => ({globalModel, registerModel}))
class Register extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'registerModel/updateState',
      payload: {
        activeStep: 1,
        sNext: false,
        checked: false,
        photoId: '',
        logoUrl: '',
        currentRegUser: [],
        coords: [41.369037, 69.299512]
      }
    });
    dispatch({
      type: 'globalModel/updateState',
      payload: {
        photoUrl: '',
      }
    });
    dispatch({
      type: 'globalModel/getItems',
      payload: {
        type: 'category'
      }
    });
    dispatch({
      type: 'globalModel/getItems',
      payload: {
        type: 'region'
      }
    });
  }

  render() {
    const steps = [{title: 'Stage - 1'}, {title: 'Stage - 2'}, {title: 'Stage - 3'}, {title: 'Stage - 4'}];
    const {dispatch, registerModel, globalModel} = this.props;
    const {activeStep, logoUrl, coords, currentRegUser} = registerModel;
    const {categories, regions, districts} = globalModel;
    const getDistrictsByRegion = (e) => {
      dispatch({
        type: 'globalModel/getDistrictsByRegion',
        payload: {
          region_id: e.target.value
        }
      })
    };
    const onMapClick = (event) => {
      dispatch({
        type: 'registerModel/updateState',
        payload: {
          coords: event.get("coords")
        }
      });
      document.getElementById("lat").value = coords[0];
      document.getElementById("lang").value = coords[1];
    };
    const handleOnClickStepper = (step) => {
      dispatch({
        type: 'registerModel/updateState',
        payload: {
          activeStep: step
        }
      });
    };
    const downloadPhoto = (e) => {
      dispatch({
        type: 'registerModel/downloadPhoto',
        payload: {
          file: e.target.files[0]
        }
      })
    };
    const register = (e) => {
      let name = currentRegUser.userName;
      let shortNumber = name.indexOf(" ");
      let firstName = shortNumber > 0 ? name.substring(0, shortNumber) : name;
      let lastName = shortNumber > 0 ? name.substring(shortNumber + 1) : name;
      currentRegUser.reqUser = {
        firstName: firstName, lastName: lastName, password: currentRegUser.password,
        prePassword: currentRegUser.password, phoneNumber: ("+998" + currentRegUser.phoneNumber)
      }
      currentRegUser.prePassword = currentRegUser.password;
      currentRegUser.reqContact = {
        districtId: currentRegUser.district, address: currentRegUser.address,
        lat: currentRegUser.lat, lng: currentRegUser.lang
      }
      let logoIdIndex = logoUrl.indexOf("attachment/");
      currentRegUser.logoId = logoUrl.substring(logoIdIndex + 11);
      console.log(currentRegUser);
      dispatch({
        type: 'registerModel/register',
        payload: {
          ...currentRegUser,
        }
      })
    }
    const handleOnClickNext = () => {
      let isOk = false;
      let inputList = {};
      switch (activeStep) {
        case 1:
          let userName = currentRegUser.userName;
          let password = currentRegUser.password ? currentRegUser.password.length > 5 ? currentRegUser.password : "" : "";
          let phoneNumber = currentRegUser.phoneNumber ?
            currentRegUser.phoneNumber.length == 9 ?
              parseInt(currentRegUser.phoneNumber) : "" : "";
          phoneNumber = phoneNumber.toString().length == 9 ? phoneNumber : "";
          inputList = {password, userName, phoneNumber};
          if (phoneNumber && password && userName) {
            phoneNumber = "+998" + phoneNumber;
            dispatch({
              type: 'registerModel/isHave',
              payload: {
                phoneNumber: phoneNumber,
                contentType: "phoneNumber"
              }
            })
          } else {
            for (let inputListKey in inputList) {
              if (inputList[inputListKey]) {
                document.getElementsByName("" + inputListKey)[0].style.borderColor = "#cccccc";
              } else {
                document.getElementsByName("" + inputListKey)[0].style.borderColor = "red";
              }
            }
            isOk = true;
          }
          break;
        case 2:
          let name = currentRegUser.name;
          let tin = currentRegUser.tin ?
            currentRegUser.tin.length == 9 ?
              currentRegUser.tin : "" : "";
          let companyPhoto = logoUrl;
          if (companyPhoto && tin && name) {
            dispatch({
              type: 'registerModel/isHave',
              payload: {
                companyTin: tin,
                contentType: "companyTin"
              }
            })
            dispatch({
              type: 'registerModel/isHave',
              payload: {
                companyName: name,
                contentType: "companyName"
              }
            })
          } else {
            if (!Number.isInteger(tin)) {
              document.getElementById("companyTin").style.border = "2px solid red"
            }
            inputList = {name, tin, companyPhoto};
            for (let inputListKey in inputList) {
              if (inputList[inputListKey]) {
                document.getElementsByName("" + inputListKey)[0].style.borderColor = "#cccccc";
              } else {
                document.getElementsByName("" + inputListKey)[0].style.borderColor = "red";
              }
            }
            isOk = true;
          }
          break;
        case 3:
          let district = currentRegUser.district;
          let address = currentRegUser.address;
          let lat = document.getElementById("lat").value;
          let lang = document.getElementById("lang").value;
          currentRegUser.lat = lat;
          currentRegUser.lang = lang;
          if (district && address && lat && lang) {
            let nextStep = activeStep + 1;
            dispatch({
              type: 'registerModel/updateState',
              payload: {
                activeStep: nextStep
              }
            });
          } else {
            inputList = {district, address, lat, lang};
            for (let inputListKey in inputList) {
              if (inputList[inputListKey]) {
                document.getElementsByName("" + inputListKey)[0].style.borderColor = "#cccccc";
              } else {
                document.getElementsByName("" + inputListKey)[0].style.borderColor = "red";
              }
            }
            isOk = true;
          }
          break;
        case 4:
          router.push("/auth/login");
          break;
      }
      if (isOk) {
        toast.error("Iltimos! Ma'lumotlarni kiriting!");
      }
    };
    const handleOnClickBack = () => {
      let prevStep = activeStep - 1;
      dispatch({
        type: 'registerModel/updateState',
        payload: {
          activeStep: prevStep
        }
      });
    };
    const login = (e, v) => {
      dispatch({
        type: 'globalModel/login',
        payload: {
          ...v
        }
      })
    };
    const getInputValue = (e) => {
      let targetName = "" + e.target.name;
      if (targetName == "verifyCode" && e.target.value != "123456") {
        if (e.target.value.length > 5) {
          document.getElementById("verifyCode").style.border = "1px solid red"
        } else {
          document.getElementById("verifyCode").style.border = "1px solid #cccccc"
        }
      }
      if (targetName == "verifyCode" && e.target.value == "123456") {
        register();
      }
      currentRegUser[targetName] = e.target.value;
      this.props.dispatch({
        type: 'registerModel/updateState',
        payload: {
          currentRegUser: currentRegUser
        }
      });
    };
    const goLogin = () => {
      router.push("/auth/login");
    };
    return (
      <div className=" sign-in-page" style={{}}>
        <div className="sing-in-block">
          <div className="container ">
            <div className="row">
              <div className="col-md-4 offset-md-4 login-logo-block">
                <div id="u162_text" className="text-center">
                  <p>
                    <span className="login-logo-left">Online</span>
                    <span className="login-logo-top">N</span>
                    <span className="login-logo-right">avbat</span>
                  </p>
                </div>
              </div>
              <div className="col-md-5 mx-auto mt-md-3 mb-md-5 register-step-block">
                {steps.map((item, i) =>
                  <div className={i + 1 !== 4 ? "step-block" : " step-block step-second-block"}>
                    {i + 1 === 4 ?
                      <div className={activeStep > (i + 1) ?
                        "step finish step" + (i + 1) : (activeStep === (i + 1)
                          ? "step active step" + (i + 1) : "step step" + (i + 1))}>
                        {activeStep > (i + 1) ? <FaCheck className="step-check"/> : (i + 1)}
                      </div>
                      :
                      <div className="step-center-block w-100">
                        <div
                          className={activeStep > (i + 1) ? "step finish step" + (i + 1) : (activeStep === (i + 1) ? "step active step" + (i + 1) : "step step" + (i + 1))}>
                          {activeStep > (i + 1) ? <FaCheck className="step-check"/> : (i + 1)}
                        </div>
                        <div className={activeStep > (i + 1) ? "step-border active" : "step-border "}></div>
                      </div>
                    }
                  </div>
                )}
              </div>
              <div className="col-md-12"></div>
              <div className="col-md-5 login-block mt-md-5 pt-md-5 pb-md-3 px-md-4 mx-auto rounded shadow-lg">
                <h3 className="text-center login-top-block rounded">Ro'yhatdan o'tish</h3>
                <FirstStep
                  goLogin={goLogin}
                  activeStep={activeStep}
                  onSelect={handleOnClickStepper}
                  currentRegUser={currentRegUser}
                  getInputValue={getInputValue}
                />
                <SecondStep
                  activeStep={activeStep}
                  onSelect={handleOnClickStepper}
                  categories={categories}
                  downloadPhoto={downloadPhoto}
                  logoUrl={logoUrl}
                  currentRegUser={currentRegUser}
                  getInputValue={getInputValue}
                />
                <ThreeStep
                  onMapClick={onMapClick}
                  coords={coords}
                  activeStep={activeStep}
                  onSelect={handleOnClickStepper}
                  regions={regions}
                  downloadPhoto={downloadPhoto}
                  getDistrictsByRegion={getDistrictsByRegion}
                  districts={districts}
                  currentRegUser={currentRegUser}
                  getInputValue={getInputValue}
                />
                <FourStep
                  login={login}
                  activeStep={activeStep}
                  currentRegUser={currentRegUser}
                  getInputValue={getInputValue}
                />

                <div className="step-buttons">
                  <p className={activeStep != 4 ? " mt-sm-2 small font-italic text-secondary" : "d-none"}><sup>
                    <IoMdStar
                      className="text-danger"/></sup> bilan belgilangan hududlarni to'ldirish majburiy!</p>
                  {activeStep === 1 ?
                    <p className="px-3 small font-weight-light text-center">Keyingi bosqichga o'tish bilan
                      siz <a href="">Foydalanish shartlari</a> va <a href="#">Maxfiylik siyosati</a>ga rozilik
                      bildirasiz.</p> : ''}
                  <div className="row">
                    <div className="col-md-4">
                      {activeStep === 1 || activeStep === 4 ? '' :
                        <Button className="btn btn-sm step-button-left px-4 pt-0 pb-1"
                                onClick={handleOnClickBack}>
                          <FaLongArrowAltLeft/>
                        </Button>}
                    </div>
                    <div className="col-md-8 text-right">
                      <Button
                        className={activeStep === steps.length ? "d-none" : "btn btn-sm step-button-right px-4  pt-0 pb-1"}
                        onClick={activeStep === steps.length ? null : handleOnClickNext}>
                        {activeStep === steps.length ? 'Tugatish ' : ' '}<FaLongArrowAltRight/>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {};

export default Register;
