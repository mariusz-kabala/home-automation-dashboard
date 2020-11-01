import {
  IAction,
  INewMqttMsgAction,
  NEW_MQTT_MSG,
  MQTT_CONNECTED,
  MQTT_CONNECTING,
  MQTT_CONNECTION_ERROR,
} from "./actions";

export interface IState {
  api: {
    deCONZ: {
      key: string
      url: string
    }
  }
  mqttConnection: {
    isConnected: boolean;
    isConnecting: boolean;
    isError: boolean;
    error?: string;
  };
  messagesLog: Array<{
    topic: string;
    timestamp: number;
    payload: unknown;
  }>;
}

const initialState: IState = {
  api: {
    deCONZ: {
      key: 'C1CC8C3DCC',
      url: 'http://192.168.0.34/api'
    }
  },
  mqttConnection: {
    isConnected: false,
    isConnecting: false,
    isError: false,
  },
  messagesLog: [],
};

const newMqttMsg = (state: IState, action: INewMqttMsgAction): IState => {
  const { messagesLog } = state;
  const { msg } = action;

  messagesLog.push({
    ...msg,
    timestamp: new Date().getTime(),
  });

  const messagesLogLength = messagesLog.length

  return {
    ...state,
    messagesLog: messagesLogLength > 1000 ? messagesLog.slice(Math.max(messagesLogLength - 1000, 1)) : [...messagesLog]
  }
};

export function reducer(state: IState = initialState, action: IAction): IState {
  switch (action.type) {
    case NEW_MQTT_MSG:
      return newMqttMsg(state, action);

    case MQTT_CONNECTED:
      return {
        ...state,
        mqttConnection: {
          isConnected: true,
          isConnecting: false,
          isError: false,
        }
      }

    case MQTT_CONNECTING:
      return {
        ...state,
        mqttConnection: {
          isConnected: false,
          isConnecting: true,
          isError: false,
        }
      }

    case MQTT_CONNECTION_ERROR:
      return {
        ...state,
        mqttConnection: {
          isConnected: false,
          isConnecting: false,
          isError: true,
          error: action.error
        }
      }
  }

  return state;
}
