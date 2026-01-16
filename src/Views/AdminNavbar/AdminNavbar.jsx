import React, { useEffect } from "react";
import styles from "./profileNavbar.module.css";

const ProfileNavbar = (props) => {
  const loadSideBar = () => {
    let display = document.querySelector("#navSideBar").style.display;
    display === "block"
      ? (document.querySelector("#navSideBar").style.display = "none")
      : (document.querySelector("#navSideBar").style.display = "block");
  };

  const navLinksSectionOne = [
    {
      title: "Home",
      image: "home.png",
      id: "home",
      link: "",
    },
    {
      title: "Yearly Configurations",
      image: "yearly_configurations.png",
      id: "yearly_configurations",
      link: "yearly-configurations",
    },
    {
      title: "User Accounts",
      image: "user_accounts.png",
      id: "user_accounts",
      link: "user-accounts",
    },
    {
      title: "Payments",
      image: "payments.png",
      id: "payments",
      link: "payments",
    },
    {
      title: "Tournament",
      image: "tournament.png",
      id: "tournament",
      link: "tournament",
    },
    {
      title: "Messages",
      image: "msg.png",
      id: "messages",
      link: "messages",
    }
  ];

  const navLinksSectionTwo = [
    {
      title: "Players",
      image: "players.png",
      id: "players",
      link: "players",
    },
    {
      title: "Universities",
      image: "university.png",
      id: "universities",
      link: "universities",
    },
    {
      title: "Companies",
      image: "company.png",
      id: "companies",
      link: "companies",
    },
    {
      title: "Draws",
      image: "draws.png",
      id: "draws",
      link: "draws",
    },
    {
      title: "Results",
      image: "results.png",
      id: "results",
      link: "results",
    },
    {
      title: "Gallery",
      image: "gallery.png",
      id: "gallery",
      link: "gallery",
    },
  ];

  useEffect(() => {
    let id = "#" + props.page;
    document.querySelector(id).style.background = "white";
  }, []);

  return (
    <div className={`${styles["navbar-container"]}`}>
      <ul className={`${styles["navbar-ul"]}`}>
        <div className={`${styles["navbar-sections"]}`}>
          {navLinksSectionOne.map((navLink, index) => (
            <li className={`${styles["navbar-item"]}`} key={index}>
              <a
                href={`/admin/${navLink.link}`}
                className={`${styles["navbar-item-link"]}`}
                id={navLink.id}
              >
                <img
                  src={require(`../../assests/images/${navLink.image}`)}
                  alt=""
                />{" "}
                {navLink.title}
              </a>
            </li>
          ))}
        </div>
        <div className={`${styles["navbar-sections"]}`}>
          {navLinksSectionTwo.map((navLink, index) => (
            <li className={`${styles["navbar-item"]}`} key={index}>
              <a
                href={`/admin/${navLink.link}`}
                className={`${styles["navbar-item-link"]}`}
                id={navLink.id}
              >
                <img
                  src={require(`../../assests/images/${navLink.image}`)}
                  alt=""
                />{" "}
                {navLink.title}
              </a>
            </li>
          ))}
        </div>
      </ul>

      {/* minimized side nav bar */}
      <i
        id="toggle-btn"
        className={`${styles["toggle-button"]} bx bx-menu`}
        onClick={loadSideBar}
      ></i>
      <div id="navSideBar" className={`${styles["navSideBar"]}`}>
        <ul>
          {navLinksSectionOne.concat(navLinksSectionTwo).map((navLink, index) => (
            <li className={`${styles["navBarItem"]}`} key={index}>
              <a
                href={`/admin/${navLink.link}`}
                className={`${styles["navbar-item-link"]}`}
                id={navLink.id}
              >
                <img
                  src={require(`../../assests/images/${navLink.image}`)}
                  alt=""
                />{" "}
                {navLink.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileNavbar;
