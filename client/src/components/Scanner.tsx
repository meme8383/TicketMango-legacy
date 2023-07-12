import React from 'react';
import { QrReader } from 'react-qr-reader';
import { Result } from '@zxing/library';
import { Alert } from 'react-bootstrap';
import { useScan } from '../hooks/useScan';

const Scanner = ({ event_id }: { event_id: string }) => {
  const { scan, isLoading, error, scannedID } = useScan();
  const [ticketID, setTicketID] = React.useState<string>('');

  const handleScan = (
    result: Result | undefined | null,
    error: Error | undefined | null,
  ) => {
    if (result) {
      if (isLoading) return;
      setTicketID(result.getText());
      scan(event_id, result.getText());
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
        scanDelay={300}
      />
      {isLoading ? (
        <Alert variant={'info'}>Loading...</Alert>
      ) : error ? (
        <Alert variant={'danger'}>{error}</Alert>
      ) : scannedID && scannedID === ticketID ? (
        <Alert variant={'success'}>Scanned ticket {scannedID}</Alert>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Scanner;
