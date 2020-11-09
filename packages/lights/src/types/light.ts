export interface ILightState {
  bri: number;
  colormode?: string;
  hue?: number;
  ct?: number;
  on: boolean;
  sat: number;
}

export interface ILight {
  id?: string;
  name: string;
  manufacturername: string;
  modelid: string;
  lastannounced: string;
  lastseen: string;
  state: ILightState;
}
