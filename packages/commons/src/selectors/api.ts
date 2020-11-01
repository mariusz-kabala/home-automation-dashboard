export interface IDeCONZApiStore {
  host: {
    api: {
      deCONZ: {
        key: string;
        url: string;
      };
    };
  };
}

export const getDeCONZApi = (store: IDeCONZApiStore) => store.host.api.deCONZ;
