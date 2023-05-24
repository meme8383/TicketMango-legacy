import { Outlet } from 'react-router-dom';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Container>
        <Row>
          <Col>
            <h1>Dashboard</h1>
          </Col>
          <Col xs={2}>
            <LinkContainer to="/events/new">
              <Button className="md-6" variant="primary">
                New Event
              </Button>
            </LinkContainer>
          </Col>
        </Row>
        <Outlet />
      </Container>
    </div>
  );
};

export default Dashboard;
