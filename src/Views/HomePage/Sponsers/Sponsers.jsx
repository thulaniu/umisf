import React, { useEffect, useState } from "react";
import styles from "./sponsers.module.css";

const Sponsers = (props) => {
  const [sponsers,setSponsers] = useState(props.sponsers);

  return (
    <div className={`${styles["sponsers"]}`}>
        <p>EVENT SPONSORED BY</p>
      {sponsers.map((sponser, index) => (
        <div className={`${styles["sponser"]}`}>
          <img src={require(`../../../assests/images/sponsers/${sponser}`)} alt=""></img>
        </div>
      ))}
    </div>
  );
};

export default Sponsers;
