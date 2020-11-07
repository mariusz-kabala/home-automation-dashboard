import React, { FC, useState } from "react";
import { ILightState } from "../../state/reducer";
import { GiExpand } from "react-icons/gi";
import { Light } from "@home/ui-light";
import { Slider } from "@home/ui-slider";
import { HuePicker, AlphaPicker } from "react-color";
import { LightTemperatureSlider } from "@home/ui-light-temperature-slider";

import styles from "./styles.module.scss";

const getParams = (state: ILightState) => {
  const params = [];

  if (state.hue) {
    params.push({
      label: "Color",
      component: <HuePicker />,
    });
  }

  if (state.ct) {
    params.push({
      label: "Temperature",
      component: <LightTemperatureSlider value={state.ct} />,
    });
  }

  if (state.sat) {
    params.push({
      label: "Saturation",
      component: (
        <div className={styles.saturation}>
          <AlphaPicker />
        </div>
      ),
    });
  }

  return params;
};

export const LightsGroup: FC<{
  state: ILightState;
  id: string;
  name: string;
  modelid: string;
  manufacturername: string;
}> = ({ state, id, manufacturername, name, modelid }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const params = getParams(state);

  return (
    <div className={styles.wrapper}>
      <div className={styles.lightWrapper}>
        <Light additionalStyles={styles.light} on={state.on} />
      </div>
      <div className={styles.dsc}>
        <h3>{name}</h3>
        <p>
          {manufacturername} {modelid}
        </p>
      </div>
      <div className={styles.hue}>
        {!isExpanded && params[0] && params[0].component}
        {isExpanded &&
          params.map((param, index) => (
            <div key={`param-${index}`}>
              <label>{param.label}:</label>
              {param.component}
            </div>
          ))}
      </div>
      <div className={styles.slider}>
        <Slider value={state.bri} />
      </div>
      <a
        className={styles.expandButton}
        onClick={() => setIsExpanded((state) => !state)}
      >
        <GiExpand />
      </a>
    </div>
  );
};
