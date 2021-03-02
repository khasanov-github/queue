import React, {Component} from 'react';
import DashboardLayout from "../../../components/DashboardLayout";
import {FaBriefcase, FaUserPlus, FaThList, FaThLarge} from 'react-icons/fa';
import {AvField, AvForm} from 'availity-reactstrap-validation';


import {Button, Col, Container, CustomInput, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table,} from "reactstrap";
import {connect} from "dva";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

@connect(({globalModel}) => ({globalModel}))
class Operator extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'globalModel/getDirections',
      payload: ''
    });
  }

  render() {
    const {dispatch, globalModel} = this.props;
    const {showDeleteModal, onlineOperators, showAddModal, offlineOperators, currentItem, directions, directionId, operators,} = globalModel;

    const openDeleteModal = (data) => {
      console.log(data);
      data.active = !data.active;
      dispatch({
        type: 'globalModel/updateState',
        payload: {
          currentItem: data,
          showDeleteModal: !showDeleteModal
        }
      });
    };

    const onAndOff = (data) => {
      dispatch({
        type: 'globalModel/onOffStaff',
        payload: {id: data.id, active: !data.active}
      });
    };

    const deleteOperator = () => {
      dispatch({
        type: 'globalModel/deleteOperator',
        payload: currentItem
      });
    };

    const setDirectionId = (data) => {
      dispatch({
        type: 'globalModel/updateState',
        payload: {
          directionId: data,
          showAddModal: !showAddModal,
          currentItem: ''
        }
      });
    };

    const openAddModal = (data) => {
      dispatch({
        type: 'globalModel/updateState',
        payload: {
          currentItem: data,
          showAddModal: !showAddModal
        }
      });
    };

    const openInfo = (data) => {
      console.log(data);
      let a = [];
      let b = [];
      data.forEach(item => {
        if (item.active) {
          a.push(item);
        } else {
          b.push(item)
        }
      });
      dispatch({
        type: 'globalModel/updateState',
        payload: {
          onlineOperators: a,
          offlineOperators: b,
        }
      });
    };

    let countOnline = (operators) => {
      let a = [];
      operators.forEach(item => {
        if (item.active) {
          a.push(item);
        }
      });
      return a;
    };

    let saveOperator = (e, v) => {
      currentItem.id ?
        dispatch({
          type: 'globalModel/addStaff',
          payload: {...v, id: currentItem.id}
        }) :
        dispatch({
          type: 'globalModel/addStaff',
          payload: {
            ...v, direction: directionId,
          }
        });
      dispatch({
        type: 'globalModel/updateState',
        payload: {
          currentItem: '',
          showAddModal: !showAddModal
        }
      });
    };

    let collectOperator = () => {
      this.props.dispatch({
        type: 'globalModel/getDirections',
        payload: ''
      });
      let all = [];
      directions.map(data => data.operatorDirections.map(item => all.push(item)));
      let time = new Date();
      dispatch({
        type: 'globalModel/updateState',
        payload: {
          operators: all,
          time: time
        }
      });
    };
    return (
      <div className="ReceptionOperator">
        <DashboardLayout pathname={this.props.pathname}>
          <Container>
            <Row className="ml-2 m-2">
              <Col>
                <h1 className="title text-center">Operator list</h1>
              </Col>
              <Button onClick={function () {
                collectOperator();
                document.getElementById("view1").style.display = "block";
                document.getElementById("view2").style.display = "none";
              }}><FaThLarge className="react-icons"/></Button>
              <Button onClick={function () {
                collectOperator();
                document.getElementById("view1").style.display = "none";
                document.getElementById("view2").style.display = "block";
              }}><FaThList className="react-icons"/></Button>

            </Row>
            <div className="div" id="view1">
              <Row>
                {directions.map((item, i) =>
                  <Button onClick={() => openInfo(item.operatorDirections)} color="info"
                          className={i == 0 ? "mt-4 ml-4 buttonlar" : "mt-4 ml-4 buttonlar"}>
                    <Col>
                      <Row className="cardMain">
                        <div className="col">
                          <Row>
                            <Col>
                              <h2 className="text-white m-auto">{item.nameUzl}</h2>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <p className="ml-1  text-white">Operatorlar soni: {item.operatorDirections.length}</p>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <p className="ml-1 text-white">Online
                                operatorlar: {countOnline(item.operatorDirections).length}</p>
                            </Col>
                          </Row>
                        </div>
                        <div className="mt-4  text-right col-1">
                          <FaBriefcase className="icon-case"/>
                        </div>
                      </Row>
                      <Button color="success" onClick={() => setDirectionId(item)}>
                        <FaUserPlus/>
                      </Button>
                    </Col>
                  </Button>
                )}

              </Row>
              <Row className="ml-3 mt-5">
                <Tabs defaultActiveKey="online" id="uncontrolled-tab-example">
                  <Tab eventKey="online" title="Online">
                    <Col>
                      <Table className="table table-bordered">
                        <thead>
                        <tr>
                          <th>Tr</th>
                          <th>Operator nomi</th>
                          <th>Operator telefon raqami</th>
                          <th>Qabul qilayotgan navabati</th>
                          <th>So’nggi ish boshlagan vaqti</th>
                          <th>Holati</th>
                        </tr>
                        </thead>
                        <tbody className="white">
                        {onlineOperators ? onlineOperators.map((item, i) =>
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.user.firstName} {item.user.lastName}</td>
                            <td>{item.user.phoneNumber}</td>
                            <td>{item.user.phoneNumber}</td>
                            <td>{item.user.createdAt}</td>
                            <td><CustomInput type="switch"
                                             valid={true}
                                             id={"CustomSwitch" + i}
                                             defaultChecked={item.active}
                                             onClick={() => onAndOff(item)}/></td>
                          </tr>
                        ) : ''}
                        </tbody>
                      </Table>
                    </Col>
                  </Tab>
                  <Tab eventKey="offline" title="Offline">
                    <Col>
                      <Table className="table-bordered table">
                        <thead className="Tablelar">
                        <tr>
                          <th>Tr</th>
                          <th>Operator nomi</th>
                          <th>Tell nomer</th>
                          <th>Qabul qilayotgan soni</th>
                          <th>Last online time</th>
                          <th>Last offline time</th>
                          <th>Ish vaqti</th>
                          <th>Holati</th>
                        </tr>
                        </thead>
                        <tbody className="white">
                        {offlineOperators ? offlineOperators.map((item, i) =>
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.user.firstName} {item.user.lastName}</td>
                            <td>{item.user.phoneNumber}</td>
                            <td>{item.user.phoneNumber}</td>
                            <td>{item.user.phoneNumber}</td>
                            <td>{item.user.phoneNumber}</td>
                            <td>{item.user.createdAt}</td>
                            <td><CustomInput type="switch"
                                             valid={true}
                                             id={"CustomSwitch" + i}
                                             defaultChecked={item.active}
                                             onClick={() => onAndOff(item)}/></td>
                          </tr>
                        ) : ''}
                        </tbody>
                      </Table>
                    </Col>
                  </Tab>


                </Tabs>
              </Row>
            </div>
            <div className="div" style={{display: "none"}} id="view2">
              <Row className="ml-3">
                <Table className="table table-bordered">
                  <thead>
                  <tr>
                    <th>Tr</th>
                    <th>Operator nomi</th>
                    <th>Telefon raqami</th>
                    <th>Hozirgi navabat</th>
                    <th>Ish boshlagan vaqti</th>
                    <th>Holati</th>
                    <th>Bo`limi</th>
                    <th colSpan="2">Amallar</th>
                  </tr>
                  </thead>
                  <tbody className="white">
                  {operators.map((item, i) =>
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.user.firstName} {item.user.lastName}</td>
                      <td>{item.user.phoneNumber}</td>
                      <td>{item.user.phoneNumber}</td>
                      <td>{item.user.createdAt}</td>
                      <td><CustomInput type="switch"
                                       valid={true}
                                       id={"CustomSwitchAll" + i}
                                       defaultChecked={item.active}
                                       onClick={() => onAndOff(item)}/></td>
                      <td>{directions.map(data => data.operatorDirections.map(item2 => item2.id === item.id ? data.nameUzl : ''))}</td>
                      <td><Button className="btn-edit" onClick={() => openAddModal(item.user)}>Edit</Button></td>
                      <td><Button color="danger" onClick={() => openDeleteModal(item.user)}>Delete</Button></td>
                    </tr>
                  )}

                  </tbody>
                </Table>
              </Row>
            </div>


          </Container>


        </DashboardLayout>
        <Modal isOpen={showDeleteModal} toggle={openDeleteModal}>
          <ModalHeader toggle={openDeleteModal}
                       charCode="x">{currentItem?currentItem.firstName + ' ' + currentItem.firstName+' o`chirilsinmi?':''}</ModalHeader>
          <ModalFooter>
            <Button type="button" color="danger" onClick={openDeleteModal}>No</Button>{' '}
            <Button color="success" onClick={deleteOperator}>Yes</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={showAddModal} toggle={openAddModal}>
          <AvForm onValidSubmit={saveOperator}>
            <ModalHeader toggle={openAddModal}
                         charCode="x">{currentItem ? "Edit Operator" : "+ Add Operator"}</ModalHeader>
            <ModalBody>
              <AvField name="firstName" defaultValue={currentItem ? currentItem.firstName : ''}
                       label="firstName" placeholder="Enter firstName"/>
              <AvField name="lastName" defaultValue={currentItem ? currentItem.lastName : ''} label="lastName"
                       placeholder="Enter lastName"/>
              <AvField name="middleName" defaultValue={currentItem ? currentItem.middleName : ''}
                       label="middleName" placeholder="Enter middleName"/>
              <AvField name="phoneNumber" defaultValue={currentItem ? currentItem.phoneNumber : ''}
                       label="phoneNumber" placeholder="Enter phoneNumber"/>
              <AvField type="select" defaultValue="OPERATOR" name="role" hidden/>
              <AvField type="password" name="password" label="password" placeholder="Enter password"/>
              <AvField type="password" name="prePassword" label="prePassword" placeholder="Enter pre password"/>


            </ModalBody>
            <ModalFooter>
              <Button type="button" color="danger" onClick={openAddModal}>Cancel</Button>{' '}
              <Button color="success">Save</Button>
            </ModalFooter>
          </AvForm>
        </Modal>
      </div>
    );
  }
}

Operator.propTypes = {};

export default Operator;
