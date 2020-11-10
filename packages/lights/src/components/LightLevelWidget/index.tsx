import React, { FC } from "react";
import GaugeChart from "react-gauge-chart";
import { BiRefresh } from "react-icons/bi";
import styles from "./styles.module.scss";

export const LightLevelWidget: FC<{ id: string }> = ({ id }) => {
  return (
    <div className={styles.wrapper}>
      <header>
        <h3>Living room</h3>
        <p>Lux level</p>
        <b>
          <BiRefresh />
        </b>
      </header>
      <div className={styles.content}>
        <GaugeChart
          hideText={true}
          id={id}
          nrOfLevels={4}
          colors={["#D2D7D3", "#A17917", "#FFA631", "#F7CA18"]}
          arcWidth={0.3}
          percent={0.37}
        />
      </div>
    </div>
  );
};
