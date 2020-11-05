import React, { FC } from "react";
import { useSelector } from "react-redux";
import cx from "classnames";
import { Link, useLocation } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";

import styles from "./styles.module.scss";

export const Menu: FC<{}> = () => {
  const rooms = useSelector((state) => state.lightsApp?.rooms);
  const location = useLocation();

  if (!Array.isArray(rooms)) {
    return null;
  }

  return (
    <nav className={styles.wrapper}>
      <div className={styles.content}>
        <ul>
          <Link to={`/`}>
            <li
              className={cx({
                [styles.active]: location.pathname === `/`,
              })}
            >
              <h3>Overview</h3>
              <FaAngleDoubleRight />
            </li>
          </Link>
          {rooms.map((room) => (
            <Link key={`room-${room.name}`} to={`/${room.id}`}>
              <li
                className={cx({
                  [styles.active]: location.pathname === `/${room.id}`,
                })}
              >
                <h3>{room.name}</h3>
                <p>
                  <strong>{room.groups.length}</strong> in the room
                </p>
                <FaAngleDoubleRight />
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
};
