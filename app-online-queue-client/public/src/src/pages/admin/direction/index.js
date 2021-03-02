import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Tab, Tabs} from "react-bootstrap";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button, ButtonGroup,
  Card, CardBody, CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table
} from "reactstrap";
import DashboardLayout from "../../../components/DashboardLayout";
import {connect} from "dva";
import {FaEdit, FaRegTrashAlt} from "react-icons/fa";
import {MDBDataTable} from "mdbreact";
import {Link} from "react-router-dom";
import {AvField, AvForm} from "availity-reactstrap-validation";

@connect(({globalModel}) => ({globalModel}))
class Direction extends Component {
  componentDidMount() {
    const {dispatch, globalModel} = this.props;
    const {currentUser} = globalModel;
    dispatch({
      type: 'globalModel/updateState',
      payload: {
        showModal: false,
        showDeleteModal: false
      }
    });
    dispatch({
      type: 'globalModel/getItems',
      payload: {
        type: 'direction',
        role_id: ("byCompany/" + currentUser.company.id)
      }
    });
  }

  render() {
    const {dispatch, globalModel} = this.props;
    const {currentUser, isAdmin, showModal, showDeleteModal, currentItem, isModer, directions} = globalModel;

    const openModal = (item) => {
      dispatch({
        type: 'globalModel/updateState',
        payload: {
          showModal: !showModal,
          currentItem: item
        }
      })
    };
    const openDeleteModal = (item) => {
      dispatch({
        type: 'globalModel/updateState',
        payload: {
          showDeleteModal: !showDeleteModal,
          currentItem: item
        }
      })
    };
    const deleteItem = () => {
      dispatch({
        type: 'globalModel/deleteItem',
        payload: {
          ...currentItem,
          type: 'direction'
        }
      })
    };
    const save = (e, v) => {
      dispatch({
        type: 'globalModel/save',
        payload: {
          id: currentItem.id ? currentItem.id : null,
          ...v,
          type: 'direction'
        }
      })
    };
    let directionsList = [];
    let trNumber = 1;
    for (const item in directions) {
      let t = {
        tr: "#" + trNumber++,
        ...directions[item],
        action: <div><Button className="mr-1 p-2" color='warning' onClick={() => openModal(t)}><FaEdit
          className="text-dark"/></Button>
          <Button className="p-2" color='danger' onClick={() => openDeleteModal(t)}><FaRegTrashAlt/></Button></div>
      };
      directionsList.push(t);
    }
    const data = {
      columns: [
        {
          label: 'T/r',
          field: 'tr',
          sort: 'asc',
          width: 150
        },
        {
          label: "O'zbekcha lotin",
          field: 'nameUzl',
          sort: 'asc',
          width: 150
        },
        {
          label: "O'zbekcha krill",
          field: 'nameUzk',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Ruscha nomi',
          field: 'nameRu',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Inglizcha nomi',
          field: 'nameEn',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Operatorlar soni',
          field: 'nameEn',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Receptionlar soni',
          field: 'nameEn',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Holati',
          field: 'nameEn',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Amaliyot',
          field: 'action',
          sort: 'asc',
          width: 100
        }
      ],
      rows: directionsList
    };

    return (
      <DashboardLayout pathname={this.props.pathname}>
        <div className="container mr-0">
          <div className="row mt-sm-3 mr-0">
            <div className="col-md-12 mr-0">
              <Breadcrumb>
                <BreadcrumbItem><Link to="/admin">Bosh sahifa</Link></BreadcrumbItem>
                <BreadcrumbItem active>Bo'limlar</BreadcrumbItem>
              </Breadcrumb>
            </div>
            <div className="col-md-12">
              <h1 className="font-weight-light">Bo'limlar</h1>
            </div>
            <div className="col-md-12 mx-md-5">
              <div className="row">
                <div className="col-md-4 rounded mx-2">
                  <Card className="bg-info">
                    <CardHeader className="py-1 my-0">
                      <div className="row">
                        <div className="col-md-6">
                        </div>
                        <div className="col-md-6 text-right mt-0 pt-0">
                          <ButtonGroup className="mt-0 pt-0">
                            <Button
                              className="bg-transparent bg-dark border-0 mt-0 pt-0 text-decoration-none"> Oy </Button>
                            <Button
                              className="bg-transparent bg-dark border-0 mt-0 pt-0  text-decoration-none"> Hafta </Button>
                            <Button
                              className="bg-transparent bg-dark border-0 mt-0 pt-0  text-decoration-none"> Kun </Button>
                          </ButtonGroup>
                        </div>
                      </div>

                    </CardHeader>
                    <CardBody>
                      <h4 className="text-white">+4</h4>
                      <h5 className="text-white">Bo'limlar soni</h5>
                    </CardBody>
                    <CardFooter></CardFooter>
                  </Card>
                </div>
                <div className="col-md-4 rounded bg-warning"></div>
              </div>
            </div>
            <div className="col-md-12">
              <Button className="btn btn-success my-2" onClick={() => openModal('')}>Bo'lim qo'shish qo'shish</Button>
              <MDBDataTable
                theadColor="dark"
                small={true}
                paginationLabel={["Oldingisi", "Keyingisi"]}
                pagesAmount={5}
                paging={true}
                info={true}
                infoLabel={["Namoyish etilayabdi", " dan", " gacha", "tadan"]}
                order={['tr', 'desc']}
                bordered
                entriesOptions={[5, 10, 25, 50, 100]}
                entriesLabel="Ro'yhat sanog'i:"
                entries={10}
                searchLabel="Qidirish"
                searching={true}
                hover
                data={data}
              />
            </div>
          </div>
        </div>
        <Modal isOpen={showModal}>
          <AvForm
            onValidSubmit={save}>
            <ModalHeader>
              {currentItem.nameUzk ? "Bo'limni tahrirlash" : "Yangi Bo'lim qo'shish"}
            </ModalHeader>
            <ModalBody>
              <AvField defaultValue={currentItem.nameUzl} name="nameUzl" label="O'zbek lotincha nomi" required
                       placeholder="O'zbekcha lotincha nomini kiriting..."/>
              <AvField defaultValue={currentItem.nameUzk} name="nameUzk" label="O'zbek krillcha nomi" required
                       placeholder="O'zbekcha krillcha nomini kiriting..."/>
              <AvField defaultValue={currentItem.nameRu} name="nameRu" label="Ruscha nomi" required
                       placeholder="Enter name russia "/>
              <AvField defaultValue={currentItem.nameEn} name="nameEn" label="Inglizcha nomi" required
                       placeholder="Enter english name"/>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" type="button" onClick={openModal}>Cancel</Button>
              <Button color="success">Save</Button>
            </ModalFooter>
          </AvForm>
        </Modal>

        {/*DELETE ITEM CONTENT*/}
        <Modal isOpen={showDeleteModal}>
          <ModalHeader>
            {"Rostdan ham  o'chirishni istaysizmi " + currentItem.nameUzk + 'ni ?'}
          </ModalHeader>
          <ModalFooter>
            <Button color="primary" onClick={openDeleteModal}>No</Button>
            <Button color="danger" onClick={deleteItem}>Yes</Button>
          </ModalFooter>
        </Modal>
      </DashboardLayout>
    );
  }
}

Direction.propTypes = {};

export default Direction;
