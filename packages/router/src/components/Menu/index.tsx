import React, { FC } from "react";
import cx from "classnames";
import { AiFillDashboard, AiFillBulb, AiFillAppstore } from "react-icons/ai";
import { FaTemperatureLow } from "react-icons/fa";
import { BsLightningFill } from "react-icons/bs";
import { VscListSelection } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";

import styles from "./styles.module.scss";

export const Menu: FC<{}> = () => {
  const location = useLocation();

  return (
    <nav className={styles.wrapper}>
      <ul>
        <Link to="/">
          <li
            className={cx({
              [styles.active]: location.pathname === "/",
            })}
          >
            <b>
              <AiFillDashboard />
            </b>
            Dashboard
          </li>
        </Link>

        <Link to="/lights">
          <li
            className={cx({
              [styles.active]: location.pathname === "/lights",
            })}
          >
            <b>
              <AiFillBulb />
            </b>
            Lighting
          </li>
        </Link>

        <Link to="/sensors">
          <li
            className={cx({
              [styles.active]: location.pathname === "/sensors",
            })}
          >
            <b>
              <FaTemperatureLow />
            </b>
            Sensors
          </li>
        </Link>

        <Link to="/electricity">
          <li
            className={cx({
              [styles.active]: location.pathname === "/electricity",
            })}
          >
            <b>
              <BsLightningFill />
            </b>
            Electricity
          </li>
        </Link>

        <Link to="/appliances">
          <li
            className={cx({
              [styles.active]: location.pathname === "/appliances",
            })}
          >
            <b>
              <AiFillAppstore />
            </b>
            Appliances
          </li>
        </Link>

        <Link to="/logs">
          <li
            className={cx({
              [styles.active]: location.pathname === "/logs",
            })}
          >
            <b>
              <VscListSelection />
            </b>
            Logs
          </li>
        </Link>
      </ul>
    </nav>
  );
};
