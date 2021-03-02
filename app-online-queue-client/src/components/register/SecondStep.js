import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {AvField, AvForm, AvGroup} from "availity-reactstrap-validation";
import {CustomInput, FormGroup, Label} from "reactstrap";
import {IoMdStar} from "react-icons/io";

class SecondStep extends Component {

  render() {
    const {
      activeStep, categories, downloadPhoto,
      logoUrl, getInputValue, currentRegUser
    } = this.props;
    if (activeStep !== 2) { // Prop: The current step
      return null
    }
    return (
      <div className="register-step-content">
        <AvForm>
          <div className="row">
            <div className="col-md-12">
              <AvGroup>
                <label className="field-label text-secondary">Kompaniya nomi:
                  <sup><IoMdStar className="text-danger"/></sup>
                </label>
                <AvField className="form-control-md" name="name"
                         defaultValue={currentRegUser.name ? currentRegUser.name : ''}
                         onChange={getInputValue}
                         validate={{
                           required: {value: true, errorMessage: 'Iltimos, kompaniya nomini yozing!!!'},
                           minLength: {
                             value: 4,
                             errorMessage: "Uzunligi 4 tadan ko'p belgidan iborat  bo'lishi kerak"
                           }
                         }}
                         placeholder="e.g, Kompaniya MChJ" required/>
              </AvGroup>
              <AvGroup>
                <label className="field-label  text-secondary">Kategoriya tanlang:</label>
                <AvField name="categoryId" type="select" className="form-control-md"
                         value={currentRegUser.categoryId ? currentRegUser.categoryId : ''}
                         onChange={getInputValue}>
                  <option value="" aria-selected={"false"}>Kategoriyani tanlang</option>
                  {categories.map(item =>
                    <option key={item.id} value={item.id}>{item.nameUzl}</option>
                  )}
                </AvField>
              </AvGroup>
              <AvGroup>
                <label className="field-label  text-secondary" required>Inn raqam:
                  <sup><IoMdStar className="text-danger"/></sup>
                </label>
                <AvField className="form-control-md" name="tin"
                         id="companyTin"
                         defaultValue={currentRegUser.tin ? currentRegUser.tin : ''}
                         onChange={getInputValue}
                         validate={{
                           required: {value: true, errorMessage: 'Iltimos,  INN yozing!!!'},
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
                         }}
                         placeholder="e.g, 000 000 021"/>
              </AvGroup>
              <FormGroup>
                <Label for="photoIdInput" className="text-secondary">Foto:
                  <sup><IoMdStar className="text-danger"/></sup>
                </Label>
                <CustomInput type="file" id="photoIdInput"
                             className="form-control-md" required name="companyPhoto" onChange={downloadPhoto}
                             label="Logoni yuklang"/>
              </FormGroup>
              {
                logoUrl ? <div className="w-100 p-md-2">
                  <img src={logoUrl} alt="" className="img-fluid img-thumbnail border-info"/>
                </div> : " "
              }
            </div>
          </div>
        </AvForm>
      </div>
    );
  }
}

SecondStep.propTypes = {};

export default SecondStep;
