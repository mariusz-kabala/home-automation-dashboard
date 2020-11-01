import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { App } from './containers/App'


const HostApp = () => (
  <Provider store={store}>
   <App />
  </Provider>
)

ReactDOM.render(<HostApp />, document.getElementById("root"));
