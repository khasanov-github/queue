import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {AvField, AvForm, AvGroup} from "availity-reactstrap-validation";
import {IoMdStar} from "react-icons/io";
import {Map, Placemark, YMaps} from "react-yandex-maps";

class ThreeStep extends Component {

  render() {
    const {
      activeStep, regions, coords, onMapClick,
      getDistrictsByRegion, currentRegUser, getInputValue,
      districts
    } = this.props;
    if (activeStep !== 3) { // Prop: The current step
      return null
    }
    return (
      <div className="register-step-content">
        <AvForm>
          <div className="row">
            <div className="col-md-12">
              <AvGroup>
                <label className="field-label  text-secondary">Viloyat:
                  <sup><IoMdStar className="text-danger"/></sup>
                </label>
                <AvField type="select" className="form-control-md"
                         onChange={getDistrictsByRegion}
                         id="region" name="region" required>
                  <option value="0" selected={false}>Viloyatni tanlang</option>
                  {regions.map(item =>
                    <option key={item.id} value={item.id}>{item.nameUzl}</option>
                  )}
                </AvField>
              </AvGroup>
              <AvGroup>
                <label className="field-label  text-secondary">Shahar/tuman:
                  <sup><IoMdStar className="text-danger"/></sup>
                </label>
                <AvField type="select" className="form-control-md"
                         onChange={getInputValue}
                         value={currentRegUser.district ? currentRegUser.district : ''}
                         id="district" name="district" required>
                  <option value="" selected={false}>Tumanni tanlang</option>
                  {districts.map(item =>
                    <option key={item.id} value={item.id}>{item.nameUzl}</option>
                  )}
                </AvField>
              </AvGroup>
              <AvGroup>
                <label className="field-label  text-secondary">Manzil:
                  <sup><IoMdStar className="text-danger"/></sup>
                </label>
                <AvField className="form-control-md" name="address"
                         defaultValue={currentRegUser.address ? currentRegUser.address : ''}
                         onChange={getInputValue}
                         placeholder="e.g, Serquyosh MFY, Hayrat 12" required
                         errorMessage="Manzilni kiritish majburiy!"
                         validate={{
                           minLength: {
                             value: 8,
                             errorMessage: "Uzunligi 8 ta belgidan kam bo'lmasiligi kerak"
                           }
                         }}/>
              </AvGroup>
              <AvGroup>
                <label className="field-label  text-secondary">Xaritadan belgilang:
                  <sup><IoMdStar className="text-danger"/></sup>
                </label>
                <div className="location">
                  <YMaps>
                    <div>
                      <Map className='mapYandex' onClick={onMapClick.bind(this)}
                           defaultState={{
                             center: [41.29244432097986, 69.27444167412028],
                             zoom: 15
                           }}>
                        <Placemark
                          geometry={coords.length ? coords : [41.29244432097986, 69.27444167412028]}
                        />
                      </Map>
                    </div>
                  </YMaps>
                </div>
                <AvField className="form-control-sm" id="lang" name="lang" disabled required/>
                <AvField className="form-control-sm" id="lat" name="lat" disabled required/>
              </AvGroup>
            </div>
          </div>
        </AvForm>
      </div>
    );
  }
}

ThreeStep.propTypes = {};

export default ThreeStep;
