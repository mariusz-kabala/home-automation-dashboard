import React, { FC } from "react";
import { useSelector } from "react-redux";
import ReactJson from "react-json-view";
import { formatDistance } from "date-fns";
import styles from "./styles.module.scss";

export const LogsList: FC<{}> = () => {
  const messages = useSelector((state) => state.host.messagesLog);
  const now = new Date();

  return (
    <div className={styles.wrapper}>
        Total messages: {messages.length}
      {messages.reverse().map((msg) => (
        <div key={`msg-${msg.timestamp}`}>
          <section className={styles.message}>
              <header>
                <span className={styles.time}>{formatDistance(now, new Date(msg.timestamp))}</span> {msg.topic}
              </header>
              <ReactJson name={null} src={msg.payload} theme={"monokai"} collapsed={true} />  
          </section>
        </div>
      ))}
    </div>
  );
};
