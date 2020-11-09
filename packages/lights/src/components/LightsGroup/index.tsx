import React, { FC, useState, useCallback } from "react";
import cx from "classnames";
import { GiExpand } from "react-icons/gi";
import { Light as LightIcon } from "@home/ui-light";
import { Slider } from "@home/ui-slider";
import { HuePicker, AlphaPicker } from "react-color";
import { LightTemperatureSlider } from "@home/ui-light-temperature-slider";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { Light } from "../Light";
import { IGroup } from "../../types/group";
import { ILight } from "../../types/light";
import { ILightState } from "../../types/light";

import styles from "./styles.module.scss";

const hasParam = (param: string, lights: ILight[]) => {
  for (const light of lights) {
    if (typeof light.state[param] !== "undefined") {
      return true;
    }
  }

  return false;
};

const getParams = (lights: ILight[], state: ILightState) => {
  const params = [];

  if (hasParam("hue", lights)) {
    params.push({
      label: "Color",
      component: <HuePicker />,
    });
  }

  if (hasParam("ct", lights)) {
    params.push({
      label: "Temperature",
      component: <LightTemperatureSlider value={state.ct} />,
    });
  }

  if (hasParam("sat", lights)) {
    params.push({
      label: "Saturation",
      component: (
        <div className={styles.saturation}>
          <AlphaPicker />
        </div>
      ),
    });
  }

  return params;
};

type ILightGroupProps = Omit<IGroup, "lights"> & { lights: ILight[] };

export const LightsGroup: FC<ILightGroupProps> = ({
  state,
  name,
  lights = [],
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const params = getParams(lights, state);
  const toggleExpand = useCallback(() => setIsExpanded((state) => !state), []);
  const toggleDetails = useCallback(
    () => setShowDetails((state) => !state),
    []
  );

  return (
    <section
      data-test-id={"light-group"}
      className={cx(styles.wrapper, {
        [styles.expanded]: isExpanded,
      })}
    >
      <header>
        <div className={styles.lightWrapper}>
          <LightIcon additionalStyles={styles.light} on={false} />
        </div>
        <div className={styles.dsc}>
          <h3>{name}</h3>
        </div>
        <div className={styles.hue}>
          {!showDetails && params[0] && params[0].component}
          {showDetails &&
            params.map((param, index) => (
              <div key={`param-${index}`}>
                <label>{param.label}:</label>
                {param.component}
              </div>
            ))}
        </div>
        <div className={styles.slider}>
          <Slider value={state.bri} />
        </div>
        <a className={styles.expandButton} onClick={toggleDetails}>
          <GiExpand />
        </a>
      </header>
      {isExpanded && lights.map((light) => <Light key={light.id} {...light} />)}

      <div className={styles.seeAll}>
        {!isExpanded ? (
          <MdExpandMore onClick={toggleExpand} />
        ) : (
          <MdExpandLess onClick={toggleExpand} />
        )}
      </div>
    </section>
  );
};
