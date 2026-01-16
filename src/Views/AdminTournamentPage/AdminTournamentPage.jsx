import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import styles from "./adminTournamentPage.module.css";

const AdminTournamentPage = () => {
  const showMessage = () => {
    setIsClickedCurrent(!isClickedCurrent);
  };

  const [isInitiatedTournament, setIsInitiatedTournament] = useState(true);

  const rotateLeftStyle = { transform: "rotate(-360deg)" };
  const rotateRightStyle = { transform: "rotate(90deg)" };

  const [isClickedCurrent, setIsClickedCurrent] = useState(true);
  const [isClickedPast, setIsClickedPast] = useState(false);

  const [ageGroups, setAgeGroups] = useState([
    "Under 11",
    "Under 17",
    "Under 19",
    "Under 21",
    "University",
  ]);

  const [Tournament, setTournament] = useState({
    startingDate: "2012-12-01",
    description: "UMiSF",
    tshirtFront: "tshirt-front.png",
    tshirtBack: "tshirt-back.png",
    flyers: ["flyer_1.jpeg", "flyer_2.jpeg", "flyer_1.jpeg"],
  });

  return (
    <div className={`${styles["tournament-container"]}`}>

      <ProfileHeader user_type={"admin"} />
      <AdminNavbar page="tournament" />

      <div className={`${styles["main-title"]}`}>
        <a href="/admin/tournament">Tournament</a>
      </div>
      <div className={`${styles["tool-bar"]}`}>
        <a
          href="/admin/tournament/create-tournament"
          className={
            isInitiatedTournament
              ? "btn disabled border-0 shadow-none pl-0"
              : "btn border-0 shadow-none pl-0"
          }
          aria-disabled="true"
        >
          <img src={require("../../assests/images/add.png")} alt="" /> Create
          Tournament
        </a>

        <a
          href=""
          style={{ color: "red" }}
          className={
            isInitiatedTournament
              ? "btn padding-none border-0 shadow-none"
              : "btn disabled padding-none border-0 shadow-none"
          }
        >
          <img src={require("../../assests/images/close.png")} alt="" /> Close
          Tournament
        </a>
      </div>
      <div className={`${styles["sub-titles"]}`}>
        <a href="#" onClick={() => setIsClickedPast(!isClickedPast)}>
          {isClickedPast ? (
            <img
              style={rotateRightStyle}
              className={`${styles["sub-title-arrow-message"]}`}
              src={require("../../assests/images/forward_arrow.png")}
              alt=""
              srcset=""
            />
          ) : (
            <img
              style={rotateLeftStyle}
              className={`${styles["sub-title-arrow-message"]}`}
              src={require("../../assests/images/forward_arrow.png")}
              alt=""
              srcset=""
            />
          )}
          Past Tournaments
        </a>
      </div>
      <div className={`${styles["sub-titles"]}`}>
        <a href="#" onClick={showMessage}>
          {isClickedCurrent ? (
            <img
              style={rotateRightStyle}
              className={`${styles["sub-title-arrow-message"]}`}
              src={require("../../assests/images/forward_arrow.png")}
              alt=""
              srcset=""
            />
          ) : (
            <img
              style={rotateLeftStyle}
              className={`${styles["sub-title-arrow-message"]}`}
              src={require("../../assests/images/forward_arrow.png")}
              alt=""
              srcset=""
            />
          )}
          Current Tournament
        </a>
      </div>
      {! isInitiatedTournament
        ? isClickedCurrent && (
            <div id="message" className={`${styles["message"]}`}>
              No tournaments have been initiated yet
            </div>
          )
        : isClickedCurrent && (
            <div
              id="tournament-details"
              className={`${styles["tournament-details"]}`}
            >
              <div className={`${styles["tool-bar"]}`}>
                <Link
                  to="/admin/tournament/edit-tournament"
                  state={{
                    tournament: Tournament,
                    selectedAgeGroups: ageGroups,
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <img src={require("../../assests/images/edit.png")} alt="" />{" "}
                  Edit
                </Link>
              </div>
              <div
                id="tournament-details-view"
                className={`${styles["tournament-details-view"]}`}
              >
                <div className={`${styles["form-field-container"]}`}>
                  <div className={`${styles["form-field-name"]}`}>
                    Starting Date
                  </div>
                  <div className={`${styles["form-field-value"]}`}>
                    {Tournament.startingDate}
                  </div>
                </div>
                <hr />

                <div className={`${styles["form-field-container"]}`}>
                  <div className={`${styles["form-field-name"]}`}>
                    Description
                  </div>
                  <div className={`${styles["form-field-value"]}`}>
                    {Tournament.description}
                  </div>
                </div>
                <hr />

                <div className={`${styles["form-field-container"]}`}>
                  <div className={`${styles["form-field-name"]}`}>
                    Age Groups
                  </div>
                  <div className={`${styles["form-field-value"]}`}>
                    {ageGroups.join(" , ")}
                  </div>
                </div>
                <hr />

                <div className={`${styles["form-field-container"]}`}>
                  <div className={`${styles["form-field-name"]}`}>T shirt</div>
                  <div className={`${styles["form-field-value-tshirt"]}`}>
                    <div className={`${styles["t-shirt"]}`}>
                      <img
                        src={require("../../assests/images/" +
                          Tournament.tshirtFront)}
                        alt=""
                        srcset=""
                      />
                    </div>
                    <div className={`${styles["t-shirt"]}`}>
                      <img
                        src={require("../../assests/images/" +
                          Tournament.tshirtBack)}
                        alt=""
                        srcset=""
                      />
                    </div>
                  </div>
                </div>
                <hr />

                <div
                  className={`${styles["form-field-container"]}`}
                  style={{ flexDirection: "column" }}
                >
                  <div className={`${styles["form-field-name"]}`}>Flyers</div>
                  <div
                    className={`${styles["form-field-value-tshirt"]}`}
                    style={{ paddingTop: "20px" }}
                  >
                    {Tournament.flyers.map((flyer, index) => (
                      <div className={`${styles["flyer"]}`}>
                        <img
                          src={require("../../assests/images/" + flyer)}
                          alt=""
                          srcset=""
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <hr />
              </div>
            </div>
          )}
    </div>
  );
};

export default AdminTournamentPage;
