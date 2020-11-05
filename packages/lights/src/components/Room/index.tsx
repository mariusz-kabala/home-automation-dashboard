import React, { FC } from "react";
import { useSelector } from "react-redux";
import { IRoom } from "../../state/reducer";
import { APP_NAME } from "../../constants";
import { LightsGroup } from "../LightsGroup";
import { Light } from "@home/ui-light";
import styles from "./styles.module.scss";

export const Room: FC<IRoom> = ({ id, groups, name }) => {
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

    let length = 0
    for (const group of groupsData) {
      for (const lightId of group.lights) {
        length += 1
        lights[group.id].push({
          id: lightId,
          ...state[APP_NAME].lights[lightId],
        });
      }
    }

    return {
      ...lights,
      length
    };
  });

  return (
    <div className={styles.wrapper}>
      <header className={styles.topHeader}>
        <h2>{name}</h2>
        <p>Total of <strong>{lights.length}</strong> light sources</p>
      </header>
      <div className={styles.content}>
        {groupsData.map((group) => (
          <section key={`group-${group.id}`}>
            <header>
              <Light additionalStyles={styles.light} on={false} />
              <h3>{group.name}</h3>
            </header>
            {(lights[group.id] || []).map((light) => (
              <LightsGroup key={light.id} {...light} />
            ))}
          </section>
        ))}
      </div>
    </div>
  );
};
