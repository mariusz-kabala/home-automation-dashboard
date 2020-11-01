import { ThunkAction } from "redux-thunk";
import {
  fetchDeCONZGroups,
  fetchDeCONZLights,
  ILightGroupsdeCONZResponse,
  IDeCONZLightsResponse,
} from "../../api";
import { getDeCONZApi, IDeCONZApiStore } from "@home/commons/src/selectors";
import { APP_NAME } from '../../constants'

export const FETCH_DECONZ_LIGHTS = `${APP_NAME}-fetch-deCONZ-lights-info`;
export const UPDATE_DECONZ_LIGHTS = `${APP_NAME}-update-deCONZ-lights-app`;
export const FETCH_DECONZ_LIGHTS_ERROR =
  `${APP_NAME}-fetch-deCONZ-lights-info-error`;

export interface IFetchDeCONZLightsInfoAction {
  type: typeof FETCH_DECONZ_LIGHTS;
}

export interface IUpdateDeCONZLightsInfoAction {
  type: typeof UPDATE_DECONZ_LIGHTS;
  payload: {
    lights: IDeCONZLightsResponse;
    groups: ILightGroupsdeCONZResponse;
  };
}

export interface IFetchDeCONZLightsInfoErrorAction {
  type: typeof FETCH_DECONZ_LIGHTS_ERROR;
}

export type IFetchAction =
  | IFetchDeCONZLightsInfoAction
  | IUpdateDeCONZLightsInfoAction
  | IFetchDeCONZLightsInfoErrorAction;

type IThunkResult<R> = ThunkAction<
  R,
  IDeCONZApiStore,
  undefined,
  IFetchAction
>;

export const fetchDeCONTZLightsInfo = (): IThunkResult<void> => async (
  dispatch,
  getState
) => {
  dispatch({
    type: FETCH_DECONZ_LIGHTS,
  });

  const { key, url } = getDeCONZApi(getState());

  try {
    const [lights, groups] = await Promise.all([
      fetchDeCONZLights(url, key),
      fetchDeCONZGroups(url, key),
    ]);

    dispatch({
      type: UPDATE_DECONZ_LIGHTS,
      payload: {
        lights,
        groups,
      },
    });
  } catch {
    dispatch({
      type: FETCH_DECONZ_LIGHTS_ERROR,
    });
  }
};
