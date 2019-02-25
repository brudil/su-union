import React from 'react';
import { store } from '~website/redux/store';
import { Provider } from 'react-redux';
import { StoreContext } from 'redux-react-hook';

const CompProvider: React.FC = ({ children }) => (
  <Provider store={store}>
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  </Provider>
);

export default CompProvider;
