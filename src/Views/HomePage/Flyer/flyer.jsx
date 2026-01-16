import React, { useEffect, useState } from "react";
import styles from "./flyer.module.css";
import { saveAs } from "file-saver";
import guidlines from "../../../assests/documents/Tournament Guidlines - UMiSF 2023.pdf";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

const Flyer = (props) => {
  const [date, setDate] = useState(props.starttingDate);
  const [venue, setVenue] = useState(props.venue);
  const [registrationPeriod, setRegistrationPeriod] = useState(props.registrationsDeadlines);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const superscript = (letter) => {
    if (letter == "1") {
      return "st";
    } else if (letter == "2") {
      return "nd";
    } else if (letter == "3") {
      return "rd";
    } else {
      return "th";
    }
  };

  const formatDate = (date) => {
    let dayList = date.slice(0, 10).split("-");
    let month = months[parseInt(dayList[1]) - 1];
    return [dayList[0], month, dayList[2]];
  };

  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  useEffect(() => {
    let period = [];
    for (let i = 0; i < registrationPeriod.length; i++) {
      period.push(formatDate(registrationPeriod[i]));
    }

    setRegistrationPeriod(period);
  }, []);

  return (
    <div className={`${styles["flyer-container"]}`}>
      <img
        className={`${styles["flyer-image"]}`}
        src={require("../../../assests/images/flyer-background.png")}
      />
      <div className={`${styles["overlay"]}`}>
        <div className={`${styles["action"]}`}>Action</div>
        <div className={`${styles["starts"]}`}>Starts</div>
        <div className={`${styles["from"]}`}>from</div>
        <div className={`${styles["day"]}`}>
          {date[2] + " "}
          <sup style={{ fontSize: "1.5vw" }}>{superscript(date[2].charAt(date[2].length - 1))}</sup>
        </div>
        <div className={`${styles["month"]}`}>{date[1] + " , " + date[0]}</div>
        <div className={`${styles["venue"]}`}>
          {venue.map((place, index) => (
            <p> {index == 0 ? "at " + place : "& " + place}</p>
          ))}
        </div>

        <div className={`${styles['schedule']}`}>
        <a href="https://docs.google.com/document/d/11vPpB7E51RCKBoEbHDGFydU6os1HeChAtb7QmAMPHIE/edit?usp=sharing" target='_blank'>
        <img className={`${styles['download-image']}`} src={require('../../../assests/images/schedule.png')} />
        Tournament Schedule</a>
        </div>

        {/* <div className={`${styles['register']}`} onClick={toggleShow} type='button'>
          Register
        </div> */}
        {/* <div className={`${styles['before']}`}>
          {`from ${registrationPeriod[0][2]}`} <sup style={{ fontSize: '0.6vw' }}>{`${superscript(registrationPeriod[0][2].charAt(registrationPeriod[0][2].length - 1))}`}</sup>{' '}
          {`${registrationPeriod[0][1]} ${registrationPeriod[0][0]}`}
          <br />
          {`to ${registrationPeriod[1][2]}`} <sup style={{ fontSize: '0.6vw' }}>{`${superscript(registrationPeriod[1][2].charAt(registrationPeriod[1][2].length - 1))}`}</sup>{' '}
          {`${registrationPeriod[1][1]} ${registrationPeriod[1][0]}`}
        </div> */}
        {/* <div className={`${styles['more-info']}`}>
          {'For more info, refer '}
          <a  target="_blank" rel="noopener noreferrer" href="https://drive.google.com/file/d/1oHYdgxl3w0N_vAe6ZxuHVbVRBIoe74RT/view?usp=sharing">
            Tournament Details Guidlines
          </a>
        </div> */}
      </div>

      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle style={{ fontFamily: "Hind" }}>
                {" "}
                UMiSF - EVENT REGISTRATION{" "}
              </MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://drive.google.com/file/d/1yWmGIIIdsH4youcA55p1TC0g2slLXg82/view?usp=share_link"
                className={`${styles["register-links"]}`}
              >
                Age Group
              </a>
              <br />
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://drive.google.com/file/d/1dQXyKhEED3OzXbhq3uDkmhzITjdwAPJ1/view?usp=share_link"
                className={`${styles["register-links"]}`}
              >
                University Team
              </a>
              <br />
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://drive.google.com/file/d/1-xE8PS5dzhggxwio9Svl1JWyJB3FmAvk/view?usp=share_link"
                className={`${styles["register-links"]}`}
              >
                University Individual
              </a>
              <br />
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://drive.google.com/file/d/1cgcBiWDr9u6SuuOtzb0DslS9UlNb24fb/view?usp=share_link"
                className={`${styles["register-links"]}`}
              >
                University Staff
              </a>
              <br />
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://drive.google.com/file/d/1l25KUoUstYLZZ1Kpe6aUN9edPoPaLYh3/view?usp=share_link"
                className={`${styles["register-links"]}`}
              >
                Corporate Team
              </a>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default Flyer;
