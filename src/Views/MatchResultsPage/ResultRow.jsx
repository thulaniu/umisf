import React from "react";
import Styles from "./ResultRow.module.css";

const ResultRow = (props) => {
  return (
    <div
      className={`${Styles["row"]}`}
      //   id = {employee.emp_id}
    >
      
        <div className={`${Styles["text-wrapper"]}`}> 
        <div className={`${Styles["age-group"]} text-center`} >
          {props.match.ageGroup}{" - "}{props.match.matchType}{`' `}{props.match.matchCategory}
        </div>
        <div className={`${Styles["players-text"]} text-center`} style={{fontFamily:"overlock"}}>
          {props.match.playerOne.player.firstName}{" Vs. "}{props.match.playerTwo.player.firstName}
          </div>

            <div className={`${Styles["age-group"]} text-center`} >{props.match.scheduledDate}</div>
            <div className={`${Styles["age-group"]} text-center`} >{props.match.scheduledTime}</div>
           
            </div>
    </div>
  );
};

export default ResultRow;
