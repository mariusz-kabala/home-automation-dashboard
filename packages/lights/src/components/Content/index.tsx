import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Room } from "../Room";
import { LightsGroupWidget } from "../LightsGroupWidget";
import { LightLevelWidget } from '../LightLevelWidget';
import styles from "./styles.module.scss";

export const Content: FC<{}> = () => {
  const rooms = useSelector((state) => state.lightsApp?.rooms);
  const groups = useSelector((state) => state.lightsApp?.groups);

  return (
    <Switch>
      <Route exact path="/">
        <div className={styles.wrapper}>
          <div className={styles.left}>
            {groups &&
              Object.keys(groups).map((id) => (
                <LightsGroupWidget
                  key={`group-widget-${id}`}
                  id={id}
                  {...groups[id]}
                />
              ))}
          </div>
          <div className={styles.right}>
            <LightLevelWidget id={'LightLevelWidget-1'} />
            <LightLevelWidget id={'LightLevelWidget-2'} />
            <LightLevelWidget id={'LightLevelWidget-3'} />
            <LightLevelWidget id={'LightLevelWidget-4'} />
            <LightLevelWidget id={'LightLevelWidget-5'} />
          </div>
        </div>
      </Route>

      {rooms &&
        rooms.map((room) => (
          <Route key={`route-${room.name}`} path={`/${room.id}`}>
            <Room {...room} />
          </Route>
        ))}
    </Switch>
  );
};

export default Content;
