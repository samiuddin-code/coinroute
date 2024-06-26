import { createSelector } from 'reselect';

const selectOrderBook = (state) => state.orderBook;

export const selectBids = (pair) =>
  createSelector(
    [selectOrderBook],
    (orderBook) => orderBook.bids[pair] || []
  );

export const selectOffers = (pair) =>
  createSelector(
    [selectOrderBook],
    (orderBook) => orderBook.offers[pair] || []
  );

export const selectSelectedPairs = createSelector(
  [selectOrderBook],
  (orderBook) => orderBook.selectedPairs
);
