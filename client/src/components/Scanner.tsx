import React from 'react';
import { QrReader } from 'react-qr-reader';
import { Result } from '@zxing/library';

const Scanner = () => {
  const handleScan = (result: Result | undefined | null, error: Error | undefined | null) => {
    if (result) {
      console.log(result);
    }
    if (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h5>Scan QR Code</h5>
      <QrReader
        onResult={handleScan}
        constraints={{ facingMode: 'environment' }}
        scanDelay={300}
      />
    </div>
  );
};

export default Scanner;
