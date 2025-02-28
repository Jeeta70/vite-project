import React, { useEffect, useState } from 'react';

const PayloadDisplay: React.FC = () => {
  const [payload, setPayload] = useState<string[]>([]);

  useEffect(() => {
    // Retrieve saved payload (assuming it's stored in localStorage)
    const savedPayload = localStorage.getItem('payload');
    if (savedPayload) {
      setPayload(JSON.parse(savedPayload));
    }
  }, []);

  return (
    <div>
      <h2>Saved Payload</h2>
      <ul>
        {payload.length > 0 ? (
          payload.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <li>No data saved.</li>
        )}
      </ul>
    </div>
  );
};

export default PayloadDisplay;
