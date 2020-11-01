import React, { Suspense, useEffect, FC } from "react";
import { useDispatch } from "react-redux";
import mqtt from "mqtt";
import { newMqttMsq, mqttConnected, mqttConnecting } from "../../state/actions";
import { dynamicFederation } from "../../helpers";
import { store } from "../../store";

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
    <div>
      Welcome to Host App
      <div>
        <Suspense fallback="Loading...">
          <LightsApp store={store} />
        </Suspense>
        <Suspense fallback="Loading">
          <LoggerApp store={store} />
        </Suspense>
      </div>
    </div>
  );
};
