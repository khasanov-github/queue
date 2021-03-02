import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {Button, Col, Container, Row} from "reactstrap";
import {connect} from "dva";
import DashboardLayout from "../../../components/DashboardLayout";
import input from "eslint-plugin-jsx-a11y/lib/util/implicitRoles/input";
import {forEach} from "react-bootstrap/cjs/ElementChildren";

@connect(({messageModel}) => ({messageModel}))
class Index extends Component {
  render() {

    const {dispatch, messageModel} = this.props;
    const {array, complains} = messageModel;

    const saveComplains = (e, v) => {
      const arr = [v.v];
      dispatch({
        type: 'messageModel/createComplain',
        payload: {
          v: arr
        }
      })
      document.getElementById('val').value = null;
    };

    const getComplains = () => {
      dispatch({
        type: 'messageModel/getComplains',
        payload: {}
      })
    };

    const deleteComplain = (data) => {
      dispatch({
        type: 'messageModel/deleteComplain',
        payload: {
          data
        }
      })
    };
    console.log(complains);

    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          <Container className="mx-md-5 my-md-5 mx-1 my-1">
            <Row>
              <h1>Man qlingan so'zlarni shakllantirish</h1>
            </Row>
            <AvForm onValidSubmit={saveComplains}>

              <Row>
                <Col className="col-md-10 col-9">
                  <AvField name="v" id="val" required/>
                </Col>
              </Row>
              <Col className="col-md-2 col-2"></Col>
              <Button color="success" className="my-md-3 my-2">Save</Button>
            </AvForm>


            <Row>
              <Col className="col-md-12 col-8">
                <Button color="primary" onClick={getComplains}>
                  Barchasini ko'rish
                </Button>
              </Col>
              <Col className="col-md-12 my-md-3 my-2 col-8">
                {complains !== null ?
                  <AvForm>
                    {complains.map((elem, i) =>
                      <Row key={i + 1}>
                        <AvField value={elem} name="complain" disabled={true}/>
                        <Button className="mx-md-2 mx-1" color="danger" onClick={() => deleteComplain(elem)}>
                          Delete
                        </Button>
                      </Row>
                    )}
                  </AvForm>
                  :
                  <h1>Man qlingan so'zlar yo'q</h1>
                }
              </Col>
            </Row>
          </Container>
        </DashboardLayout>
      </div>
    );
  }
}

Index.propTypes = {};

export default Index;
