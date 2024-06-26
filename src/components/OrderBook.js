import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectWebSocket } from '../services/websocketService';
import { updateOrderBook } from '../redux/orderBookSlice';
import { selectBids, selectOffers } from '../redux/orderBookSelectors';
import { Paper, Typography, Box } from '@mui/material';

const OrderBook = ({ currencyPair }) => {
  const dispatch = useDispatch();
  const bids = useSelector(selectBids(currencyPair));
  const offers = useSelector(selectOffers(currencyPair));

  useEffect(() => {
    const onMessage = (data) => {
      dispatch(updateOrderBook({ currencyPair, data }));
    };

    const disconnectWebSocket = connectWebSocket(currencyPair, onMessage);

    return () => disconnectWebSocket();
  }, [currencyPair, dispatch]);

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Order Book for {currencyPair}
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="body1">Bids</Typography>
          <ul>
            {bids.map(([price, quantity], index) => (
              <li key={index}>
                Price: {price}, Quantity: {quantity}
              </li>
            ))}
          </ul>
        </Box>
        <Box>
          <Typography variant="body1">Offers</Typography>
          <ul>
            {offers.map(([price, quantity], index) => (
              <li key={index}>
                Price: {price}, Quantity: {quantity}
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    </Paper>
  );
};

export default OrderBook;
