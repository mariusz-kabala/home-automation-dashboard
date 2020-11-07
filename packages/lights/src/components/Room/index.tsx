import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import cx from 'classnames'
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { GiExpand } from "react-icons/gi";
import { IRoom } from "../../state/reducer";
import { APP_NAME } from "../../constants";
import { LightsGroup } from "../LightsGroup";
import { Slider } from "@home/ui-slider";
import { Light } from "@home/ui-light";
import styles from "./styles.module.scss";

// const getParams = ()

export const Room: FC<IRoom> = ({ id, groups, name }) => {
  const [areLightsVisible, setAreLightsVisible] = useState<boolean>(false);
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
  console.log(groupsData);
  return (
    <div className={styles.wrapper}>
      <header className={styles.topHeader}>
        <h2>{name}</h2>
        <p>
          Total of <strong>{lights.length}</strong> light sources
        </p>
      </header>
      <div className={styles.content}>
        {groupsData.map((group) => (
          <section key={`group-${group.id}`} className={cx({
            [styles.expanded]: areLightsVisible
          })}>
            <header>
              <div className={styles.lightWrapper}>
                <Light additionalStyles={styles.light} on={false} />
              </div>
              <div className={styles.dsc}>
                <h3>{group.name}</h3>
              </div>
              <div className={styles.hue}></div>
              <div className={styles.slider}>
                <Slider value={group.state.bri} />
              </div>
              <a className={styles.expandButton} onClick={() => null}>
                <GiExpand />
              </a>
            </header>
            {areLightsVisible &&
              (lights[group.id] || []).map((light) => (
                <LightsGroup key={light.id} {...light} />
              ))}

            <div className={styles.seeAll}>
              {!areLightsVisible ? (
                <MdExpandMore
                  onClick={() => setAreLightsVisible((state) => !state)}
                />
              ) : (
                <MdExpandLess
                  onClick={() => setAreLightsVisible((state) => !state)}
                />
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
