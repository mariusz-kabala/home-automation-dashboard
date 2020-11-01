export interface IState {
  isLoading: boolean;
  isError: boolean;
  data: {
    temperature: number;
    humidity: number;
    airPressure: number;
  };
}

const initialState: IState = {
  isLoading: false,
  isError: false,
  data: {
    temperature: -1,
    humidity: -1,
    airPressure: -1,
  },
};

export function reducer(
  state: IState = initialState,
  action: any
): IState {
    return state
}
