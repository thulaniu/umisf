import React from "react";
import Styles from "./PhotoItem.module.css";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";

const PhotoItem = (props) => {
  const [modal, setModal] = useState(false);
  const [tempImgSrc, setTempImgSrc] = useState("");

  function getImage(image) {
    // setTempImgSrc('./Images/TempImg/' + image);
    setModal(true);
  }

  function download() {
    console.log("downloading");
  }

  return (
    <div>
      {modal && (
        <div className={`${Styles["modal-open"]} ${Styles["modal"]}`}>
          <img
            src={require(`../../assests/images/gallery/${props.image}`)}
            alt=""
          />
          <CloseIcon
            onClick={() => {
              setModal(false);
            }}
            className={Styles["close"]}
          />
          <DownloadIcon className={Styles["download"]} onClick={download} />
        </div>
      )}

      <div className={`${Styles["pics"]}`}>
        <DownloadIcon className={Styles["download-pic"]} onClick={download} />
        <img
          src={require(`../../assests/images/gallery/${props.image}`)}
          alt={props.image}
          style={{ width: "100%" }}
          onClick={() => {
            getImage(props.image);
          }}
        />
      </div>
    </div>
  );
};

export default PhotoItem;
