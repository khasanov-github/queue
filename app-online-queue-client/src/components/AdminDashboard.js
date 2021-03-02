import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from "reactstrap";
import {FaBriefcase,FaArrowAltCircleRight} from 'react-icons/fa';
import {MdPersonAdd} from 'react-icons/md';
// import {Route} from "umi";
import router from "umi/router";
import {Bar, Line,Pie,HorizontalBar,Doughnut} from "react-chartjs-2";

class AdminDashboard extends Component {

  render() {
    const {getComWeek,companyWeek,getComToday,getComMonth}=this.props;


    const BarGraph = () => {
      const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: "Kompanyalar oylik statistika ",
          data: [6,10,20,8,9,5,6]
        }]};
      return (
        <Line data={data}/>
      )
    };
    const BarGraph1 = () => {
      const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: "Navbatning o'rtacha davomiyligi",
            backgroundColor: 'rgba(75,192,192,0.4)',
            data: [65, 59, 80, 81, 56, 55, 45]
          }
        ]
      };
      return (
        <Bar data={data}/>
      )
    };
    const BarGraph2 = () => {
      const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: "Navbatning o'rtacha davomiyligi",
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            data: [65, 59, 80, 81, 56, 55, 45]
          }
        ]
      };
      return (
        <Pie data={data}/>
      )
    };
    const BarGraph3 = () => {
      const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: "Navbatning o'rtacha davomiyligi",
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 45]
          }
        ]
      };
      return (
        <HorizontalBar data={data}/>
      )
    };

    const sss = ()=>{
      router.push("/company")
    };

    return (
      <div>
        <div className="pt-5 adminJon">
          <Row>
            <Col>
              <div className="card-group ">

                <div className="card mr-3 cardMain1">
                  <div className="text-right pr-3">
                    <span onClick={getComMonth} className="ml-1 text-white">Oy</span>
                    <span onClick={getComWeek} className="ml-1 text-white">hafta</span>
                    <span onClick={getComToday} className="ml-1 text-white">kun</span>
                  </div>
                    <h5 className="ml-2">{companyWeek?companyWeek:0}</h5>
                    <FaBriefcase className="icon-case"/>
                    <p className="card-text">Yangi Kompanyalar</p>
                    <button onClick={sss} className="border-0 cardButton py-md-1">Batafsil <FaArrowAltCircleRight/></button>
                </div>

                <div className="card mr-3 cardMain2">
                  <div className="text-right pr-3">
                    <span  className="ml-1 text-white">Oy</span>
                    <span  className="ml-1 text-white">hafta</span>
                    <span  className="ml-1 text-white">kun</span>
                  </div>
                  <h5 className="ml-2">0</h5>
                  <MdPersonAdd className="icon-case"/>
                  <p className="card-text">Yangi Foydaluvchilar</p>
                  <button className="border-0 cardButton py-md-1">Batafsil <FaArrowAltCircleRight/></button>
                </div>

                <div className="card mr-3 cardMain3">
                  <div className="text-right pr-3">
                    <span  className="ml-1 text-dark">Oy</span>
                    <span  className="ml-1 text-dark">hafta</span>
                    <span  className="ml-1 text-dark">kun</span>
                  </div>
                  <h5 className="ml-2">0</h5>
                  <MdPersonAdd className="icon-case"/>
                  <p className="card-text">Navbatlar</p>
                  <button className="border-0 cardButton py-md-1">Batafsil <FaArrowAltCircleRight/></button>
                </div>

                <div className="card mr-3 cardMain4">
                  <div className="text-right pr-3">
                    <span  className="ml-1 text-white">Oy</span>
                    <span  className="ml-1 text-white">hafta</span>
                    <span  className="ml-1 text-white">kun</span>
                  </div>
                  <h5 className="ml-2">0</h5>
                  <MdPersonAdd className="icon-case"/>
                  <p className="card-text">Bo'limlar</p>
                  <button className="border-0 cardButton py-md-1">Batafsil <FaArrowAltCircleRight/></button>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="d-flex pt-5">
                <div className="col-md-6"><BarGraph/></div>
                <div className="col-md-6"><BarGraph1/></div>
              </div>
              <div className="d-flex pt-4">
                <div className="col-md-6"><BarGraph2/></div>
                <div className="col-md-6"><BarGraph3/></div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
AdminDashboard.propTypes = {};
export default AdminDashboard;
