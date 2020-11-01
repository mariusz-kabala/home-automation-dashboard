import React, { FC } from "react";
import { ILightState } from "../../state/reducer";
import { Light } from "../Light";
import Slider from "react-slider";

import styles from "./styles.module.scss";

export const LightsGroup: FC<{
  state: ILightState;
  id: string;
  name: string;
  lights: string[];
}> = ({ state, id, lights, name }) => {
  return (
    <div className={styles.wrapper}>
      <Light id={id} {...state} />
      <h3>{name}</h3>
      <Slider
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        defaultValue={state.bri}
      />
    </div>
  );
};
