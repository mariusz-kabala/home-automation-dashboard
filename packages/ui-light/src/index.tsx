import React, { FC } from "react";
import cx from "classnames";
import { FaRegLightbulb, FaLightbulb } from "react-icons/fa";
import styles from "./styles.module.scss";

export const Light: FC<{
    on: boolean
    additionalStyles?: string
    onClick?: () => void
}> = ({ on, onClick, additionalStyles }) => {
    return (
        <div
          onClick={onClick}
          className={cx(styles.wrapper, additionalStyles, {
            [styles.on]: on,
          })}
        >
          {on ? <FaLightbulb /> : <FaRegLightbulb />}
        </div>
      );
}
