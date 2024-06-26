import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBids, selectOffers } from '../redux/orderBookSelectors';
import { Paper, Typography, Box, Slider } from '@mui/material';

const aggregateOrders = (orders, increment) => {
  const aggregated = {};

  orders.forEach(([price, quantity]) => {
    const roundedPrice = Math.floor(parseFloat(price) / increment) * increment;
    if (!aggregated[roundedPrice]) {
      aggregated[roundedPrice] = 0;
    }
    aggregated[roundedPrice] += parseFloat(quantity);
  });

  return Object.entries(aggregated).map(([price, quantity]) => [parseFloat(price), quantity]);
};

const LadderView = ({ currencyPair }) => {
  const [increment, setIncrement] = useState(0.01);
  const bids = useSelector(selectBids(currencyPair));
  const offers = useSelector(selectOffers(currencyPair));

  const aggregatedBids = aggregateOrders(bids, increment);
  const aggregatedOffers = aggregateOrders(offers, increment);

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Ladder View for {currencyPair}
      </Typography>
      <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mr: 2 }}>
          Increment: {increment}
        </Typography>
        <Slider
          value={increment}
          min={0.01}
          max={0.5}
          step={0.01}
          onChange={(e, newValue) => setIncrement(newValue)}
          valueLabelDisplay="auto"
        />
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="body1">Bids</Typography>
          <ul>
            {aggregatedBids.map(([price, quantity], index) => (
              <li key={index}>
                Price: {price.toFixed(2)}, Quantity: {quantity.toFixed(2)}
              </li>
            ))}
          </ul>
        </Box>
        <Box>
          <Typography variant="body1">Offers</Typography>
          <ul>
            {aggregatedOffers.map(([price, quantity], index) => (
              <li key={index}>
                Price: {price.toFixed(2)}, Quantity: {quantity.toFixed(2)}
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    </Paper>
  );
};

export default LadderView;
