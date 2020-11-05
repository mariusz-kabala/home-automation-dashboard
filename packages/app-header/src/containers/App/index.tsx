import React, { FC, useEffect, useState } from "react";
import dayjs from "dayjs";

import styles from "./styles.module.scss";

export const App: FC<{}> = () => {
  const [time, setTime] = useState<{
    time: string;
    seconds: string;
    date: string;
  }>({
    time: dayjs().format("HH:mm"),
    seconds: dayjs().format("ss"),
    date: dayjs().format("DD MMMM YYYY"),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime({
        time: dayjs().format("HH:mm"),
        seconds: dayjs().format("ss"),
        date: dayjs().format("DD MMMM YYYY"),
      });

      return () => clearTimeout(timer);
    }, 1000);
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.timer}>
        <div className={styles.content}>
          <span className={styles.time}>{time.time}</span>{" "}
          <span className={styles.seconds}>:{time.seconds}</span>
          <span className={styles.date}>{time.date}</span>
        </div>
      </div>
      <div className={styles.notifications}>
        <div className={styles.content}>notifications go here</div>
      </div>
    </div>
  );
};
