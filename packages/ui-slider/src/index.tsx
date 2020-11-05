import React, { FC } from "react";
import cx from "classnames";
import SliderComponent from "react-slider";
import styles from "./styles.module.scss";

export const Slider: FC<{ value: number }> = ({ value }) => {
  return (
    <SliderComponent
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
  );
};
