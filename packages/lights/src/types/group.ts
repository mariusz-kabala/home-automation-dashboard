import { ILightState } from "./light";

export interface IGroup {
  id?: string;
  name: string;
  state: ILightState;
  lights: string[];
}
