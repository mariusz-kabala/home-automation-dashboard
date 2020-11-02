import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles.module.scss";

export const Menu: FC<{}> = () => {
  const rooms = useSelector((state) => state.lightsApp?.rooms);

  if (!Array.isArray(rooms)) {
    return null;
  }

  return (
    <nav className={styles.wrapper}>
      <ul>
        {rooms.map((room) => (
          <li key={`room-${room}`}>
            <h3>{room.name}</h3>
            <p>
              <strong>{room.groups.length}</strong> in the room
            </p>
          </li>
        ))}
      </ul>
    </nav>
  );
};
