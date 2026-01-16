import React, { Component, useState } from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import styles from "./adminGalleryPage.module.css";
import { Modal } from "react-bootstrap";

const AdminGalleryPage = () => {
  const [years, setYears] = useState([
    2000, 2002, 2004, 2008, 2010, 2012, 2014, 2016, 2020, 2022, 2024,
  ]);

  const [show, setShow] = useState(false);
  const [folderToBeDeleted, setFolderToBeDeleted] = useState("");

  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
  };
  const handleShow = (folder) => {
    setShow(true);
    setFolderToBeDeleted(folder)
  };

  const deleteFolder = (e) => {
    e.preventDefault();
    console.log(folderToBeDeleted);
    setShow(false)
  };

  return (
    <div className={`${styles["gallery-container"]}`}>

      <ProfileHeader user_type={"admin"} />
      <AdminNavbar page='gallery'/>
      
      <div className={`${styles["main-title"]}`}>
        <a href="/admin/gallery">Gallery</a>
      </div>
      <div className={`${styles["tool-bar"]}`}>
        <button>
          <img src={require("../../assests/images/add.png")} alt="" /> Create
          folder
        </button>
      </div>
      <div className={`${styles["folder-container"]}`}>
        {years.map((year,index) => (
          <div>
            <div className={`${styles["folder"]}`}>
              <a href={`gallery/year/${year}`}>
                <img src={require("../../assests/images/folder.png")} alt="" />{" "}
                {year}
              </a>
              <button
                className={`${styles["folder-delete"]}`}
                onClick={()=>handleShow(index)}
              >
                <img src={require("../../assests/images/delete.png")} alt="" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* modal for adding img */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header style={{ backgroundColor: "#f5f6fa" }}>
          <Modal.Title style={{fontFamily:'Hind',fontSize:'18px'}}>Delete Folder</Modal.Title>
        </Modal.Header>
        <form style={{ backgroundColor: "#f5f6fa" }}>
          <Modal.Body>
            <div className="row">
              <div className="col-11">
                <h5 style={{fontFamily:'Hind',fontSize:'18px'}}>Are you sure you want to delete this folder? </h5>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button onClick={handleClose} className="btn btn-secondary" style={{fontFamily:'Hind',fontSize:'18px'}}>
              Close
            </button>
            <button
              type="submit"
              className="btn btn-light"
              onClick={deleteFolder}
              style={{fontFamily:'Hind',fontSize:'18px',background:'red',color:'white'}}
            >
              Delete
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default AdminGalleryPage;
