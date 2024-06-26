import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import CurrencyDropdown from './components/CurrencyDropdown';
import OrderBook from './components/OrderBook';
import TopOfBook from './components/TopOfBook';
import PriceChart from './components/PriceChart';
import LadderView from './components/LadderView';
import { useSelector } from 'react-redux';
import { selectSelectedPairs } from './redux/orderBookSelectors';

function App() {
  const selectedPairs = useSelector(selectSelectedPairs);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" align="center" gutterBottom>
          CoinRoutes Order Book
        </Typography>
        <CurrencyDropdown />
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {selectedPairs.map((pair) => (
            <Grid item xs={12} md={6} key={pair}>
              <TopOfBook currencyPair={pair} />
              <PriceChart currencyPair={pair} />
              <LadderView currencyPair={pair} />
              <OrderBook currencyPair={pair} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
