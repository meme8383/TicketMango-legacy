import { Outlet } from 'react-router-dom';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Container>
        {/*Align the dashboard header to the left and add a button aligned to the right*/}
        <Row>
          <Col>
            <h1>Dashboard</h1>
          </Col>
          <Col xs={2}>
            <Button className="md-6" variant="primary" href="/events/new">
              New Event
            </Button>
          </Col>
        </Row>
        <Outlet />
      </Container>
    </div>
  );
};

export default Dashboard;
