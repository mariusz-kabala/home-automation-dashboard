import React, { FC } from "react";
import { useSelector } from "react-redux";
import cx from "classnames";
import { Link, useLocation } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";
import { AiFillBulb } from "react-icons/ai";
import { MdKitchen, MdTv } from "react-icons/md";
import { BiBath, BiBed, BiDoorOpen } from "react-icons/bi";

import styles from "./styles.module.scss";

const getRoomIcon = (id: string) => {
  switch (id) {
    case "kitchen":
      return <MdKitchen />;

    case "living-room":
      return <MdTv />;

    case "bathroom":
      return <BiBath />;

    case "bedroom":
      return <BiBed />;

    case "corridor":
      return <BiDoorOpen />;

    default:
      return null;
  }
};

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
              <b className={styles.icon}>
                <AiFillBulb />
              </b>
              <h3>Overview</h3>
              <b className={styles.more}>
                <FaAngleDoubleRight />
              </b>
            </li>
          </Link>
          {rooms.map((room) => (
            <Link key={`room-${room.name}`} to={`/${room.id}`}>
              <li
                className={cx({
                  [styles.active]: location.pathname === `/${room.id}`,
                })}
              >
                <b className={styles.icon}>{getRoomIcon(room.id)}</b>
                <div>
                  <h3>{room.name}</h3>
                  <p>
                    <strong>{room.groups.length}</strong> in the room
                  </p>
                </div>
                <b className={styles.more}>
                  <FaAngleDoubleRight />
                </b>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
};
