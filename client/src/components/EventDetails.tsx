import React, { useState } from 'react';
import Event from '../types/Event';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import { Button, Card, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const EventDetails = ({ event }: { event: Event }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = () => {
    // Copy public event link to clipboard
    navigator.clipboard.writeText(
      'https://ticketmango.vercel.app/events/' + event._id,
    );
    setCopied(true);
  };

  /**
   * "any" type definition must be used for Tooltip props
   * as react-bootstrap typescript definitions are broken
   * (or I am stupid). TooltipProps is defined in Tooltip.d.ts
   * but it doesn't work ):
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
