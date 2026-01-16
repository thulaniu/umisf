import React from "react";
import Styles from "./AlbumCard.module.css";
import { Link } from "react-router-dom";
import {FcImageFile} from 'react-icons/fc'
const AlbumCard = (props) => {
  return (
    <div className={`${Styles["card"]} `}>
      
      <Link
        to={`../photos/${props.title}`}
        state={{obj: {photos:props.photos, title: props.title} }}
        style={{ textDecoration: "none"}}
        className = {`${Styles["link"]}`}
      >
        <img src={require('../../assests/images/folder.png')} />
      {props.title}
      </Link>
    </div>
  );
};

export default AlbumCard;
