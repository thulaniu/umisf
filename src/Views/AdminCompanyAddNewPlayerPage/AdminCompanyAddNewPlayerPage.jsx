import React, { useEffect, useState } from "react";
import { Form, Input } from "reactstrap";
import { useParams } from "react-router-dom";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import styles from "./adminCompanyAddNewPlayer.module.css";
import ImageUploader from "../RegistrationPage/Common/imageUploader/ImageUploader";

const AdminCompanyAddNewPlayerPage = () => {
  let { year, company } = useParams();

  const [fileListPhoto, setFileListPhoto] = useState([]);

  const [newPlayer, setNewplayer] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    institute: company,
    gender: "",
    contactNumber: "",
    email: "",
    photo: "",
  });

  const createPlayer = (e) => {
    e.preventDefault();
    console.log(newPlayer);
    console.log(fileListPhoto);
  };

  return (
    <div className={`${styles["tournament-container"]}`}>
      <ProfileHeader user_type={"admin"} />
      <AdminNavbar page="universities" />
      <div className={`${styles["main-title"]}`}>
        <a href="/admin/companies">Companies</a>
        <img
          src={require("../../assests/images/forward_arrow.png")}
          alt=""
        />{" "}
        <a href={"/admin/companies/year/" + year}>{year}</a>
        <img
          src={require("../../assests/images/forward_arrow.png")}
          alt=""
        />{" "}
        {company}
      </div>
      <div className={`${styles["main-title"]}`}>Register a Player</div>
      <div className={`${styles["form-container"]}`}>
        <Form onSubmit={createPlayer}>
          <div className={`${styles["form-field-container"]}`}>
            <div className={`${styles["form-field-name"]}`}>First name</div>
            <div className={`${styles["form-field-value"]}`}>
              <input
                type="text"
                className={`${styles["form-input"]}`}
                value={newPlayer.firstName}
                placeholder="Enter your first name.."
                onChange={(e) =>
                  setNewplayer({ ...newPlayer, firstName: e.target.value })
                }
              />
            </div>
          </div>
          <hr />

          <div className={`${styles["form-field-container"]}`}>
            <div className={`${styles["form-field-name"]}`}>Last name</div>
            <div className={`${styles["form-field-value"]}`}>
              <input
                type="text"
                className={`${styles["form-input"]}`}
                value={newPlayer.lastName}
                placeholder="Enter your last name.."
                onChange={(e) =>
                  setNewplayer({ ...newPlayer, lastName: e.target.value })
                }
              />
            </div>
          </div>
          <hr />

          <div className={`${styles["form-field-container"]}`}>
            <div className={`${styles["form-field-name"]}`}>Gender</div>
            <div className={`${styles["form-field-value"]}`}>
              <select
                class="form-select form-select-sm"
                aria-label=".form-select-sm example"
                className={`${styles["form-input"]}`}
                name="gender"
                defaultValue={"default"}
                onChange={(e) =>
                  setNewplayer({ ...newPlayer, gender: e.target.value })
                }
              >
                <option value={"default"}>Select your gender..</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <hr />

          <div className={`${styles["form-field-container"]}`}>
            <div className={`${styles["form-field-name"]}`}>Date of Birth</div>
            <div className={`${styles["form-field-value"]}`}>
              <input
                type="date"
                className={`${styles["form-input"]}`}
                value={newPlayer.dob}
                placeholder="Enter your birthday.."
                onChange={(e) =>
                  setNewplayer({ ...newPlayer, dob: e.target.value })
                }
              />
            </div>
          </div>
          <hr />

          <div className={`${styles["form-field-container"]}`}>
            <div className={`${styles["form-field-name"]}`}>Contact number</div>
            <div className={`${styles["form-field-value"]}`}>
              <input
                type="text"
                className={`${styles["form-input"]}`}
                value={newPlayer.contactNumber}
                placeholder="Enter your contact number.."
                onChange={(e) =>
                  setNewplayer({ ...newPlayer, contactNumber: e.target.value })
                }
              />
            </div>
          </div>
          <hr />

          <div className={`${styles["form-field-container"]}`}>
            <div className={`${styles["form-field-name"]}`}>Email Address</div>
            <div className={`${styles["form-field-value"]}`}>
              <input
                type="email"
                className={`${styles["form-input"]}`}
                value={newPlayer.email}
                placeholder="Enter your email address.."
                onChange={(e) =>
                  setNewplayer({ ...newPlayer, email: e.target.value })
                }
              />
            </div>
          </div>
          <hr />

          <div className={`${styles["form-field-container"]}`}>
            <div className={`${styles["form-field-name"]}`}>Profile Image</div>
            <div className={`${styles["form-field-value"]}`}>
              <ImageUploader
                fileList={fileListPhoto}
                setFileList={setFileListPhoto}
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

export default AdminCompanyAddNewPlayerPage;
