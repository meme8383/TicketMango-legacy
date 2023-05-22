import React, { useState } from 'react';
import Event from '../types/Event';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Button, Card, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const EventDetails = ({ event }: { event: Event }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      'https://ticketmango.vercel.app/events/' + event._id,
    );
    setCopied(true);
  };

  // Any type definition must be used for TooltipProps
  // as react-bootstrap typescript definitions are broken
  // eslint-disable-next-line
  const renderTooltip = (props: any) =>
    copied ? <Tooltip {...props}>Copied!</Tooltip> : <></>;

  return (
    <Col>
      <Card className="event-details m-3">
        <Card.Body>
          <Card.Title>{event.title}</Card.Title>
          <Card.Text>
            {new Date(event.date).toLocaleString('en', {
              localeMatcher: 'best fit',
              dateStyle: 'long',
              timeStyle: 'short',
            })}
          </Card.Text>
          {event.maxParticipants && (
            <Card.Text>{event.maxParticipants} attendees max</Card.Text>
          )}
          <LinkContainer to={'/events/' + event._id + '/scan'}>
            <Button className="m-1" variant="primary">
              Scan
            </Button>
          </LinkContainer>
          <OverlayTrigger
            trigger={['hover', 'focus']}
            overlay={renderTooltip}
            placement="top"
          >
            <Button
              className="m-1"
              variant="secondary"
              onClick={copyToClipboard}
              onMouseLeave={() => setTimeout(() => setCopied(false), 300)}
            >
              Share
            </Button>
          </OverlayTrigger>
          <LinkContainer to={'/events/' + event._id + '/edit'}>
            <Button className="m-1" variant="warning">
              Edit
            </Button>
          </LinkContainer>
          <Card.Text className="text-muted">
            Modified:{' '}
            {formatDistanceToNow(new Date(event.createdAt), {
              addSuffix: true,
            })}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default EventDetails;
