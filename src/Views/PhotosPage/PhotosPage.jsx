import { React, useState } from "react";
import { useLocation } from "react-router-dom";
import Styles from "./PhotosPage.module.css";
import HeaderPage from "../HeaderPage/HeaderPage";
import PhotoItem from "./PhotoItem";
import PreviewBox from "./PreviewBox";
import Footer from "../HomePage/Footer/footer";

const PhotosPage = (props) => {
  let location = useLocation();
  let { obj } = location.state;

  return (
    <div className={`${Styles["body"]}`}>
      <HeaderPage />
      <div className={`${Styles["title"]}`}>
        <h1 style={{ fontFamily: "Hind", color: "#0984E3", fontSize: "4vw" }}>
          UMiSF{" - "}
          {obj?.title}
        </h1>
        <p>
          {" "}
          Step back in time to experience the nostalgia and excitment of previous years' of UMISF and relive the highlights through this collection of retrospective photos.
        </p>
      </div>

      <div className={`${Styles["gallery"]}`}>
        {obj?.photos?.map((img, index) => {
          return <PhotoItem key={index} image={img} id={index} />;
        })}
      </div>

      <Footer />
    </div>
  );
};

export default PhotosPage;
