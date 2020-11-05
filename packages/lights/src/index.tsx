import React, { FC, useEffect } from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { App } from "./containers/App";
import { reducer } from "./state/reducer";
import { APP_NAME } from "./constants";

const AppWrapper: FC<{ store?: any }> = ({ store = {} }) => {
  useEffect(() => {
    store.injectReducer(APP_NAME, reducer);
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
};

export default AppWrapper;
