import React from 'react';
import { QrReader } from 'react-qr-reader';
import { Result } from '@zxing/library';
import { Alert, Spinner } from 'react-bootstrap';
import { useScan } from '../hooks/useScan';

const Scanner = ({ event_id }: { event_id: string }) => {
  const { scan, isLoading, error, scannedID } = useScan();
  const [ticketID, setTicketID] = React.useState<string>('');
  const [scannedList, setScannedList] = React.useState<string[]>([]);

  const handleScan = async (
    result: Result | undefined | null,
    error: Error | undefined | null,
  ) => {
    if (result) {
      if (isLoading) return;
      setTicketID(result.getText());
      scan(event_id, result.getText())
        .then((res) => {
          if (res) {
            setScannedList([res, ...scannedList]);
          }
        });
    }
    if (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <QrReader
        onResult={handleScan}
        constraints={{ facingMode: 'environment' }}
        scanDelay={1000}
      />
      {isLoading ? (
        <Alert variant={'warning'}><Spinner /></Alert>
      ) : error ? (
        <Alert variant={'danger'}>{error}</Alert>
      ) : scannedID && scannedID === ticketID ? (
        <Alert variant={'success'}>Scanned ticket {scannedID}</Alert>
      ) : (
        <></>
      )}
      <h3>Scanned Tickets</h3>
      <ul>
        {scannedList.map((ticket) => (
          <li key={ticket}>{ticket}</li>
        ))}
      </ul>
    </div>
  );
};

export default Scanner;
