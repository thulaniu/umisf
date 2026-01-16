import React, { useEffect, useState } from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import styles from "./adminUserAccountsPage.module.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import {message} from 'antd';

const AdminUserAccountsPage = () => {
  const [users, setUsers] = useState([
    { type: "admins", names: [] },
    { type: "organizers", names: [] },
    { type: "umpires", names: [] },
    { type: "table_organizers", names: [] },
  ]);

  const loadUserNames = (userType) => {
    if (document.querySelector("#" + userType).style.display === "none") {
      document.querySelector("#" + userType).style.display = "block";
      document.querySelector("#arrow" + userType).style.transform =
        "rotate(90deg)";
    } else {
      document.querySelector("#" + userType).style.display = "none";
      document.querySelector("#arrow" + userType).style.transform =
        "rotate(-360deg)";
    }
  };

  useEffect(() => {
    users?.map(
      (user) => (document.querySelector("#" + user.type).style.display = "none")
    );

    Axios.get(
      process.env.REACT_APP_API_URL + "/user/getAll",
      {
        headers: {},
      }
    ).then((res)=>{
      console.log(res)
      setUsers(res.data.data)
    })
    .catch ((error) =>{
      console.log("Error loading users", error);
      message.error(error.response.data.message);
    })

  }, []);

  return (
    <div className={`${styles["accounts-container"]}`}>

      <ProfileHeader user_type={"admin"} />
      <AdminNavbar page="user_accounts" />
      
      <div className={`${styles["main-title"]}`}>
        <a href="/admin/user-accounts">User Accounts</a>
      </div>
      <div className={`${styles["tool-bar"]}`}>
        <a href="/admin/user-accounts/add-new-user">
          <img src={require("../../assests/images/add.png")} alt="" /> Add
          Account
        </a>
      </div>
      <div className={`${styles["users-container"]}`}>
        {users?.map((userType, index) => (
          <div className={`${styles["user"]}`}>
            <button
              className={`${styles["user-type-container"]}`}
              onClick={() => loadUserNames(userType.type)}
            >
              <img
                src={require("../../assests/images/forward_arrow.png")}
                alt=""
                style={{ width: "15px" }}
                className={`${styles["user-type-arrow"]}`}
                id={"arrow" + userType.type}
              />
              <img
                src={require("../../assests/images/" + userType.type + ".png")}
                alt=""
                className={`${styles["user-type-img"]}`}
              />
              {userType.type.split("_").join(" ")}
            </button>
            <div
              id={userType.type}
              className={`${styles["users-name-container"]}`}
            >
              {userType.names?.map((user, index) => (
                <Link to={"../user-accounts/"+user.email} className={`${styles["users-name"]}`} state={{ userDetails: user }}
                key={index}>
                  {user.name}
                  <img
                    src={require("../../assests/images/double_arrows.png")}
                    alt=""
                  />
                </Link>
                                    
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUserAccountsPage;
