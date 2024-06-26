const WEBSOCKET_URL = 'wss://ws-feed.pro.coinbase.com';

export const connectWebSocket = (currencyPair, onMessage) => {
  const socket = new WebSocket(WEBSOCKET_URL);

  socket.onopen = () => {
    const subscribeMessage = {
      type: 'subscribe',
      product_ids: [currencyPair],
      channels: ['level2']
    };
    socket.send(JSON.stringify(subscribeMessage));
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  return () => {
    if (socket.readyState === WebSocket.OPEN) {
      const unsubscribeMessage = {
        type: 'unsubscribe',
        product_ids: [currencyPair],
        channels: ['level2']
      };
      socket.send(JSON.stringify(unsubscribeMessage));
      socket.close();
    } else {
      console.warn('WebSocket is not open. Cannot unsubscribe.');
    }
  };
};
