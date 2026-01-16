import { React, useRef, useState } from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import styles from "./adminYearlyConfigurations.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { BsUpload } from "react-icons/bs";
import { BsCloudUpload } from "react-icons/bs";
import { FaFileImage } from "react-icons/fa";
const AdminYearlyConfigurations = ({ onChange }) => {
  const teamPhoto = [];
  const teamCaptains = [];
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    // Upload the selected file to the server
    console.log(`Uploading file: ${selectedFile.name}`);
  };

  const [file, setFile] = useState(null);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(event.target.id);
    if (event.target.id == "input-file") {
      console.log(event.target.id);
      setFile(selectedFile);
    } else if (event.target.id == "input-file-1") {
      console.log(event.target.id);
      setFile1(selectedFile);
    } else if (event.target.id == "input-file-2") {
      console.log(event.target.id);
      setFile2(selectedFile);
    } else if (event.target.id == "input-file-3") {
      console.log(event.target.id);
      setFile3(selectedFile);
    } else if (event.target.id == "input-file-4") {
      console.log(event.target.id);
      setFile4(selectedFile);
    }
  };
  return (
    <div className={`${styles["Admin-yearly-configurations-container"]}`}>
      <ProfileHeader user_type={"admin"} />
      <AdminNavbar page="yearly_configurations" />

      <div className={`${styles["main-title"]}`}>
        <h5>Yearly Configurations</h5>
      </div>

      {/* team photo section */}
      <div className={`${styles["team-photo-container"]}`}>
        <h5>Team photo</h5>
        <img src={require("../../assests/images/2017.jpeg")} alt="yesss" />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="form-control d-none"
          id="input-file"
        />
        <label
          htmlFor="input-file"
          className={`${styles["team-photo-upload-btn"]}`}
        >
          <BsCloudUpload
            size="96"
            className={`${styles["team-photo-upload-btn-symbol"]}`}
          />
        </label>
        <label
          htmlFor="input-file"
          className={`${styles["team-photo-upload-btn-text"]}`}
        >
          <p>Upload image</p>
        </label>
        {file && (
          <span className="input-group-text">
            <FaFileImage /> {file.name}
          </span>
        )}
      </div>

      {/* team captains section */}
      <div className={`${styles["team-captains-container"]}`}>
        <h5>Team Captains</h5>
        <div className={`${styles["team-captains-photos-container"]}`}>
          <div className={`${styles["captain"]}`}>
            <div className="captain-photo-container">
              
              <img
                src={require("../../assests/images/2017.jpeg")}
                alt="yesss"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="form-control d-none"
                id="input-file-1"
              />
              <label htmlFor="input-file-1" className={`${styles[""]}`}>
                <BsCloudUpload
                  size="40"
                  className={`${styles["captain-upload-btn"]}`}
                />
              </label>
              {file1 && (
                <span className="input-group-text-1">
                  <FaFileImage /> {file1.name}
                </span>
              )}
            </div>
            <div className={`${styles["name-conatainer"]}`}>
              <p>Mens captain</p>
              <p>Harshai Bandara</p>
            </div>
            
          </div>
          <div className={`${styles["captain"]}`}>
            <div className="captain-photo-container">
              <img
                src={require("../../assests/images/2017.jpeg")}
                alt="yesss"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="form-control d-none"
                id="input-file-2"
              />
              <label htmlFor="input-file-2" className={`${styles[""]}`}>
                <BsCloudUpload
                  size="40"
                  className={`${styles["captain-upload-btn"]}`}
                />
              </label>
              {file2 && (
                <span className="input-group-text-2">
                  <FaFileImage /> {file2.name}
                </span>
              )}
            </div>

            <div className={`${styles["name-conatainer"]}`}>
              <p>Mens captain</p>
              <p>Harshai Bandara</p>
            </div>
          </div>
          <div className={`${styles["captain"]}`}>
            <div className="captain-photo-container">
              <img
                src={require("../../assests/images/2017.jpeg")}
                alt="yesss"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="form-control d-none"
                id="input-file-3"
              />
              <label htmlFor="input-file-3" className={`${styles[""]}`}>
                <BsCloudUpload
                  size="40"
                  className={`${styles["captain-upload-btn"]}`}
                />
              </label>
              {file3 && (
                <span className="input-group-text-3">
                  <FaFileImage /> {file3.name}
                </span>
              )}
            </div>

            <div className={`${styles["name-conatainer"]}`}>
              <p>Mens captain</p>
              <p>Harshai Bandara</p>
            </div>
          </div>
          <div className={`${styles["captain"]}`}>
            <div className="captain-photo-container">
              <img
                src={require("../../assests/images/2017.jpeg")}
                alt="yesss"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="form-control d-none"
                id="input-file-4"
              />
              <label htmlFor="input-file-4" className={`${styles[""]}`}>
                <BsCloudUpload
                  size="40"
                  className={`${styles["captain-upload-btn"]}`}
                />
              </label>
              {file4 && (
                <span className="input-group-text-4">
                  <FaFileImage /> {file4.name}
                </span>
              )}
            </div>

            <div className={`${styles["name-conatainer"]}`}>
              <p>Mens captain</p>
              <p>Harshai Bandara</p>
            </div>
          </div>
        </div>
      </div>

      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      {/* modal for upload photos */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>upload photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, you're reading this text in a modal!
          <input type="img" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> 
    </div>
  );
};

export default AdminYearlyConfigurations;
