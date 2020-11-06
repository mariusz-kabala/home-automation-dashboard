import React, { FC, useState } from "react";
import { ILightState } from "../../state/reducer";
import { GiExpand } from "react-icons/gi";
import { Light } from "@home/ui-light";
import { Slider } from "@home/ui-slider";
import { HuePicker, AlphaPicker, Slider as SliderColor } from "react-color";

import styles from "./styles.module.scss";

export const LightsGroup: FC<{
  state: ILightState;
  id: string;
  name: string;
  modelid: string;
  manufacturername: string;
}> = ({ state, id, manufacturername, name, modelid }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

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
        {state.hue && <HuePicker />}
        {isExpanded && state.sat && <AlphaPicker />}
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
