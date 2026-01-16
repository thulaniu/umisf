import React, { useEffect } from "react";
import styles from "./tshirt.module.css";

const Tshirt = (props) => {
  return (
    <div className={`${styles["tshirt-container"]}`}>
      <div className={`${styles["tshirt-front"]}`}>
        <img src={require(`../../../assests/images/tshirts/${props.tShirtFront}`)} />
      </div>
      <div className={`${styles["tshirt-title"]}`}>
        <span >Make I</span>
        <span style={{ color: "#0984e3" }}>t Yours</span>
        <a href="#" className={`${styles["order-now"]}`}>Order Now</a>
      </div>
      <div className={`${styles["tshirt-back"]}`}>
        <img src={require(`../../../assests/images/tshirts/${props.tShirtBack}`)} />
      </div>
    </div>
  );
};

export default Tshirt;
