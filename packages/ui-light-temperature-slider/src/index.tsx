import React, { FC } from "react";
import cx from "classnames";
import Slider from "react-slider";
import styles from "./styles.module.scss";

export const LightTemperatureSlider: FC<{ value: number }> = ({ value }) => {
  return (
    <div className={styles.wrapper}>
      <Slider
        min={153}
        max={500}
        renderTrack={(props, state) => (
          <div
            {...props}
            index={state.index}
            className={undefined}
          />
        )}
        renderThumb={(props, state) => (
          <div {...props} className={styles.thumb}>
            <div
              className={cx(styles.value, {
                [styles.right]: state.valueNow >= 80,
              })}
            >
              {state.valueNow}%
            </div>
          </div>
        )}
        defaultValue={value}
      />
    </div>
  );
};
