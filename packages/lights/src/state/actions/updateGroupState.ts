import { ThunkAction } from "redux-thunk";
import {
  updateDeCONZGroup,
  ILightGroupsdeCONZStateUpdatePayload,
} from "../../api";
import { getDeCONZGroupState } from "../selectors";
import { getDeCONZApi } from "@home/commons/src/selectors";
import { IStore } from "../../types";

export const UPDATE_DECONZ_GROUP_STATE = "lightsApp-update-deCONZ-group-state";

export interface IUpdateDeCONZGroupStateAction {
  type: typeof UPDATE_DECONZ_GROUP_STATE;
  state: ILightGroupsdeCONZStateUpdatePayload;
  id: string;
}

export type IUpdateDeCONZGroupAction = IUpdateDeCONZGroupStateAction;

type IThunkResult<R> = ThunkAction<
  R,
  IStore,
  undefined,
  IUpdateDeCONZGroupAction
>;

export const updateDeCONZGroupState = (
  id: string,
  state: ILightGroupsdeCONZStateUpdatePayload
): IUpdateDeCONZGroupStateAction => ({
  type: UPDATE_DECONZ_GROUP_STATE,
  id,
  state,
});

export const turnOnDeCONZGroup = (id: string): IThunkResult<void> => async (
  dispatch,
  getState
) => {
  const store = getState();
  const groupState = getDeCONZGroupState(id, store);
  const { key, url } = getDeCONZApi(store);
  const action = {
    on: true,
  };

  dispatch(updateDeCONZGroupState(id, action));

  try {
    await updateDeCONZGroup({
      apiKey: key,
      apiUrl: url,
      id,
      action,
    });
  } catch {
    dispatch(updateDeCONZGroupState(id, groupState));
  }
};

export const turnOffDeCONZGroup = (id: string): IThunkResult<void> => async (
    dispatch,
    getState
  ) => {
    const store = getState();
    const groupState = getDeCONZGroupState(id, store);
    const { key, url } = getDeCONZApi(store);
    const action = {
      on: false,
    };
  
    dispatch(updateDeCONZGroupState(id, action));
  
    try {
      await updateDeCONZGroup({
        apiKey: key,
        apiUrl: url,
        id,
        action,
      });
    } catch {
      dispatch(updateDeCONZGroupState(id, groupState));
    }
  };
  