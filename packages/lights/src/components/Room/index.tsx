import React, { FC } from "react";
import { useSelector } from "react-redux";
import { IRoom } from "../../types/room";
import { APP_NAME } from "../../constants";
import { LightsGroup } from "../LightsGroup";
import styles from "./styles.module.scss";

export const Room: FC<IRoom> = ({ groups, name }) => {
  const groupsData = useSelector((state) => {
    const data = state[APP_NAME].groups;
    const result = [];

    for (const id of groups) {
      if (data[id]) {
        result.push({
          ...data[id],
          id,
        });
      }
    }

    return result;
  });

  const lights = useSelector((state) => {
    const lights = groupsData.reduce((all, group) => {
      all[group.id] = [];

      return all;
    }, {});

    let length = 0;
    for (const group of groupsData) {
      for (const lightId of group.lights) {
        length += 1;
        lights[group.id].push({
          id: lightId,
          ...state[APP_NAME].lights[lightId],
        });
      }
    }

    return {
      ...lights,
      length,
    };
  });

  return (
    <div className={styles.wrapper}>
      <header className={styles.topHeader}>
        <h2>{name}</h2>
        <p>
          Total of <strong>{lights.length}</strong> light sources
        </p>
      </header>
      <div>
        {groupsData.map((group) => (
          <LightsGroup
            key={`group-${group.id}`}
            {...group}
            lights={lights[group.id]}
          />
        ))}
      </div>
    </div>
  );
};
