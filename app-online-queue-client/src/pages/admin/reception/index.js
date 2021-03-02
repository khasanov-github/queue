import React, {Component} from 'react';
import {Container, Row, Button, Table, Col, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {connect} from "dva";
import {AvField, AvForm} from "availity-reactstrap-validation";
import DashboardLayout from "../../../components/DashboardLayout";

@connect(({globalModel}) => ({globalModel}))
class Index extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'globalModel/getReceptions',
    })
  }

  render() {
    const {globalModel} = this.props;
    const {showModal, showDeleteModal, currentItem, receptions} = globalModel;
    const openModal = (item) => {
      this.props.dispatch({
        type: 'globalModel/updateState',
        payload: {
          showModal: !showModal,
          currentItem: item
        }
      })
    };

    const openDeleteModal = (item) => {
      this.props.dispatch({
        type: 'globalModel/updateState',
        payload: {
          showDeleteModal: !showDeleteModal,
          currentItem: item
        }
      })
    };
    const deleteReception = () => {
      this.props.dispatch({
        type: 'globalModel/deleteReception',
        payload: {
          id: currentItem.id,
        }
      })
    };

    const saveReception = (e, v) => {
      this.props.dispatch({
        type: 'globalModel/addReception',
        payload: {
          id: currentItem.id,
          ...v,
        }
      })
    };
    console.log(receptions);
    return (
      <div>
        <DashboardLayout pathname={this.props.pathname}>
          <Container>
            <Row>
              <Col>
                <h4 className="text-center">Reception list</h4>
              </Col>
            </Row>
            <Row>
              <Button className="m-3" color="primary" onClick={() => openModal('')}>
                Add Reception
              </Button>
            </Row>
            <Table className="table">
              <thead>
              <tr>
                <th>T/r</th>
                <th>Full Name</th>
                <th>Phone Number</th>
                <th>Qo`shilgan vaqti</th>
                <th>Navbatga qo`shgan odamlar soni</th>
                <th>Holati</th>
                <th colSpan="2" className="text-center">Action</th>
              </tr>
              </thead>
              <tbody>
              {!receptions?<h2>Reception hozircha mavjud emas</h2>:receptions.map((item, i) =>
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td>{item.firstName} {item.lastName} {item.middleName}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.createdAt.substring(0, 10)}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.active?"On":"Off"}</td>
                  <td><Button className="btn-edit" onClick={() => openModal(item)}>Edit</Button></td>
                  <td><Button color="danger" onClick={() => openDeleteModal(item)}>Delete</Button></td>
                </tr>
              )}
              </tbody>
            </Table>
          </Container>
        </DashboardLayout>
        }


        <Modal isOpen={showModal}>
          <AvForm onValidSubmit={saveReception}>
            <ModalHeader>
              {currentItem.firstName ? 'Edit reception' : 'Add reception'}
            </ModalHeader>
            <ModalBody>
              <AvField name="firstName" defaultValue={currentItem.firstName} label="firstName" placeholder="Enter firstName"/>
              <AvField name="lastName" defaultValue={currentItem.lastName} label="lastName" placeholder="Enter lastName"/>
              <AvField name="middleName" defaultValue={currentItem.middleName} label="middleName" placeholder="Enter middleName"/>
              <AvField name="phoneNumber" defaultValue={currentItem.phoneNumber} label="phoneNumber" placeholder="Enter phoneNumber"/>
              <AvField name="password" type="password" label="password" placeholder="Enter password"/>
              <AvField name="prePassword" type="password" label="prePassword" placeholder="Enter pre password"/>
              <AvField name="role" value="RECEPTION" hidden/>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" type="button" onClick={openModal}>Cancel</Button>
              <Button type="submit" color="success">Save</Button>
            </ModalFooter>
          </AvForm>
        </Modal>

        <Modal isOpen={showDeleteModal}>
          <ModalHeader>
            {'Are you sure delete ' + currentItem.firstName + '?'}
          </ModalHeader>
          <ModalFooter>
            <Button color="primary" onClick={openDeleteModal}>No</Button>
            <Button color="danger" onClick={deleteReception}>Yes</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

Index.propTypes = {};

export default Index;
