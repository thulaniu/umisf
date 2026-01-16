import React from "react";
import Styles from "./PhotoItem.module.css";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import { saveAs } from 'file-saver'

const PhotoItem = (props) => {
  const [modal, setModal] = useState(false);

  function getImage(image) {
    // setTempImgSrc('./Images/TempImg/' + image);
    setModal(true);
    
  }

  function download(url,id){
   
      saveAs(url, "umisf-img"+id + ".jpg");

  }

  return (
    <div>
      {modal && (
        <div
          className={
            `${Styles["modal-open"]} ${Styles["modal"]}` 
          }
        >
          <img src={props.image} alt="" />
          <CloseIcon onClick={()=>{setModal(false)}}  className={Styles['close']}/>
          <DownloadIcon className={Styles['download']} onClick={()=>download(props.image,props.id)}/>
        </div>
      )}

      <div className={`${Styles["pics"]}`}>
      <DownloadIcon className={Styles['download-pic']} onClick={()=>download(props.image,props.id)}/>
        <img
          src={props.image}
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
