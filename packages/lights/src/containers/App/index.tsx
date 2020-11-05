import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDeCONTZLightsInfo } from "../../state/actions";
import { Menu } from "../../components/Menu";
import { Content } from "../../components/Content";

import styles from "./styles.module.scss";

export const App: FC<{}> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDeCONTZLightsInfo());
  }, []);

  return (
    <div className={styles.wrapper}>
      <Menu />
      <div className={styles.content}>
        <Content />
      </div>
    </div>
  );
};
