import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

import { selectSelectedPairs } from '../redux/orderBookSelectors';
import { addPair, removePair } from '../redux/orderBookSlice';

const CurrencyDropdown = () => {
  const dispatch = useDispatch();
  const selectedPairs = useSelector(selectSelectedPairs);

  const handleChange = (event) => {
    const selectedPair = event.target.value;
    if (event.target.checked) {
      dispatch(addPair(selectedPair));
    } else {
      dispatch(removePair(selectedPair));
    }
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Select Currency Pairs</FormLabel>
      <FormGroup>
        {['BTC-USD', 'ETH-USD', 'LTC-USD', 'BCH-USD'].map((pair) => (
          <FormControlLabel
            key={pair}
            control={
              <Checkbox
                checked={selectedPairs.includes(pair)}
                onChange={handleChange}
                value={pair}
              />
            }
            label={pair}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default CurrencyDropdown;
