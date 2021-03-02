import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Tab, Tabs} from "react-bootstrap";
import {Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import DashboardLayout from "../../../components/DashboardLayout";
import {connect} from "dva";
import {FaEdit, FaRegTrashAlt} from "react-icons/fa";
import {MDBDataTable} from "mdbreact";
import {Link} from "react-router-dom";
import {AvField, AvForm} from "availity-reactstrap-validation";

@connect(({globalModel}) => ({globalModel}))
class Category extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
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
        type: 'category'
      }
    });
  }

  render() {
    const {dispatch, globalModel} = this.props;
    const {currentUser, isAdmin, showModal, showDeleteModal, currentItem, isModer, categories} = globalModel;

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
          type: 'category'
        }
      })
    };
    const save = (e, v) => {
      dispatch({
        type: 'globalModel/save',
        payload: {
          id: currentItem.id ? currentItem.id : null,
          ...v,
          type: 'category'
        }
      })
    };
    let categoriesList = [];
    let trNumber = 1;
    for (const item in categories) {
      let t = {
        tr: "#" + trNumber++,
        ...categories[item],
        action: <div><Button className="mr-1 p-2" color='warning' onClick={() => openModal(t)}><FaEdit
          className="text-dark"/></Button>
          <Button className="p-2" color='danger' onClick={() => openDeleteModal(t)}><FaRegTrashAlt/></Button></div>
      };
      categoriesList.push(t);
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
          label: 'Amaliyot',
          field: 'action',
          sort: 'asc',
          width: 100
        }
      ],
      rows: categoriesList
    };

    return (
      <DashboardLayout pathname={this.props.pathname}>
        <div className="container mr-0">
          <div className="row mt-sm-3 mr-0">
            <div className="col-md-12 mr-0">
              <Breadcrumb>
                <BreadcrumbItem><Link to="/admin">Bosh sahifa</Link></BreadcrumbItem>
                <BreadcrumbItem active>Kategoriya</BreadcrumbItem>
              </Breadcrumb>
            </div>
            <div className="col-md-6">
              <h1 className="font-weight-light">Kategoriyalar</h1>
            </div>
            <div className="col-md-12">
              <Button className="btn btn-success my-2" onClick={() => openModal('')}>Kategoriya qo'shish</Button>
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
              {currentItem.nameUzk ? 'Kategoriyani tahrirlash' : "Yangi kategoriya qo'shish"}
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

Category.propTypes = {};

export default Category;
