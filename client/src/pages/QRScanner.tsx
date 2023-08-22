import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Scanner from '../components/Scanner';

const EventScanner = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Container>
      <Scanner event_id={id as string} />
    </Container>
  );
};

export default EventScanner;
