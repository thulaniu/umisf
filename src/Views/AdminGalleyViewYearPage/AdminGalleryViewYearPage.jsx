import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import styles from "./adminGalleryViewYearPage.module.css";
import PhotoItem from "./PhotoItem";

const AdminGalleryViewYearPage = () => {
  let { year } = useParams();

  const [images, setImages] = useState([
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
  ]);


  const [files, setFiles] = useState([]);
  const inputFile = useRef(null);

  return (
    <div className={`${styles["gallery-container"]}`}>

      <ProfileHeader user_type={"admin"} />
      <AdminNavbar page="gallery" />
      
      <div className={`${styles["main-title"]}`}>
        <a href="/admin/gallery">Gallery</a>
        <img src={require("../../assests/images/forward_arrow.png")} alt="" /> {year}
      </div>
      <div className={`${styles["tool-bar"]}`}>
        <button onClick={() => inputFile.current.click()}>
          <img src={require("../../assests/images/add.png")} alt="" />
          Upload
        </button>
        <input
          multiple
          type="file"
          onChange={(e) => setFiles([...files, e.target.files])}
          ref={inputFile}
          style={{display:"none"}}
        />
      </div>
      <div className={`${styles["images-container"]}`}>
        <div className={`${styles["gallery"]}`}>
          {images?.map((img, index) => {
            return <PhotoItem key={index} image={img} id={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminGalleryViewYearPage;
