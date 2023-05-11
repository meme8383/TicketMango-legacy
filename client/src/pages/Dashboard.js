import { Outlet } from 'react-router-dom'
import React from 'react'
import { Container } from 'react-bootstrap'

const Dashboard = () => {

  return (
    <div className="dashboard">
      <Container>
        <h1>Dashboard</h1>
        <Outlet />
      </Container>
    </div>
  )
}

export default Dashboard