import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import TicketList from '../components/TicketList';
import { LinkContainer } from 'react-router-bootstrap';

const EventScanner = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Container>
      <LinkContainer to={'camera'}>
        <Button className="m-1">QR Code Scanner</Button>
      </LinkContainer>
      <TicketList event_id={id as string} />
    </Container>
  );
};

export default EventScanner;
