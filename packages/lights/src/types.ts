import { IState } from "./state/reducer";
import { APP_NAME } from "./constants";
import { IDeCONZApiStore } from "@home/commons/src/selectors";

export type IStore = { [APP_NAME]: IState } & IDeCONZApiStore
