import React, { useEffect, useState } from 'react';
import Event from '../types/Event';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import {
  Button,
  Card,
  Col,
  OverlayTrigger,
  Spinner,
  Tooltip,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuthContext } from '../hooks/useAuthContext';

const EventDetails = ({ event }: { event: Event }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [attendees, setAttendees] = useState<number>();

  const { user } = useAuthContext();

  const copyToClipboard = () => {
    // Copy public event link to clipboard
    navigator.clipboard.writeText(
      'https://ticketmango.vercel.app/events/' + event._id,
    );
    setCopied(true);
  };

  useEffect(() => {
    const fetchTickets = async () => {
      if (!user) return; // Return if no user is logged in

      const response = await fetch(`/api/events/${event._id}/tickets`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (response.ok) {
        const json = await response.json();
        setAttendees(json.length);
      } else {
        try {
          const json = await response.json();
          console.log(json);
        } catch (e) {
          console.log(e);
        }
      }
    };

    fetchTickets();
  }, [event._id, user]);

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
          <Card.Text
            className={
              attendees &&
              event.maxParticipants &&
              attendees >= event.maxParticipants
                ? 'text-danger'
                : ''
            }
          >
            {attendees ?? <Spinner size="sm" animation="border" />} attendees
            registered
            {event.maxParticipants && ' / ' + event.maxParticipants + ' max'}
          </Card.Text>
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
