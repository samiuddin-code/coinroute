import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Paper, Typography } from '@mui/material';
import { connectWebSocket } from '../services/websocketService';

const PriceChart = ({ currencyPair }) => {
  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    const onMessage = (data) => {
      if (data.type === 'match') {
        setPriceData((prevData) => [
          ...prevData,
          { time: new Date(data.time).toLocaleTimeString(), price: parseFloat(data.price) },
        ]);
      }
    };

    const disconnectWebSocket = connectWebSocket(currencyPair, onMessage);

    return () => disconnectWebSocket();
  }, [currencyPair]);

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Price Chart for {currencyPair}
      </Typography>
      <LineChart width={600} height={300} data={priceData}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="time" />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </Paper>
  );
};

export default PriceChart;
