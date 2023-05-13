import { Button, Container } from 'react-bootstrap'

const Home = () => {

  return (
    <div className="home">
      <Container>
          <div className="px-4 py-5 my-5 text-center">
            <h1 className="display-5 fw-bold">TicketMango</h1>
            <div className="col-lg-6 mx-auto">
              <h2 className="display-6 mb-4">A ticketing app</h2>
              <div
                className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                <Button variant="primary btn-lg px-4 me-sm-3" href="/events/new">New Event</Button>
                <Button
                  variant="outline-secondary btn-lg px-4" href="/dashboard">Dashboard</Button>
              </div>
            </div>
          </div>
      </Container>
    </div>
  )
}

export default Home