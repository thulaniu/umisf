import React , {useState} from "react";
import styles from './registrationsNotOpen.module.css'

const RegistrationsNotOpen = () => {

  const [registrationPeriod, setRegistrationPeriod] = useState(["13-04-2023", "30-04-2023"]);
  return (
    <div className={`${styles["not-available-content"]}`}>
      <div className={`${styles["sad-face"]}`}>{":("}</div>

      <div className={`${styles["content"]}`}>
        <h1>NOT AVAILABLE</h1>
        <p> The registrations will be open <b style={{fontFamily:"Hind", fontSize:"15px", color:"red"}}>{registrationPeriod[0]}{" "}</b>
         onwards, untill <b style={{fontFamily:"Hind", fontSize:"15px", color:"red"}}>{registrationPeriod[1]}</b>.</p>
        <a href="/" className={`${styles["home-button"]}`}>
          {" "}
          Home Page
        </a>
      </div>
    </div>
  );
};

export default RegistrationsNotOpen;