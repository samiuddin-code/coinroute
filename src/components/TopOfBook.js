import React from 'react';
import { useSelector } from 'react-redux';
import { selectBids, selectOffers } from '../redux/orderBookSelectors';
import { Paper, Typography, Box } from '@mui/material';

const TopOfBook = ({ currencyPair }) => {
  const bids = useSelector(selectBids(currencyPair));
  const offers = useSelector(selectOffers(currencyPair));

  const bestBid = bids.length > 0 ? bids[0] : ['N/A', 'N/A'];
  const bestAsk = offers.length > 0 ? offers[0] : ['N/A', 'N/A'];

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Top of Book for {currencyPair}
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="body1">Best Bid</Typography>
          <Typography variant="body2">Price: {bestBid[0]}</Typography>
          <Typography variant="body2">Quantity: {bestBid[1]}</Typography>
        </Box>
        <Box>
          <Typography variant="body1">Best Ask</Typography>
          <Typography variant="body2">Price: {bestAsk[0]}</Typography>
          <Typography variant="body2">Quantity: {bestAsk[1]}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default TopOfBook;
