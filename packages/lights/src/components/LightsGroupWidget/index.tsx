import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Light } from "@home/ui-light";
import { Slider } from "@home/ui-slider";
import { ILightState } from "../../state/reducer";
import { turnOnDeCONZGroup, turnOffDeCONZGroup } from "../../state/actions";
import styles from "./styles.module.scss";

export const LightsGroupWidget: FC<{
  id: string;
  name: string;
  lights: string[];
  state: ILightState;
}> = ({ id, name, lights, state }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.wrapper}>
      <h2>{name}</h2>
      <div className={styles.content}>
        <Light
          onClick={() =>
            dispatch(state.on ? turnOffDeCONZGroup(id) : turnOnDeCONZGroup(id))
          }
          on={state.on}
          additionalStyles={styles.light}
        />
        <Slider value={state.bri} />
        <div className={styles.progressWrap}>
          <p>200 lux</p>
          <div className={styles.progress}>
            <div className={styles.progressBar} style={{ width: "69%" }}></div>
          </div>
        </div>
      </div>
      <p className={styles.description}>
        On for <strong>45 minutes</strong>
      </p>
      <p>
        <strong>{lights.length}</strong> devices
      </p>
    </div>
  );
};
