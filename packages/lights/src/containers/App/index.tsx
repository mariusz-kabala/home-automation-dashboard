import React, { FC, useEffect } from "react";
import { LightsGroup } from "../../components/LightsGroup";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeCONTZLightsInfo } from "../../state/actions";
import { Menu } from '../../components/Menu'

import styles from './styles.module.scss'

export const App: FC<{}> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDeCONTZLightsInfo());
  }, []);

  const groups = useSelector((state) => state.lightsApp?.groups)

  return (
    <div className={styles.wrapper}>
      <Menu />
      <div className={styles.content}>
        content   
      </div>
      {
        // groups && Object.keys(groups).map(groupId => (
        //   <LightsGroup key={`group-${groupId}`} id={groupId} {...groups[groupId]} />
        // ))
      }
    </div>
  );
};
