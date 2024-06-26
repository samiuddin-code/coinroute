import React, { useEffect } from 'react';
import { connectWebSocket } from '../services/websocketService';

const WebSocketComponent = () => {
  useEffect(() => {
    const currencyPair = 'BTC-USD';

    // Function to handle incoming WebSocket messages
    const handleWebSocketMessage = (data) => {
      console.log('Received WebSocket data:', data);
      // Handle the data as per your application's requirements
    };

    // Connect to WebSocket and subscribe to updates
    const unsubscribe = connectWebSocket(currencyPair, handleWebSocketMessage);

    // Clean up function to unsubscribe when component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h2>WebSocket Example</h2>
      <p>Listening for WebSocket updates...</p>
    </div>
  );
};

export default WebSocketComponent;
