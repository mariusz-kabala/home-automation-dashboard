import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Room } from "../Room";
import { LightsGroupWidget } from "../LightsGroupWidget";
import styles from './styles.module.scss'

export const Content: FC<{}> = () => {
  const rooms = useSelector((state) => state.lightsApp?.rooms);
  const groups = useSelector((state) => state.lightsApp?.groups);

  return (
    <Switch>
      <Route exact path="/">
        <div className={styles.wrapper}>
          {groups &&
            Object.keys(groups).map((id) => (
              <LightsGroupWidget
                key={`group-widget-${id}`}
                id={id}
                {...groups[id]}
              />
            ))}
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
