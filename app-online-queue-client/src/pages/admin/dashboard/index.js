import React, {Component} from 'react';
import DashboardLayout from "../../../components/DashboardLayout";
import {Col, Container, Row} from "reactstrap";
import CanvasJSReact from '../../../assets/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Dashboard extends Component {
  render() {
    const options = {
      animationEnabled: true,
      title: {
        text: "Customer Satisfaction"
      },
      subtitles: [{
        text: "71% Positive",
        verticalAlign: "center",
        fontSize: 24,
        dockInsidePlotArea: true
      }],
      data: [{
        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###'%'",
        dataPoints: [
          {name: "Unsatisfied", y: 55},
          {name: "Very Satisfied", y: 45},
        ]
      }]
    };
    return (
      <DashboardLayout pathname={this.props.pathname}>
        <Container>
          <Row>
            <Col>
              <CanvasJSChart options={options}/>
            </Col>
          </Row>
        </Container>
      </DashboardLayout>
    );
  }
}

Dashboard.propTypes = {};

export default Dashboard;
