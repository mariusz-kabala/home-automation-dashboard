import { APP_NAME } from "../../constants";
import { IStore } from "../../types";

export const getDeCONZGroupState = (id: string, store: IStore) =>
  store[APP_NAME].groups[id].state;
