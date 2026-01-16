import React from "react";
import HeaderPage from "../../HeaderPage/HeaderPage";
import Styles from "./UniversityRegistration.module.css";

const RegistrationClosed = () => {
  return (
    <div className={Styles.body}>
      <HeaderPage />

      <div className={Styles.title}>
        Registrations Closed
      </div>

      <div
        style={{
          width: "70%",
          margin: "40px auto",
          padding: "30px",
          background: "rgba(0,0,0,0.4)",
          borderRadius: "10px",
          color: "white",
          textAlign: "center",
          fontFamily: "Hind",
        }}
      >
        <p style={{ fontSize: "20px", marginBottom: "15px" }}>
          Registrations for the
          <strong> University of Moratuwa International Shuttlers’ Fest (UMiSF)</strong>
          have been closed.
        </p>

        <p style={{ fontSize: "16px" }}>
          Thank you for your interest.
          <br />
          Please contact the organizing committee for further inquiries.
        </p>
      </div>
    </div>
  );
};

export default RegistrationClosed;
