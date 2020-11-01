import React, { FC } from "react";
import { useDispatch } from "react-redux";
import cx from "classnames";
import { FaRegLightbulb, FaLightbulb } from "react-icons/fa";
import { ILightState } from "../../state/reducer";
import { turnOnDeCONZGroup, turnOffDeCONZGroup } from "../../state/actions";

import styles from "./styles.module.scss";

export const Light: FC<ILightState & { id: string }> = ({ on, id }) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() =>
        dispatch(on ? turnOffDeCONZGroup(id) : turnOnDeCONZGroup(id))
      }
      className={cx(styles.wrapper, {
        [styles.on]: on,
      })}
    >
      {on ? <FaLightbulb /> : <FaRegLightbulb />}
    </div>
  );
};
