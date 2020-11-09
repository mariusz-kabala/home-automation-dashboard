import React, { FC, useState } from "react";
import { ILightState, ILight } from "../../types/light";
import { GiExpand } from "react-icons/gi";
import { BiCollapse } from "react-icons/bi";
import { Light as LightIcon } from "@home/ui-light";
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

export const Light: FC<ILight> = ({
  state,
  manufacturername,
  name,
  modelid,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const params = getParams(state);

  return (
    <div className={styles.wrapper} data-testid="light">
      <div className={styles.lightWrapper}>
        <LightIcon additionalStyles={styles.light} on={state.on} />
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
      {params.length > 1 && (
        <a
          className={styles.expandButton}
          onClick={() => setIsExpanded((state) => !state)}
        >
          {isExpanded ? <BiCollapse /> : <GiExpand />}
        </a>
      )}
    </div>
  );
};
