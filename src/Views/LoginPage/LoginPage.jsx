import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { MDBContainer, MDBInput, MDBBtn, MDBCol } from "mdb-react-ui-kit";
import { message } from "antd";
import styles from "./loginPage.module.css";
import HeaderPage from "../HeaderPage/HeaderPage";
import Dropdown from "../../common/Dropdown/Dropdown";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const roles = ["admin", "tableOrganizer", "organizer", "umpire"];
  const roleOptions = ["Admin", "Table Organizer", "Organizer", "Umpire"];

  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (Object.values(loginCredentials).includes("")) {
      e.stopPropagation();
      message.error("Please fill all the fields.!");
    } else if (!form.checkValidity()) {
      e.stopPropagation();
      message.error("Email or Password is invalid!");
    }
    setValidated(true);
    let role = roles[roleOptions.indexOf(loginCredentials.role)];
    if (form.checkValidity() && !Object.values(loginCredentials).includes("")) {
      Axios.post(
        "http://localhost:3001/user/login",
        { email: loginCredentials.email, password: loginCredentials.password, role: role },
        {
          headers: {},
        }
      )
        .then((res) => {
          message.success(res.data.message);
          let user = res.data?.data;

          localStorage.setItem("user", user);
          localStorage.setItem("role", role);

          switch (role) {
            case "admin":
              window.location.href = "/admin";
              break;
            case "organizer":
              window.location.href = "/organizer";
              break;
            case "tableOrganizer":
              window.location.href = "/table";
              break;
            case "umpire":
              window.location.href = "/umpire";
              break;
            default:
              break;
          }
        })
        .catch((error) => {
          message.error(error.response.data.message);
        });
    }
  };

  return (
    <div className={`${styles["container"]}`}>
      <HeaderPage />
      <div className={`${styles["login-container"]}`}>
        <h1>Login</h1>
        <img src={require("../../assests/images/user.png")} />
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className={`${styles["register-form-content"]}`}
        >
          <div className="column mb-2 ">
            <MDBCol className="">
              <MDBInput
                wrapperClass="mb-2"
                label="Email"
                labelClass="text-white"
                labelStyle={{ color: "white", fontFamily: "Hind" }}
                className={`${styles["mdbinput"]}`}
                name="email"
                type="email"
                value={loginCredentials.email}
                onChange={(e) =>
                  setLoginCredentials({ ...loginCredentials, email: e.target.value })
                }
                required
                contrast
              />
            </MDBCol>
            <MDBCol className="">
              <MDBInput
                wrapperClass="mb-2"
                label="Password"
                labelStyle={{ color: "white", fontFamily: "Hind" }}
                className={`${styles["mdbinput"]}`}
                labelClass="text-white"
                name="password"
                type="password"
                value={loginCredentials.password}
                onChange={(e) =>
                  setLoginCredentials({ ...loginCredentials, password: e.target.value })
                }
                required
                contrast
              />
            </MDBCol>
            <MDBCol className="">
              <Dropdown
                options={roleOptions}
                handleClick={(option) => {
                  setLoginCredentials({ ...loginCredentials, role: option });
                }}
                value={loginCredentials.role}
                lable={"the role"}
              />
            </MDBCol>
          </div>
          <button className={`${styles["button"]}`} type="submit">
            {" "}
            Login
          </button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
