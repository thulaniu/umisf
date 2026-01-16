import React, { useEffect, useState } from "react";
import styles from "./gallery.module.css";

function Gallery(props) {
  const [gallery,setGallery] = useState(props.gallery);
  return (
    <div className={`${styles["gallery-container"]}`}>
      <div className={`${styles["gallery-title"]}`}>
        OUR <p style={{ display: "inline-block", color: "#0984E3" }}>GALLERY</p>
      </div>
      <div className={`${styles["gallery-box"]}`}>
        <div className={`${styles["gallery-box-row"]}`}>
          {gallery.slice(0, 3).map((image, index) => (
            <figure className='bg-image hover-zoom'>
              <img src={require(`../../../assests/images/gallery/${image}`)} key={index} />
            </figure>
          ))}
        </div>

        <div className={`${styles["gallery-box-row"]}`}>
          {gallery.slice(3, 6).map((image, index) => (
            <figure className='bg-image hover-zoom'>
              <img src={require(`../../../assests/images/gallery/${image}`)} />
            </figure>
          ))}
        </div>

        <div className={`${styles["gallery-box-row"]}`}>
          {gallery.slice(6, 9).map((image, index) => (
            <figure className='bg-image hover-zoom'>
              <img src={require(`../../../assests/images/gallery/${image}`)} />
            </figure>
          ))}
        </div>
      </div>
      <div className={`${styles["gallery-view-more"]}`}>
        <a href="#" type="button" target='_blank'>
          View More
        </a>
      </div>
    </div>
  );
}

export default Gallery;
