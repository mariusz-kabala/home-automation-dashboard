export const NEW_MQTT_MSG = "new-mqtt-msg";
export const MQTT_CONNECTED = "mqtt-connected";
export const MQTT_CONNECTING = "mqtt-connecting";
export const MQTT_CONNECTION_ERROR = "mqtt-connection-error";

export interface INewMqttMsgAction {
  type: typeof NEW_MQTT_MSG;
  msg: {
    topic: string;
    payload: unknown;
  };
}

export interface IMqttConnectedAction {
  type: typeof MQTT_CONNECTED;
}

export interface IMqttConnectingAction {
  type: typeof MQTT_CONNECTING;
}

export interface IMqttConnectionErrorAction {
  type: typeof MQTT_CONNECTION_ERROR;
  error?: string;
}

export const newMqttMsq = (msg: {
  topic: string;
  payload: unknown;
}): INewMqttMsgAction => ({
  type: NEW_MQTT_MSG,
  msg,
});

export const mqttConnected = (): IMqttConnectedAction => ({
  type: MQTT_CONNECTED,
});

export const mqttConnecting = (): IMqttConnectingAction => ({
  type: MQTT_CONNECTING,
});

export const mqttConnectionError = (
  error?: string
): IMqttConnectionErrorAction => ({
  type: MQTT_CONNECTION_ERROR,
  error,
});

export type IAction =
  | INewMqttMsgAction
  | IMqttConnectedAction
  | IMqttConnectingAction
  | IMqttConnectionErrorAction;
