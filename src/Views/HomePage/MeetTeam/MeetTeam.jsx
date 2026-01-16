import React, { useEffect } from "react";
import styles from "./meetteam.module.css";

const MeetTeam = (props) => {
  return (
    <div className={`${styles["team-container"]}`}>
      <div className={`${styles["team"]}`}>
        <div className={`${styles["team-title"]}`}>
          OUR{" "}
          <p
            style={{
              display: "inline-block",
              color: "#0984E3",
              borderTop: "2px solid #0984E3",
            }}
          >
            TEAM
          </p>
        </div>
        <div className={`${styles["team-description"]}`}>
          Our team is a family, that consists of dynamic and diverse individuals
          with a close-knit bond that extends beyond the court. We share a deep
          love and passion for the sport of badminton, which serves as a
          unifying force that brings us together. The commitment to support one
          another both on and off the court, whether it's through cheering each
          other during games or being there for each other in tough times,
          creates a sense of belonging and trust that strengthens our team and
          helps us to achieve our goals both individually and as a collective
          unit.
        </div>
      </div>
      <div className={`${styles["team-photo"]}`}>
        <img src={require(`../../../assests/images/${props.teamPhoto}`)} />
      </div>
    </div>
  );
};

export default MeetTeam;
