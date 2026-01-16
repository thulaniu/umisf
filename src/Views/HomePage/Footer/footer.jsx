import React from "react";
import styles from "./footer.module.css";

function Footer() {
  //year
  return (
    <div>
      <div className={`${styles["footer-container"]}`}>
        <div className={`${styles["footer-left"]}`}>
          <img src={require("../../../assests/images/umisf_logo.png")} />
          <div className={`${styles["quick-tabs"]}`}>
            <a href="/">Home</a>|<a href="/about">About</a>|
            <a href="/draws">Draws</a><br />
            <a href="/photos">Gallery</a>|
            <a href="/contact-us">Contact Us</a>
          </div>
        </div>
        <hr />
        <div className={`${styles["footer-middle"]}`}>
          <div className={`${styles["center-row"]}`}>
            <i class="bx bx-current-location" style={{ color: "#ffffff" }}></i>
            <p>University of Moratuwa, Bandaranayake Mawatha, Moratuwa 10400</p>
          </div>
          <div className={`${styles["center-row"]}`}>
            <i class="bx bx-phone" style={{ color: "#ffffff" }}></i>
            <p> 0112 640 051</p>
          </div>
          <div className={`${styles["center-row"]}`}>
          <i class='bx bx-link-external' style={{color:'#ffffff'}} ></i>
            <p>
              <a className={`${styles["uom-email"]}`} href="https://uom.lk" target='_blank'>
                uom.lk
              </a>
            </p>
          </div>
        </div>
        <hr />
        <div className={`${styles["footer-right"]}`}>
          <h6>About</h6>
          <p>
            UMiSF is the annual badminton tournament organized
            by the badminton team of the University of Moratuwa,
             in collaboration with the university's Division of Physical Education. 
          </p>
          <div className={`${styles["footer-icons"]}`}>
            <a href="https://twitter.com/MoratuwaUni" target='_blank'>
              <i className="bx bxl-twitter"></i>
            </a>
            <a href="https://www.facebook.com/UMiSFMora?mibextid=LQQJ4d" target='_blank'>
              <i className="bx bxl-facebook"></i>
            </a>
          </div>
        </div>
      </div>

      <div className={`${styles["bottom-row"]}`}>Copyright © 2022 developers@umisf.web</div>
    </div>
  );
}

export default Footer;
