import React, { FC } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
import styles from "./styles.module.scss";

const data = [
    { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
    // { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
    // { name: 'Group E', value: 278 }, { name: 'Group F', value: 189 },
  ];

export const LightLevelWidget: FC<{}> = () => {
  return (
    <div className={styles.wrapper}>
      <header>
        <h3>Living room</h3>
        <p>Lux level</p>
      </header>

    </div>
  );
};
