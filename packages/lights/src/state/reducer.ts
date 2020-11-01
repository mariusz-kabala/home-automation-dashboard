import {
  IUpdateDeCONZLightsInfoAction,
  IUpdateDeCONZGroupStateAction,
  IAction,
  FETCH_DECONZ_LIGHTS,
  UPDATE_DECONZ_LIGHTS,
  FETCH_DECONZ_LIGHTS_ERROR,
  UPDATE_DECONZ_GROUP_STATE
} from "./actions";

export interface ILightState {
  bri: number;
  colormode?: string;
  hue?: number;
  ct?: number;
  on: boolean;
  sat: number;
}

export interface IState {
  isLoading: boolean;
  isError: boolean;
  groups: {
    [id: string]: {
      name: string;
      state: ILightState;
      lights: string[];
    };
  };
  lights: {
    [id: string]: {
      name: string;
      manufacturername: string;
      modelid: string;
      lastannounced: string;
      lastseen: string;
      state: ILightState;
    };
  };
}

const MODELS_TO_SKIP = ['RaspBee'] // list of lights to not use (fake ones)

const initialState: IState = {
  isLoading: false,
  isError: false,
  groups: {},
  lights: {},
};

const updateDeCONTZLights = (_state: IState, action: IUpdateDeCONZLightsInfoAction): IState => {
  const { payload } = action
  const groups = {}
  const lights = {}

  // groups
  for (const groupId of Object.keys(payload.groups)) {
    const currentGroup = payload.groups[groupId]
    
    // do not consider groups without bulbs
    if (currentGroup.lights.length === 0) {
      continue
    }
    
    groups[groupId] = {
      name: currentGroup.name,
      lights: currentGroup.lights,
      state: {
        bri: currentGroup.action.bri,
        colormode: currentGroup.action.colormode,
        hue: currentGroup.action.hue,
        ct: currentGroup.action.ct,
        on: currentGroup.action.on,
        sat: currentGroup.action.sat,
      }
    }
  }

  // lights
  for (const lightId of Object.keys(payload.lights)) {
    const currentLight = payload.lights[lightId]

    if (MODELS_TO_SKIP.includes(currentLight.modelid)) {
      continue
    }

    lights[lightId] = {
      name: currentLight.name,
      manufacturername: currentLight.manufacturername,
      modelid: currentLight.modelid,
      lastannounced: currentLight.lastannounced,
      lastseen: currentLight.lastseen,
      state: {
        bri: currentLight.state.bri,
        colormode: currentLight.state.colormode,
        hue: currentLight.state.hue,
        ct: currentLight.state.ct,
        on: currentLight.state.on,
        sat: currentLight.state.sat,
      }
    }
  }

  return {
    isLoading: false,
    isError: false,
    groups,
    lights,
  }
}

const updateDeCONTZGroupState = (store: IState, action: IUpdateDeCONZGroupStateAction): IState => {
  const { state, id } = action

  return {
    ...store,
    groups: {
      ...store.groups,
      [id]: {
        ...store.groups[id],
        state: {
          ...store.groups[id].state,
          ...state
        }
      }
    }
  }
} 

export function reducer(state: IState = initialState, action: IAction): IState {
  switch (action.type) {
    case FETCH_DECONZ_LIGHTS:
      return {
        ...initialState,
        isLoading: true,
        isError: false
      }

    case FETCH_DECONZ_LIGHTS_ERROR:
      return {
        ...initialState,
        isLoading: false,
        isError: true
      }

    case UPDATE_DECONZ_LIGHTS:
      return updateDeCONTZLights(state, action as IUpdateDeCONZLightsInfoAction)

    case UPDATE_DECONZ_GROUP_STATE:
      return updateDeCONTZGroupState(state, action as IUpdateDeCONZGroupStateAction)
  }

  return state;
}
