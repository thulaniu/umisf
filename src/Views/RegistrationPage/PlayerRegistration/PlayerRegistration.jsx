import React, { useState, useEffect, useMemo } from "react";
import Styles from "./PlayerRegistration.module.css";
import HeaderPage from "../../HeaderPage/HeaderPage";
import info from "../../../assests/images/info.gif";
import { Button, Space, notification } from "antd";
import { RadiusBottomrightOutlined } from "@ant-design/icons";
import { Form } from "react-bootstrap";
import { MDBContainer, MDBInput, MDBBtn, MDBCol } from "mdb-react-ui-kit";
import ImageUploader from "../Common/imageUploader/ImageUploader";
import Axios from "axios";
import { message } from "antd";
import Dropdown from "../../../common/Dropdown/Dropdown";
import SuccessMessage from "../Common/SuccessMessage/SuccessMessage";
import RegistrationsNotOpen from "../../../common/registrationsNotOpen/RegistrationsNotOpen";
import { useNavigate } from "react-router-dom";

const PlayerRegistration = () => {
  const navigate = useNavigate()
  const [isRegistrationsOpen, setIsRegistrationsOpen] = useState(true);

  const [validated, setValidated] = useState(false); //form validation
  const [player, setPlayer] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    institute: "",
    gender: "",
    contactNumber: "",
    email: "",
    photo: "samplePhoto.jpeg",
    performanceThreshold: 100,
    year:"2023"
  });
  const [fileList, setFileList] = useState([]);
  const [image,setImage] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [playerID, setPlayerID] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const genderOptions = ["Male", "Female"];
  const [gender, setGender] = useState("");
  const [imageName,setImageName] = useState();

  useEffect(() => {
    // openNotification('topRight')
    if (isSubmitting) {
      // show loading message
      message.loading("Submitting form...");
    }
  }, [isSubmitting, isChecked]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "firstName") {
      setPlayer((prevValue) => {
        return { ...prevValue, firstName: value };
      });
    } else if (name === "lastName") {
      setPlayer((prevValue) => {
        return { ...prevValue, lastName: value };
      });
    } else if (name === "institute") {
      setPlayer((prevValue) => {
        return { ...prevValue, institute: value };
      });
    } else if (name === "contactNumber") {
      setPlayer((prevValue) => {
        return { ...prevValue, contactNumber: value };
      });
    } else if (name === "dob") {
      setPlayer((prevValue) => {
        return { ...prevValue, dob: value };
      });
    } else if (name === "email") {
      setPlayer((prevValue) => {
        return { ...prevValue, email: value };
      });
    } else if (name === "photo") {
      setPlayer((prevValue) => {
        return { ...prevValue, photo: value };
      });
    }
  };

  const changeGender = (value) => {
    setPlayer((prevValue) => {
      return { ...prevValue, gender: value };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted: ", player);

    const form = e.currentTarget;
    //form validation
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);

    if (!Object.values(player).includes("")) {
      setIsSubmitting(true);
      const formData = new FormData();

      //append data to formData
      console.log('player',player);

      formData.append("playerData", [player]);

      Axios.post(
        process.env.REACT_APP_API_URL + "/player/add",
        { playerData: [player] },
        {
          headers: {},
        }
      )
        .then(async (res) => {
          console.log(res.data);
          message.success(res.data.message);
          setPlayerID(res.data.data[0]["_id"]);

          
          if(image !== null){
            const imageForm = {image: image,  playerId: res.data.data[0]["_id"], imageName: imageName};
            await Axios.post(process.env.REACT_APP_API_URL + "/image/add",
            imageForm,
            {
              headers: {},
            })
          }
          
          setIsChecked(true);
          navigate('/register/player/'+res.data.data[0]["_id"])
        })
        .catch((error) => {
          console.log("Error: ", error);
          message.error(error.response.data.message);
        });
      setIsSubmitting(false);
    }
  }

  return (
    <div className={`${Styles["body"]}`}>
      <HeaderPage />
      {isRegistrationsOpen ? (
        <>
          <div className={`${Styles["title"]}`}>Player Registration</div>

            <>
              <div className={`${Styles["tournament-guidlines"]}`}>
                <a href="#">Tournament and Registration guildlines</a>
                <img src={require("../../../assests/images/tap.gif")} />
              </div>
              <div className={`${Styles["info-container"]}`}>
                <img src={info} alt="info-icon" className={`${Styles["info-logo"]}`} />
                <div className={`${Styles["info"]}`}>
                  Please note that first you have to register as a player through this portal before
                  applying for single/double events. The Player ID given upon successful
                  registration should be used for all the future events including upcoming years.
                </div>
              </div>
              <div className={`${Styles["register-form"]}`}>
                {/* <img src={bg} className={`${Styles["bg"]}`}/> */}
                <MDBContainer className="">
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                    className={`${Styles["register-form-content"]}`}
                  >
                    <div className="row mb-2">
                      <MDBCol
                        className="align-items-center justify-content-center"
                        lg="6"
                        md="12"
                        sm="12"
                      >
                        <ImageUploader setImage={setImage} fileList={fileList} setFileList={setFileList} setImageName={setImageName} />
                      </MDBCol>
                      <MDBCol className="" lg="6" md="6" sm="12">
                        <Dropdown
                          options={genderOptions}
                          handleClick={(option) => {
                            setGender(option);
                            changeGender(option);
                          }}
                          value={gender}
                          lable={"Gender"}
                        />
                      </MDBCol>
                    </div>
                    <div className="row mb-2">
                      <MDBCol className="" lg="6" md="6" sm="12">
                        <MDBInput
                          wrapperClass="mb-4"
                          label="First Name"
                          labelStyle={{ color: "white", fontFamily: "Hind" }}
                          name="firstName"
                          type="text"
                          className={`${Styles["mdbinput"]} bg-primary bg-opacity-25`}
                          value={player.firstName}
                          onChange={handleChange}
                          required
                          contrast
                        />
                      </MDBCol>
                      <MDBCol className="" lg="6" md="6" sm="12">
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Institute"
                          labelStyle={{ color: "white", fontFamily: "Hind" }}
                          className={`${Styles["mdbinput"]} bg-primary bg-opacity-25`}
                          labelClass="text-white"
                          name="institute"
                          type="text"
                          value={player.institute}
                          onChange={handleChange}
                          required
                          contrast
                        />
                      </MDBCol>
                    </div>
                    <div className="row mb-2">
                      <MDBCol className="" lg="6" md="6" sm="12">
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Last Name"
                          labelStyle={{ color: "white", fontFamily: "Hind" }}
                          className={`${Styles["mdbinput"]} bg-primary bg-opacity-25`}
                          labelClass="text-white"
                          name="lastName"
                          type="text"
                          value={player.lastName}
                          onChange={handleChange}
                          required
                          contrast
                        />
                      </MDBCol>
                      <MDBCol className="" lg="6" md="6" sm="12">
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Contact Number"
                          labelStyle={{ color: "white", fontFamily: "Hind" }}
                          className={`${Styles["mdbinput"]} bg-primary bg-opacity-25`}
                          labelClass="text-white"
                          name="contactNumber"
                          type="text"
                          value={player.contactNumber}
                          onChange={handleChange}
                          required
                          contrast
                        />
                      </MDBCol>
                    </div>
                    <div className="row mb-4">
                      <MDBCol className="" lg="6" md="6" sm="12">
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Date of Birth"
                          labelStyle={{ color: "white", fontFamily: "Hind" }}
                          className={`${Styles["mdbinput"]} bg-primary bg-opacity-25`}
                          labelClass="text-white"
                          name="dob"
                          type="date"
                          value={player.dob}
                          onChange={handleChange}
                          required
                          contrast
                        ></MDBInput>
                      </MDBCol>

                      <MDBCol className="" lg="6" md="6" sm="12">
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Email"
                          labelStyle={{ color: "white", fontFamily: "Hind" }}
                          className={`${Styles["mdbinput"]} bg-primary bg-opacity-25`}
                          labelClass="text-white"
                          name="email"
                          type="email"
                          value={player.email}
                          onChange={handleChange}
                          required
                          contrast
                        />
                      </MDBCol>
                    </div>
                    <button className={`${Styles["btn"]}`} type="submit">
                      Register
                    </button>
                  </Form>
                </MDBContainer>
              </div>
            </>
        </>
      ) : (
        <RegistrationsNotOpen />
      )}
    </div>
  );
};

export default PlayerRegistration;
