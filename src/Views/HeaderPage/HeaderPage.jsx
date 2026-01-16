import React, { useState } from "react";
import styles from "./headerPage.module.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { indigo } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const HeaderPage = () => {
  const navigate = useNavigate();

  const [anchor, setAnchor] = useState(null);
  const [anchorMobile, setAnchorMobile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElmobile, setAnchorElmobile] = useState(null);

  const openRegister = Boolean(anchor);
  const openRegisterMobile = Boolean(anchorMobile);
  const openEntry = Boolean(anchorEl);
  const openEntryMobile = Boolean(anchorElmobile);

  const color = indigo[900];

  const loadSideBar = () => {
    const sidebar = document.querySelector("#navSideBar");
    sidebar.style.display =
      sidebar.style.display === "block" ? "none" : "block";
  };

  return (
    <div className={styles["nav-container"]}>
      {/* ================= DESKTOP NAV ================= */}
      <div className={styles["nav-bars"]}>
        <div className={styles["navBarList"]}>
          <img
            src={require("../../assests/images/umisf_logo.png")}
            alt="logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />

          <ul>
            <li className={styles.navBarItem} onClick={() => navigate("/")}>Home</li>
            <li className={styles.navBarItem} onClick={() => navigate("/about")}>About</li>

            {/* REGISTER DROPDOWN */}
            <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
              <li className={styles.register}>Register</li>
            </IconButton>

            <Menu anchorEl={anchor} open={openRegister} onClose={() => setAnchor(null)}>
              <MenuItem>
                <a href="https://forms.gle/dyu5Q2Xu2qoN7Sp2A" target="_blank" rel="noreferrer">
                  Age Group
                </a>
              </MenuItem>
              <MenuItem>
                <a href="https://forms.gle/A92WTArTDLRDCfMx6" target="_blank" rel="noreferrer">
                  Club Team
                </a>
              </MenuItem>
              <MenuItem>
                <a href="https://forms.gle/hLPTC36tyyfbYbV38" target="_blank" rel="noreferrer">
                  Novices
                </a>
              </MenuItem>
              <MenuItem>
                <a href="https://forms.gle/DvWKu3qBR3KinxTY9" target="_blank" rel="noreferrer">
                  University Individual
                </a>
              </MenuItem>
              <MenuItem>
                <a href="https://forms.gle/J4rGkstWSdTWcvx89" target="_blank" rel="noreferrer">
                  University Staff
                </a>
              </MenuItem>

              {/* ✅ FIXED INTERNAL ROUTE */}
              <MenuItem
                onClick={() => {
                  setAnchor(null);
                  navigate("/register/university");
                }}
              >
                University Team
              </MenuItem>
            </Menu>

            {/* ENTRY FORMS */}
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <li className={styles.register}>Entry Forms</li>
            </IconButton>

            <Menu anchorEl={anchorEl} open={openEntry} onClose={() => setAnchorEl(null)}>
              <MenuItem>Age Group</MenuItem>
              <MenuItem>Club Team</MenuItem>
              <MenuItem>Novices</MenuItem>
              <MenuItem>University Individual</MenuItem>
              <MenuItem>University Staff</MenuItem>
              <MenuItem>University Team</MenuItem>
            </Menu>

            <li className={styles.navBarItem} onClick={() => navigate("/draws")}>
              Draws and Entries
            </li>
            <li className={styles.navBarItem} onClick={() => navigate("/Timeline")}>
              Events
            </li>
            <li className={styles.navBarItem} onClick={() => navigate("/contact-us")}>
              Contact Us
            </li>
          </ul>
        </div>
      </div>

      {/* ================= MOBILE NAV ================= */}
      <div className={styles["mini-nav"]} onClick={loadSideBar}>
        ☰ Menu
      </div>

      <div id="navSideBar" className={styles.navSideBar}>
        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/about")}>About</li>

          <IconButton onClick={(e) => setAnchorMobile(e.currentTarget)}>
            <li>Register</li>
          </IconButton>

          <Menu anchorEl={anchorMobile} open={openRegisterMobile} onClose={() => setAnchorMobile(null)}>
            <MenuItem>
              <a href="https://forms.gle/dyu5Q2Xu2qoN7Sp2A" target="_blank" rel="noreferrer">
                Age Group
              </a>
            </MenuItem>

            {/* ✅ MOBILE FIX */}
            <MenuItem
              onClick={() => {
                setAnchorMobile(null);
                navigate("/register/university");
              }}
            >
              University Team
            </MenuItem>
          </Menu>

          <li onClick={() => navigate("/draws")}>Draws and Entries</li>
          <li onClick={() => navigate("/Timeline")}>Events</li>
          <li onClick={() => navigate("/contact-us")}>Contact Us</li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderPage;
