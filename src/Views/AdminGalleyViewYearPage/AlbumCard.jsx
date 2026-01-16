import React from "react";
import Styles from "./AlbumCard.module.css";
import { Link } from "react-router-dom";
import {FcImageFile} from 'react-icons/fc'
const AlbumCard = (props) => {
  return (
    <div className={`${Styles["card"]} `}>
      <FcImageFile className = {`${Styles["icon"]}`}/>
      <Link
        to={`../photos/${props.title}`}
        state={{obj: {photos:props.photos, title: props.title} }}
        style={{ textDecoration: "none"}}
        className = {`${Styles["link"]}`}
      >
       UMiSF {" "}{props.title}
      </Link>
    </div>
  );
};

export default AlbumCard;
