import { React } from "react";
import styles from "./adminDrawPage.module.css";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { useState } from "react";
import { Modal } from "react-bootstrap";
const AdminDrawPage = () => {
  const [drawCatogory, setdrawCatogory] = useState({
    "under-19-men": [
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
    ],
    "under-19-women": [
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
    ],
    "under-17-men": [
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
    ],
    "under-17-women": [
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
    ],
    "under-15-men": [
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
    ],
    "under-13-women": [
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
      "draw-1",
    ],
  });

  const handleShow = (index,key) => {
    setShowDeleteModal(true);
    console.log(index,key);
    setFolderToBeDeleted(index);
  };
  const handleShowDraws = (index,key) => {
    setShowDrawModal(true);
    console.log(index,key);
    
  };
  const editDraw=(e)=>{
    e.preventDefault();
    console.log(e.value);
    setShowDrawModal(false);
  }
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDrawModal,  setShowDrawModal]=useState(false);

  const [folderToBeDeleted, setFolderToBeDeleted] = useState("");
  const showDraws = (index, year) => {
    // e.preventDefault();
    console.log(year, index);
    console.log();
  };
  const handleClose = (e) => {
    e.preventDefault();
    setShowDeleteModal(false);
  };
  const handleEditClose = (e) => {
    e.preventDefault();
    setShowDrawModal(false);
  };

  const deleteFolder = (e) => {
    e.preventDefault();
    console.log(folderToBeDeleted);
    setShowDeleteModal(false);
  };
  return (
    <div className={`${styles["draw-container"]}`}>
     <ProfileHeader user_type={"admin"} />
      <AdminNavbar page="draws" />
      <div className={`${styles["main-title"]}`}>
        <a href="/admin/draws">Draws</a>
      </div>

      <div className={`${styles["draws-container"]}`}>
        {Object.entries(drawCatogory).map(([key, value]) => (
          <div>
            <div className={`${styles["folder"]}`}>
              {/* <a href={`gallery/year/${key}`}> */}
                <img src={require("../../assests/images/draws.png")} alt="" />{" "}
                {key}
              {/* </a> */}
            </div>

            <div className={`${styles["draws-grid-container"]}`}>
              {value.map((draw, index) => (
                <div className={`${styles["draw-each"]}`}>
                  <button
                    className={`${styles["draw-btn"]}`}
                    onClick={() => handleShowDraws(index,key)}
                  >
                    {draw}
                  </button>
                  <button
                    className={`${styles["draw-btn"]}`}
                    onClick={() => handleShow(index,key)}
                  >
                    <img
                      src={require("../../assests/images/delete.png")}
                      alt=""
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* modal for delete draw */}
      <Modal show={showDeleteModal} onHide={handleClose} centered>
        <Modal.Header style={{ backgroundColor: "#f5f6fa" }}>
          <Modal.Title style={{ fontFamily: "Hind", fontSize: "18px" }}>
            Delete Draw
          </Modal.Title>
        </Modal.Header>
        <form style={{ backgroundColor: "#f5f6fa" }}>
          <Modal.Body>
            <div className="row">
              <div className="col-11">
                <h5 style={{ fontFamily: "Hind", fontSize: "18px" }}>
                  Are you sure you want to delete this Draw?{" "}
                </h5>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button
              onClick={handleClose}
              className="btn btn-secondary"
              style={{ fontFamily: "Hind", fontSize: "18px" }}
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-light"
              onClick={deleteFolder}
              style={{
                fontFamily: "Hind",
                fontSize: "18px",
                background: "red",
                color: "white",
              }}
            >
              Delete
            </button>
          </Modal.Footer>
        </form>
      </Modal>


      {/* modal for view draw */}
      <Modal show={showDrawModal} onHide={handleClose} centered>
        <Modal.Header style={{ backgroundColor: "#f5f6fa" }}>
          <Modal.Title style={{ fontFamily: "Hind", fontSize: "18px" }}>
            Draw Number 1
          </Modal.Title>
        </Modal.Header>
        <form style={{ backgroundColor: "#f5f6fa" }}>
          <Modal.Body>
            <div className="row">
              <div className="col-11">
                <h5 style={{ fontFamily: "Hind", fontSize: "18px" }}>
                  Edit Draw {" "}
                </h5>
                <form action="" className="form-container">
                  <label htmlFor="player-1">player1</label>
                  <input type="text" name="player-1" id="player-1" />
                  <br />
                  <br />
                  <label htmlFor="player-2">player2</label>
                  <input type="text" name="player-2" id="player-2" />
                </form>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button
              onClick={handleEditClose}
              className="btn btn-secondary"
              style={{ fontFamily: "Hind", fontSize: "18px" }}
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => editDraw()} //sould add the edit function whhen on clicking
              style={{
                fontFamily: "Hind",
                fontSize: "18px",
                background: "blue",
                color: "white",
              }}
            >
              Edit
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default AdminDrawPage;
