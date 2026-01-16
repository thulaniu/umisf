import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Form } from "reactstrap";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import styles from "./adminEditTournamentPage.module.css";
import ImageUploader from "../RegistrationPage/Common/imageUploader/ImageUploader";

const AdminEditTournamentPage = (props) => {
  const location = useLocation();
  const [ageGroups, setAgeGroups] = useState([
    "Under 9",
    "Under 11",
    "Under 13",
    "Under 15",
    "Under 17",
    "Under 19",
    "Under 21",
    "University",
    "Company",
  ]);

  const [Tournament, setTournament] = useState(location.state["tournament"]);

  const [selectedAgeGroups, setSelectedAgeGroups] = useState(
    location.state["selectedAgeGroups"]
  );

  const [fileListFront, setFileListFront] = useState([]);
  const [fileListBack, setFileListBack] = useState([]);

  const createTournament = (e) => {
    e.preventDefault();
    console.log(Tournament);
    console.log(selectedAgeGroups);
    console.log(fileListFront);
    console.log(fileListBack);
    console.log("created");
  };

  const removeFile = (fileName) => {
    switch (fileName) {
      case "tshirtFront":
        setTournament({ ...Tournament, tshirtFront: "" });
        break;

      case "tshirtBack":
        setTournament({ ...Tournament, tshirtBack: "" });
        break;
    }
  };

  const removeListItem = (listName, itemName) => {
    let newItems = [];
    let existingItems = listName;
    for (let item in existingItems) {
      if (itemName != existingItems[item]) {
        newItems.push(existingItems[item]);
      }
    }

    return newItems;
  };

  const removeFlyer = (e, flyerName) => {
    e.preventDefault();
    setTournament({
      ...Tournament,
      flyers: removeListItem(Tournament.flyers, flyerName),
    });
  };

  const handleChecks = (e) => {
    if (e.target.checked) {
      setSelectedAgeGroups(selectedAgeGroups.concat([e.target.value]));
    } else {
      setSelectedAgeGroups(removeListItem(selectedAgeGroups, e.target.value));
    }
  };

  return (
    <div className={`${styles["tournament-container"]}`}>

      <ProfileHeader user_type={"admin"} />
      <AdminNavbar page="tournament" />
      
      <div className={`${styles["main-title"]}`}>
        <a href="/admin/tournament">Tournament</a>
      </div>
      <div className={`${styles["main-title"]}`}>Edit Tournament</div>
      <div className={`${styles["form-container"]}`}>
        <Form onSubmit={createTournament}>
          <div className={`${styles["form-field-container"]}`}>
            <div className={`${styles["form-field-name"]}`}>Starting Date</div>
            <div className={`${styles["form-field-value"]}`}>
              <input
                type="date"
                className={`${styles["form-input"]}`}
                value={Tournament.startingDate}
                placeholder="Enter starting date.."
                onChange={(e) =>
                  setTournament({
                    ...Tournament,
                    startingDate: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <hr />

          <div className={`${styles["form-field-container"]}`}>
            <div className={`${styles["form-field-name"]}`}>Description</div>
            <div className={`${styles["form-field-value"]}`}>
              <textarea
                rows={4}
                cols={50}
                className={`${styles["form-input"]}`}
                value={Tournament.description}
                placeholder="Enter your description here.."
                onChange={(e) =>
                  setTournament({
                    ...Tournament,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <hr />

          <div className={`${styles["form-field-container"]}`}>
            <div className={`${styles["form-field-name"]}`}>Age groups</div>
            <div className={`${styles["form-field-value"]}`}>
              {ageGroups.map((group, index) => (
                <div className={`${styles["form-checkboxes"]}`}>
                  <input
                    type="checkbox"
                    id="ageGroup"
                    name="ageGroup"
                    value={group}
                    checked={selectedAgeGroups.includes(group) ? true : false}
                    onChange={(e) => handleChecks(e)}
                    key={index}
                  />
                  <label
                    className={`${styles["form-checkbox"]}`}
                    htmlFor="ageGroup"
                    key={"label" + index}
                  >
                    {" "}
                    {group}
                  </label>
                </div>
              ))}

              <br />
            </div>
          </div>
          <hr />

          <div className={`${styles["form-field-container"]}`}>
            <div className={`${styles["form-field-name"]}`}>T shirt</div>
            <div>
              <div className={`${styles["selected-files"]}`}>
                {Tournament.tshirtFront && (
                  <button
                    className={`${styles["selected-file"]}`}
                    onClick={() => removeFile("tshirtFront")}
                  >
                    {Tournament.tshirtFront}
                    <img
                      src={require("../../assests/images/delete.png")}
                      alt=""
                      srcSet=""
                    />
                  </button>
                )}
                {Tournament.tshirtBack && (
                  <button
                    className={`${styles["selected-file"]}`}
                    onClick={() => removeFile("tshirtBack")}
                  >
                    {Tournament.tshirtBack}
                    <img
                      src={require("../../assests/images/delete.png")}
                      alt=""
                      srcSet=""
                    />
                  </button>
                )}
              </div>
              <div className={`${styles["form-field-value-tshirt"]}`}>
                <div className={`${styles["t-shirt"]}`}>
                  <div className={`${styles["t-shirt-label"]}`}>Front</div>
                  <ImageUploader
                    fileList={fileListFront}
                    setFileList={setFileListFront}
                  />
                </div>
                <div className={`${styles["t-shirt"]}`}>
                  <div className={`${styles["t-shirt-label"]}`}>Back</div>
                  <ImageUploader
                    fileList={fileListBack}
                    setFileList={setFileListBack}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />

          <div className={`${styles["form-field-container"]}`}>
            <div className={`${styles["form-field-name"]}`}>Flyers</div>
            <div className={`${styles["form-field-value"]}`}>
              <div className={`${styles["selected-files"]}`}>
                {Tournament.flyers.map((flyer, index) => (
                  <button
                    className={`${styles["selected-file"]}`}
                    onClick={(e) => removeFlyer(e, flyer)}
                    key={index}
                  >
                    {flyer}
                    <img
                      src={require("../../assests/images/delete.png")}
                      alt=""
                      srcSet=""
                    />
                  </button>
                ))}
              </div>
              <input
                multiple
                type="file"
                className={`${styles["form-input"]}`}
                placeholder="Enter your description here.."
                onChange={(e) =>
                  setTournament({
                    ...Tournament,
                    flyers: Tournament.flyers.concat([e.target.files[0].name]),
                  })
                }
              />
            </div>
          </div>
          <hr />
          <button className={`${styles["form-submit-button"]}`}>Save</button>
        </Form>
      </div>
    </div>
  );
};

export default AdminEditTournamentPage;
