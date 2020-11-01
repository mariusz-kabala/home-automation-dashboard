export interface IDeCONZLightsResponse {
  [id: string]: {
    ctmax?: number;
    ctmin?: number;
    hascolor: boolean;
    lastseen: string;
    lastannounced: string;
    manufacturername: string;
    name: string;
    modelid: string;
    type: string;
    state: {
      bri: number;
      colormode?: string;
      ct?: number;
      effect: string;
      hue?: number;
      on: boolean;
      sat?: boolean;
      reachable: boolean;
    };
  };
}

export const fetchDeCONZLights = (
  apiUrl: string,
  apiKey: string
): Promise<IDeCONZLightsResponse> =>
  fetch(`${apiUrl}/${apiKey}/lights`).then((res) => res.json());
