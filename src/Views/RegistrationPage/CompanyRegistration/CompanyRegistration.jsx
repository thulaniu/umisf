import React, {  useState,useEffect } from "react";
import HeaderPage from "../../HeaderPage/HeaderPage";
import info from "../../../assests/images/info.gif";
import { Form } from "react-bootstrap";
import { MDBContainer, MDBInput,  MDBCol } from "mdb-react-ui-kit";
import TableRow from "../Common/AddTablePlayer/TableRow";
import Styles from "./CompanyRegistration.module.css";
import RegistrationsNotOpen from "../../../common/registrationsNotOpen/RegistrationsNotOpen";
import Axios from "axios";
import Dropdown from "../../../common/Dropdown/Dropdown";

import { message } from "antd";
import ImageUploader from "../Common/imageUploader/ImageUploader";
import { CircularProgress, Grid, Typography } from "@mui/material";
const CompanyRegistration = () => {
  const [isRegistrationsOpen, setIsRegistrationsOpen] = useState(true);
  const [validated, setValidated] = useState(false); //form validation
  const [company, setCompany] = useState({
    name: "",
    email: "",
    contactNumber: "",
    paymentMethod: "",
    paymentSlip: "",
    matchType:"",
    year:"2023"
  });
  const divisionOptions = ["A Division", "B Division"];
  const isValidPlayerArray = (players) => {
    if (players.length < 5) {
      return false;
    }
    for (const player of players) {
      if (Object.values(player).includes("")) return false;
    }
    return true;
  };
  const [isBankTransfer, setIsBankTransfer] = useState(false);
  const [playersArray, setPlayersArray] = useState([
    { firstName: "", lastName: "", gender: "", photo: "photp" },
    { firstName: "", lastName: "", gender: "", photo: "photp" },
    { firstName: "", lastName: "", gender: "", photo: "photp" },
  ]);
  const [count, setCount] = useState(3);
  const [exceeded, setExceeded] = useState(false);
  const inputStyle = {
    border: "0",
  };
  const [fileList,setFileList] = useState([[],[],[]]);
  const [imageList, setImageList] = useState([null,null,null]);
  const [fileNameList, setFileNameList] = useState([null,null,null]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slipImage,setSlipImage] = useState(null);
  const [slipFile,setSlipFile] = useState([]);
  const [,setSlipName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  const isPlayerArrayValid = isValidPlayerArray(playersArray);
  const paymentOptions = ["On-site", "Bank Transfer"];
  const [payment, setPayment] = useState("");
  useEffect(() => {
    if (isSubmitting) {
      // show loading message
      message.loading("Submitting form...");
    }
  }, [isSubmitting]);

  const handleChange = (e) => {
    console.log("Past performance array: ", playersArray);
    const name = e.target.name;
    const value = e.target.value;
    if (name === "name") {
      setCompany((prevValue) => {
        return { ...prevValue, name: value };
      });
    } else if (name === "email") {
      setCompany((prevValue) => {
        return { ...prevValue, email: value };
      });
    } else if (name === "contactNumber") {
      setCompany((prevValue) => {
        return { ...prevValue, contactNumber: value };
      });
    } else if (name === "paymentMethod") {
      setCompany((prevValue) => {
        return { ...prevValue, paymentMethod: value };
      });
      console.log("isBankTransfer: ", value === "On-Site");
      value === "Bank Transfer"
        ? setIsBankTransfer(true)
        : setIsBankTransfer(false);
    } else if (name === "paymentSlip") {
      setCompany((prevValue) => {
        return { ...prevValue, paymentSlip: value };
      });
    }
  };

  const changePlayerArray = (option, id) => {
    const name = id;
    const value = option;
    const field = name.split("-")[0];
    const position = parseInt(name.split("-")[1]);
    const newArray = [...playersArray];

    switch (field) {
      case "name":
        //incase of one part of the name
        const fullName = value.trim().split(" ")
        fullName.length === 1 && fullName.push(fullName[0])
        const length = fullName.length
       

        newArray[position] = {
          firstName: length == 2 ? fullName[0]: fullName.slice(0,length - 1).join(" "),
          lastName: fullName[length - 1],
          gender: newArray[position].gender,
          photo: newArray[position].photo
        };
        break;
      case "id":
        newArray[position] = {
          firstName: newArray[position].firstName,
          lastName: newArray[position].lastName,
          gender: newArray[position].gender,
          photo: newArray[position].photo
        };
        break;
        case "gender":
          newArray[position] = {
          firstName: newArray[position].firstName,
          lastName: newArray[position].lastName,
          gender: value,
          photo: newArray[position].photo
          };
          break;
      case "photo":
        newArray[position] = {
          firstName: newArray[position].firstName,
          lastName: newArray[position].lastName,
          gender: newArray[position].gender,
          photo: value
        };
        break;
      default:
        console.log(field);
        break;
    }
    setPlayersArray(newArray);
  };

  const updatePlayerCommonData = ()=>{
    const tempArray = []
    for (const player of playersArray){
      let tempObj = {email:company.email, institute:company.name, contactNumber:company.contactNumber,  ...player}
      tempArray.push(tempObj)
    }
    return tempArray
  }
  const changePaymentMethod = (value) => {
    setCompany((prevValue) => {
      return { ...prevValue, paymentMethod: value };
    });
    console.log("isBankTransfer: ", value === "On-Site");
    value === "Bank Transfer" ? setIsBankTransfer(true) : setIsBankTransfer(false);
  };
  const AddAnotherRow = (e) => {
    e.preventDefault();
    setCount(count + 1);
    setPlayersArray((prevValue) => {
      return [...playersArray, { name: "", id: "", gender:"", photo: "photo" }];
    });
    setFileList((prevValue) => {
      return [...fileList, []];
    });
    setImageList((prevValue) => {
      return [...imageList, null];
    });

    setFileNameList((prevValue) => {
      return [...fileNameList, null];
    });
    count === 7 && setExceeded(true);
  };

  const RemoveanotherRow = (e) => {
    e.preventDefault();
    setCount(count - 1);
    if (playersArray.length > 3) {
      const tmpArray = playersArray.slice(0, playersArray.length - 1);
      setPlayersArray(tmpArray);
      const tmpfileList = fileList.slice(0, fileList.length - 1);
      setFileList(tmpfileList);

      const tmpimageList = imageList.slice(0, imageList.length - 1);
      setImageList(tmpimageList);

      const tmpfileNameList = fileNameList.slice(0, fileNameList.length - 1);
      setFileNameList(tmpfileNameList);
      count < 9 && exceeded && setExceeded(false);
    }
  };

  async function handleSubmit(e) {
    //TODO: add player array
    e.preventDefault();
    
    console.log("Form submitted", company);
    console.log("players for submitted",playersArray);
    const form = e.currentTarget;
    const isPlayerArrayValid = isValidPlayerArray(playersArray)
    //form validation
    if (form.checkValidity() === false || !isPlayerArrayValid) {
      e.stopPropagation();
      !isPlayerArrayValid && message.error("Please fill players' details correctly !")
    }
    setValidated(true);
    console.log('bolean',company.paymentMethod=== "On-site")
    if (Object.values(company).includes('') && company.paymentMethod === "On-site" && slipImage === null || !Object.values(company).includes("")) {
      console.log("Here")
      const players = updatePlayerCommonData()
      setIsLoading(true);
      console.log(players)
      Axios.post(
        "http://localhost:3001/company/add",
        { companyDetails:company, players:players},
        {
          headers: {},
        }
      )
        .then(async (res) => {
          console.log(res.data);
          message.success(res.data.message);

          const imageForm = {
            companyId: res.data.data._id,
            slip: slipImage,
            playerIds: res.data.data.players,
            images: imageList
          }

          await Axios.post(process.env.REACT_APP_API_URL + "/image/addMultiple",
            imageForm,
            {
              headers: {},
            })


          setIsLoading(false);

          setTimeout(() => {
            window.location.reload(true);
          }, 2000);
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
      {isRegistrationsOpen && !isLoading ? (
        <>
          <div className={`${Styles["title"]}`}>Event Registration - Corporate</div>
          <div className={`${Styles["tournament-guidlines"]}`}><a href="#">
          Tournament and Registration guildlines</a><img src={require("../../../assests/images/tap.gif")} /></div>
          <div className={`${Styles["info-container"]}`}>
            <img src={info} alt="info-icon" className={`${Styles["info-logo"]}`} />
            <div className={`${Styles["info"]}`}>
              Please note that we only allow companies which have been invited for the event this
              year . Your invitations have already been sent to the relevant email addresses
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
                <div className="row mb-2 ">
                  <MDBCol className="" lg="6" md="6" sm="12">
                    <MDBInput
                      wrapperClass="mb-2"
                      label="Corporate name"
                      labelClass="text-white"
                      labelStyle={{ color: "white", fontFamily: "Hind"}}
                      className={`${Styles["mdbinput"]} bg-primary bg-opacity-25`}
                      name="name"
                      type="text"
                      value={company.name}
                      onChange={handleChange}
                      required
                      contrast
                    />
                  </MDBCol>
                  <MDBCol className="" lg="6" md="6" sm="12">
                    <MDBInput
                      wrapperClass="mb-2"
                      label="Contact Number"
                      labelStyle={{ color: "white", fontFamily: "Hind"}}
                      className={`${Styles["mdbinput"]} bg-primary bg-opacity-25`}
                      labelClass="text-white"
                      name="contactNumber"
                      type="text"
                      value={company.contactNumber}
                      onChange={handleChange}
                      required
                      contrast
                    />
                  </MDBCol>
                </div>
                <div className="row mb-2 ">
                  <MDBCol className="" lg="6" md="6" sm="12">
                    <MDBInput
                      wrapperClass="mb-2"
                      label="Email"
                      labelStyle={{ color: "white", fontFamily: "Hind"}}
                      className={`${Styles["mdbinput"]} bg-primary bg-opacity-25`}
                      labelClass="text-white"
                      name="email"
                      type="email"
                      value={company.email}
                      onChange={handleChange}
                      required
                      contrast
                    />
                  </MDBCol>
                  <MDBCol className="" lg="6" md="6" sm="12">
                  <Dropdown
                      options={divisionOptions}
                      handleClick={(option) => {
                        setCompany({...company, matchType: option});
                      }}
                      value={company.matchType}
                      lable={"Division"}
                    />
                  </MDBCol>
                </div>
                <div className="mb-2">
                  <div className="mb-2">
                    <div style={{ fontWeight: "bold", fontFamily: "Hind"}}>
                      Team
                    </div>
                  </div>
                  {playersArray?.map((player, index) => {
                    return <TableRow player={player} index={index} handleChange={changePlayerArray} genderNeeded={true}setFileList={setFileList} setImageList={setImageList} fileList={fileList} imageList={imageList} fileNameList={fileNameList} setFileNameList={setFileNameList}/>;
                  })}
                  <div className={`${Styles["plus-minus"]}`}>
                    <button
                      hidden={exceeded}
                      className={`${Styles["plus-btn"]}`}
                      onClick={AddAnotherRow}
                    >
                      <img src={require(`../../../assests/images/plus-row.png`)} alt={''}/>
                    </button>
                    <button className={`${Styles["plus-btn"]}`} onClick={RemoveanotherRow}>
                      <img src={require(`../../../assests/images/minus-row.png`)} alt={''}/>
                    </button>
                  </div>
                </div>

            <div className="row mb-4 mt-2">
              <MDBCol className="mb-1">
                <Dropdown
                  options={paymentOptions}
                  handleClick={(option) => {
                    setPayment(option);
                    changePaymentMethod(option);
                  }}
                  value={payment}
                  lable={"Payment"}
                />
              </MDBCol>
              {isBankTransfer && (
                <MDBCol className="mb-1" lg="6" md="6" sm="12">
                  <ImageUploader isfile={true} setImage={setSlipImage} fileList={slipFile} setFileList={setSlipFile} setImageName={setSlipName} />
                </MDBCol>
              )}
            </div>

                <button className={`${Styles["btn"]}`} type="submit">
                  Register
                </button>
              </Form>
            </MDBContainer>
          </div>
        </>
      ) :
      isRegistrationsOpen && isLoading ?
      (
        <Grid container item xs={12} height='100vh' display='flex' justifyContent='center' alignItems='center'>
          <CircularProgress size={100}/>
        </Grid>
        
      ): (
        <RegistrationsNotOpen/>
      )}
    </div>
  );
};

export default CompanyRegistration;
