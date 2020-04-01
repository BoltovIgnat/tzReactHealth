import React from 'react';
import Chart from './components/Chart';
import Table from './components/Table';
import {connect} from 'react-redux';

import { Nav, Container, Row, Col} from 'react-bootstrap';

import './App.css';

class App extends React.Component {

  componentDidMount() {
  }

  render() {  
      
      return (
        <>
          <Nav
            className="ibc-nav"
            activeKey="/home"
            onSelect={(selectedKey: any) => alert(`selected ${selectedKey}`)}
          >
            <Nav.Item className="ibc-nav-item">
              Шагомер на тестовое задание
            </Nav.Item>
            
          </Nav>
          <Container className="ibc-container">
            <Row className="justify-content-md-center">
              <Col xs lg="4">
                <Table/>
              </Col>
              <Col xs lg="7">
                <Chart/>
              </Col>
            </Row>
          </Container>
        </>    
      );
  }
}

const mapStateToProps = (store: any) => {
  return {
    state: store
  }
}


export default connect(mapStateToProps)(App);