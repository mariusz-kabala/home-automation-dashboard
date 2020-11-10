export interface ISensorDevice {
  id: string;
  manufacturername: string;
  modelid: string;
  name: string;
  battery?: number;
  lastupdated: string;
}

export interface ITemperatureDevice extends ISensorDevice {
  temperature: number;
}

export interface IPressureDevice extends ISensorDevice {
  pressure: number;
}

export interface IHumidityDevice extends ISensorDevice {
  humidity: number;
}

export interface ILightLevelDevice extends ISensorDevice {
  dark: boolean;
  daylight: boolean;
  lightlevel: number;
  lux: number;
}

export interface IOpenCloseDevice extends ISensorDevice {
  open: boolean;
}

export interface ISensorsState {
  lightLevel: {
    [id: string]: ILightLevelDevice;
  };
  humidity: {
    [id: string]: IHumidityDevice;
  };
  temperature: {
    [id: string]: ITemperatureDevice;
  };
  pressure: {
    [id: string]: IPressureDevice;
  };
  openClose: {
    [id: string]: IOpenCloseDevice;
  };
}
