import React from "react";
import styles from './notAvailablePage.module.css'

const NotAvailablePage = (props) => {
  return (
    <div className={`${styles["not-available-content"]}`}>
      <div className={`${styles["sad-face"]}`}>{":("}</div>

      <div className={`${styles["content"]}`}>
        <p> The draws will be available from the <b style={{fontFamily:"Hind", fontSize:"15px", color:"red"}}>{props.publishedDate}</b>. </p>
        
      </div>
    </div>
  );
};

export default NotAvailablePage;
