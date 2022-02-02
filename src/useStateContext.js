import React from 'react';
export const StateContext = React.createContext(null);
export const useStateContext = () => React.useContext(StateContext);
