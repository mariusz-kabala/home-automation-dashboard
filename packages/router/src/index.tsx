import React, { Suspense, useEffect } from "react";
// import { useDispatch } from 'react-redux';
import mqtt from "mqtt";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";

type Scope = unknown;
type Factory = () => any;

type Container = {
  init(shareScope: Scope): void;
  get(module: string): Factory;
};

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: Scope };

function loadScriptFile(scriptName) {
  return new Promise((resolve) => {
    const id = `script-${scriptName}`;

    if (document.getElementById(id)) {
      console.warn(`script "${id}" exists`);
      return;
    }

    const js = document.createElement("script");
    const onLoad = () => {
      resolve();

      js.removeEventListener("load", onLoad);
    };

    js.id = id;
    js.src = "http://localhost:3002/lights.js";

    document.body.appendChild(js);

    js.addEventListener("load", onLoad);
  });
}

const dynamicFederation = async (scope, module) => {
  await loadScriptFile("lights");
  const container: any = window[scope]; // or get the container somewhere else
  // Initialize the container, it may provide shared modules
  await container.init(__webpack_share_scopes__.default);
  return container.get(module).then((factory) => {
    const Module = factory();
    return Module;
  });
};

const RemoteApp = React.lazy(() =>
  dynamicFederation("lights_remote", "LightsApp")
);

const parseMsg = (msg) => {
  try {
    return JSON.parse(msg);
  } catch {
    return msg;
  }
};

const App = () => {
  useEffect(() => {
    const client = mqtt.connect("ws://192.168.0.195:8080/mqtt", {
      keepalive: 10,
      clientId: "webApp",
      protocolId: "MQTT",
      protocolVersion: 4,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
    });

    client.on("connect", function () {
      console.log("client connected");
    });

    client.on("message", function (topic, message, packet) {
      console.log({
        topic,
        msg: parseMsg(message.toString()),
      });
    });

    client.subscribe("home/#");
  }, []);
  return (
    <Provider store={store}>
      <div>
        Welcome to Host App
        <div>
          <Suspense fallback="Loading...">
            <RemoteApp />
          </Suspense>
        </div>
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
