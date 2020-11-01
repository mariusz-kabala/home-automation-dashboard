import React, { FC } from "react";
import { Provider } from "react-redux";
import { LogsList } from './components/LogsList'

const App: FC<{ store: unknown }> = ({ store }) => {
  return (
    <Provider store={store}>
      <div>Logger app 222</div>
      <LogsList />
    </Provider>
  );
};

export default App;
