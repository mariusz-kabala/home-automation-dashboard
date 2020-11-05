import React, { Suspense, useEffect, FC } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import mqtt from "mqtt";
import { newMqttMsq, mqttConnected, mqttConnecting } from "../../state/actions";
import { dynamicFederation } from "../../helpers";
import { store } from "../../store";
import { Menu } from "../../components/Menu";
import { Dashboard } from "../Dashboard";
import { Sensors } from "../Sensors";
import { Appliances } from "../Appliances";
import { createBrowserHistory } from "history";

import styles from "./styles.module.scss";

const parseMsg = (msg: string) => {
  try {
    return JSON.parse(msg);
  } catch {
    return msg;
  }
};

const LightsApp = React.lazy(() =>
  dynamicFederation(
    "lights_remote",
    "LightsApp",
    "http://localhost:3002/lights.js"
  )
);

const LoggerApp = React.lazy(() =>
  dynamicFederation(
    "logger_remote",
    "LoggerApp",
    "http://localhost:3003/logger.js"
  )
);

const HeaderApp = React.lazy(() =>
  dynamicFederation(
    "header_remote",
    "HeaderApp",
    "http://localhost:3004/header.js"
  )
);

export const App: FC<{}> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(mqttConnecting());

    const client = mqtt.connect("ws://192.168.0.195:8080/mqtt", {
      keepalive: 10,
      clientId: "webApp",
      protocolId: "MQTT",
      protocolVersion: 4,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
    });

    client.on("connect", function () {
      dispatch(mqttConnected());
    });

    client.on("message", function (topic, message, packet) {
      dispatch(
        newMqttMsq({
          topic,
          payload: parseMsg(message.toString()),
        })
      );
    });

    client.subscribe("home/#");
  }, []);

  return (
    <Router>
      <div className={styles.wrapper}>
        <Suspense fallback="Loading...">
          <HeaderApp store={store} />
        </Suspense>
        <div className={styles.content}>
          <Switch>
            <Route path="/lights">
              <Suspense fallback="Loading...">
                <LightsApp store={store} />
              </Suspense>
            </Route>
            <Route path="/logs">
              <Suspense fallback="Loading...">
                <LoggerApp store={store} />
              </Suspense>
            </Route>
            <Route path="/sensors">
              <Sensors />
            </Route>
            <Route path="/appliances">
              <Appliances />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </div>
        <Menu />
      </div>
    </Router>
  );
};
