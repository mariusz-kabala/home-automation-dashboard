export interface ILightGroupAction {
  bri: number;
  colormode?: string;
  ct?: number;
  effect: string;
  hue?: number;
  on: boolean;
  sat: number;
  xy: [number, number];
}

export interface ILightGroupsdeCONZResponse {
  [id: string]: {
    action: ILightGroupAction;
    id: string;
    lights: string[];
    name: string;
    type: "LightGroup";
  };
}

export type ILightGroupsdeCONZStateUpdatePayload = Partial<ILightGroupAction> & { toogle?: boolean }

export const fetchDeCONZGroups = (
  apiUrl: string,
  apiKey: string
): Promise<ILightGroupsdeCONZResponse> =>
  fetch(`${apiUrl}/${apiKey}/groups`).then((res) => res.json());

export const updateDeCONZGroup = ({
  apiUrl,
  apiKey,
  id,
  action,
}: {
  apiUrl: string;
  apiKey: string;
  id: string;
  action: ILightGroupsdeCONZStateUpdatePayload;
}) => {
  return fetch(`${apiUrl}/${apiKey}/groups/${id}/action`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(action),
  }).then((res) => res.json());
};
