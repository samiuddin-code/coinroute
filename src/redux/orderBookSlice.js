import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bids: {},
  offers: {},
  selectedPairs: [],
};

const orderBookSlice = createSlice({
  name: 'orderBook',
  initialState,
  reducers: {
    updateOrderBook(state, action) {
      const { currencyPair, data } = action.payload;

      if (data.type === 'snapshot') {
        state.bids[currencyPair] = [...data.bids];
        state.offers[currencyPair] = [...data.asks];
      } else if (data.type === 'l2update') {
        data.changes.forEach(([side, price, quantity]) => {
          if (side === 'buy') {
            state.bids[currencyPair] = updateOrders([...state.bids[currencyPair]], price, quantity);
          } else if (side === 'sell') {
            state.offers[currencyPair] = updateOrders([...state.offers[currencyPair]], price, quantity);
          }
        });
      }
    },
    addPair(state, action) {
      const pairToAdd = action.payload;
      if (!state.selectedPairs.includes(pairToAdd)) {
        state.selectedPairs.push(pairToAdd);
      }
    },
    removePair(state, action) {
      const pairToRemove = action.payload;
      state.selectedPairs = state.selectedPairs.filter(pair => pair !== pairToRemove);
    },
  },
});

const updateOrders = (orders, price, quantity) => {
  const priceIndex = orders.findIndex(order => order[0] === price);

  if (priceIndex !== -1) {
    if (quantity === '0') {
      orders.splice(priceIndex, 1);
    } else {
      orders[priceIndex][1] = quantity;
    }
  } else {
    orders.push([price, quantity]);
    orders.sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]));
  }

  return orders;
};

export const { updateOrderBook, addPair, removePair } = orderBookSlice.actions;
export default orderBookSlice.reducer;
