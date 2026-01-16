import React, { useRef, useState, useEffect } from "react";
import Styles from "./RegisterAll.module.css";
import HeaderPage from "../../HeaderPage/HeaderPage";
import info from "../../../assests/images/info.gif";
import { Form } from "react-bootstrap";
import { MDBContainer, MDBInput, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { Button, Divider, Space, Tour } from "antd";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import TableRow from "../Common/AddTablePerf/TableRow";
import Axios from "axios";
import { CheckCircleTwoTone, ExclamationCircleTwoTone } from "@ant-design/icons";
import { Modal, message, Select } from "antd";
import Dropdown from "../../../common/Dropdown/Dropdown";
import RegistrationsNotOpen from "../../../common/registrationsNotOpen/RegistrationsNotOpen";

const RegisterAll = () => {
  const [isRegistrationsOpen, setIsRegistrationsOpen] = useState(true);
  const [validated, setValidated] = useState(false); //form validation
  const [single, setSingle] = useState({
    player: "",
    ageGroup: "Select Age Group",
    pastPerformance: [],
    paymentMethod: "",
    paymentSlip: "",
    year:"2023"
  });

  const [double, setDouble] = useState({
    player: "",
    playerPartner: "",
    ageGroup: "Select Age Group",
    pastPerformance: [],
    paymentMethod: "",
    paymentSlip: "",
    year:"2023"
  });
  const items = [
    {
      key: "1",
      label: "Item 1",
    },
    {
      key: "2",
      label: "Item 2",
    },
    {
      key: "3",
      label: "Item 3",
    },
  ];
  const [isBankTransfer, setIsBankTransfer] = useState(false);
  const [singlePastPerformanceArray, setSinglePastPerformanceArray] = useState([
    { name: "", level: "", place: "" },
    { name: "", level: "", place: "" },
    { name: "", level: "", place: "" },
  ]);

  const [doublePastPerformanceArray, setDoublePastPerformanceArray] = useState([
    { name: "", level: "", place: "" },
    { name: "", level: "", place: "" },
    { name: "", level: "", place: "" },
  ]);

  //   const [mixPastPerformanceArray, setMixPastPerformanceArray] = useState([
  //     { name: "", level: "", place: "" },
  //     { name: "", level: "", place: "" },
  //     { name: "", level: "", place: "" },
  //   ]);

  const { confirm } = Modal;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPlayingSingle, setIsplayingSingle] = useState(true);
  const [isPlayingDouble, setIsplayingDouble] = useState(true);
  const ageOptions = ["Under 9", "Under 11", "Under 13", "Under 15", "Staff"];
  const [ageGrpup, setAgeGroup] = useState("");
  const paymentOptions = ["On-site", "Bank Transfer"];
  const [payment, setPayment] = useState("");
  //const [isPlayingMix, setIsplayingMix] = useState(true);
  let doneSingle = { success: false, message: "", valid: false, data: "" };
  let doneDouble = {
    success: false,
    message: "",
    valid: false,
    validP: false,
    data: "",
    dataP: "",
  };

  useEffect(() => {
    if (isSubmitting) {
      // show loading message
      message.loading("Submitting form...");
    }
  }, [isSubmitting]);

  const showConfirm = (title, success, content) => {
    let singleRes = null;
    let doubleRes = null;
    confirm({
      title: title,
      icon: success ? (
        <CheckCircleTwoTone twoToneColor="#52c41a" />
      ) : (
        <ExclamationCircleTwoTone twoToneColor="#eb2f96" />
      ),
      content: content, //TODO: content for success should be displayed properly (create a proper description using the object sent in content) -> VINUL
      async onOk() {
        console.log("OK");
        if (success) {
          setIsSubmitting(true);
          if (isPlayingSingle) {
            try {
              singleRes = await Axios.post(
                process.env.REACT_APP_API_URL + "/single/add",
                { singleData: [single] },
                {
                  headers: {},
                }
              );
              console.log(singleRes.data);
              doneSingle = { ...doneSingle, success: true, message: singleRes.data.message };
            } catch (error) {
              console.log("Error: ", error);
              doneSingle = { ...doneSingle, message: error.response.data.message };
              //message.error(error.response.data.message);
            }
          } else {
            doneSingle = { ...doneSingle, success: true };
          }
          if (isPlayingDouble) {
            try {
              doubleRes = await Axios.post(
                process.env.REACT_APP_API_URL + "/double/add",
                { data: [double] },
                {
                  headers: {},
                }
              );
              console.log(doubleRes.data);
              doneDouble = { ...doneDouble, success: true, message: doubleRes.data.message };
            } catch (error) {
              console.log("Error: ", error);
              doneDouble = { ...doneDouble, message: error.response.data.message };
              //message.error(error.response.data.message);
            }
          } else {
            doneDouble = { ...doneDouble, success: true };
          }

          //   .then((res) => {
          //     console.log(res.data);
          //     message.success(res.data.message);
          //     console.log("Here");
          //     setTimeout(() => {
          //       window.location.reload(true);
          //     }, 2000);
          //   })
          //   .catch((error) => {

          //   });
          setIsSubmitting(false);
          let msg = "";

          if (isPlayingSingle) {
            msg += doneSingle.message;
          }
          if (isPlayingDouble && isPlayingSingle) msg += " & ";

          if (isPlayingDouble) {
            msg += doneDouble.message;
          }

          if (!doneDouble.success || !doneSingle.success) {
            message.error(msg);
          } else {
            message.success(msg);
            setTimeout(() => {
              window.location.reload(true);
            }, 3000);
          }
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const changePlayer = (e) => {
    const value = e.target.value;

    setSingle((prevValue) => {
      return { ...prevValue, player: value };
    });

    setDouble((prevValue) => {
      return { ...prevValue, player: value };
    });
  };

  const changeAgeGroup = (value) => {
    setSingle((prevValue) => {
      return { ...prevValue, ageGroup: value };
    });

    setDouble((prevValue) => {
      return { ...prevValue, ageGroup: value };
    });
  };

  const changePaymentMethod = (value) => {
    setSingle((prevValue) => {
      return { ...prevValue, paymentMethod: value };
    });

    setDouble((prevValue) => {
      return { ...prevValue, paymentMethod: value };
    });
    console.log("isBankTransfer: ", value == "On-Site");
    value == "Bank Transfer" ? setIsBankTransfer(true) : setIsBankTransfer(false);
  };

  const changePaymentSlip = (e) => {
    const value = e.target.value;

    setSingle((prevValue) => {
      return { ...prevValue, paymentSlip: value };
    });

    setDouble((prevValue) => {
      return { ...prevValue, paymentSlip: value };
    });
  };

  const changeSinglePastPerformanceArray = (option, id) => {
    console.log("Event from root", option, id);
    const name = id;
    const value = option;
    const field = name.split("-")[0];
    const position = parseInt(name.split("-")[1]);
    console.log("Table Values: ", field, position, value);
    const newArray = [...singlePastPerformanceArray];
    switch (field) {
      case "name":
        newArray[position] = {
          name: value,
          level: newArray[position].level,
          place: newArray[position].place,
        };
        break;
      case "level":
        newArray[position] = {
          name: newArray[position].name,
          level: value,
          place: newArray[position].place,
        };
        break;
      case "place":
        newArray[position] = {
          name: newArray[position].name,
          level: newArray[position].level,
          place: value,
        };
        break;
    }
    setSinglePastPerformanceArray(newArray);
  };

  const changeDoublePastPerformanceArray = (option, id) => {
    const name = id;
    const value = option;
    const field = name.split("-")[0];
    const position = parseInt(name.split("-")[1]);
    console.log("Table Values: ", field, position, value);
    const newArray = [...doublePastPerformanceArray];
    switch (field) {
      case "name":
        newArray[position] = {
          name: value,
          level: newArray[position].level,
          place: newArray[position].place,
        };
        break;
      case "level":
        newArray[position] = {
          name: newArray[position].name,
          level: value,
          place: newArray[position].place,
        };
        break;
      case "place":
        newArray[position] = {
          name: newArray[position].name,
          level: newArray[position].level,
          place: value,
        };
        break;
    }
    setDoublePastPerformanceArray(newArray);
  };

  const AddAnotherRowS = (e) => {
    e.preventDefault();
    setSinglePastPerformanceArray((prevValue) => {
      return [...singlePastPerformanceArray, { name: "", level: "", place: "" }];
    });
  };

  const RemoveanotherRowS = (e) => {
    e.preventDefault();
    if (singlePastPerformanceArray.length > 3) {
      const tmpArray = singlePastPerformanceArray.slice(0, singlePastPerformanceArray.length - 1);
      setSinglePastPerformanceArray(tmpArray);
    }
  };

  const AddAnotherRowD = (e) => {
    e.preventDefault();
    setDoublePastPerformanceArray((prevValue) => {
      return [...doublePastPerformanceArray, { name: "", level: "", place: "" }];
    });
  };

  const RemoveanotherRowD = (e) => {
    e.preventDefault();
    if (doublePastPerformanceArray.length > 3) {
      const tmpArray = doublePastPerformanceArray.slice(0, doublePastPerformanceArray.length - 1);
      setDoublePastPerformanceArray(tmpArray);
    }
  };

  const arrangePerformanceArray = (arr) => {
    const newArr = [];
    for (const value of arr) {
      if (Object.values(value).includes("")) {
        const { name, level, place } = value;
        if (name == "" && level == "" && place == "") {
          //nothing
          console.log("nothing");
        } else {
          return ["~error~"];
        }
      } else {
        newArr.push(value);
      }
    }
    return newArr;
  };

  //   const AddAnotherRowM = () => {
  //     setMixPastPerformanceArray((prevValue) => {
  //       return [...mixPastPerformanceArray, { name: "", level: "", place: "" }];
  //     });
  //   };

  //   const RemoveanotherRowM = () => {
  //     if (mixPastPerformanceArray.length > 3) {
  //       const tmpArray = mixPastPerformanceArray.slice(0, mixPastPerformanceArray.length - 1);
  //       setMixPastPerformanceArray(tmpArray);
  //     }
  //   };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted");
    const form = e.currentTarget;
    const singlePerf = arrangePerformanceArray(singlePastPerformanceArray);
    const doublePerf = arrangePerformanceArray(doublePastPerformanceArray);
    let perfError = false;
    console.log("Perfs:", singlePerf);
    console.log("perfd", doublePerf);
    //form validation
    if (
      form.checkValidity() === false ||
      (isPlayingDouble && double.player === double.playerPartner)
    ) {
      e.stopPropagation();
      isPlayingDouble &&
        double.player === double.playerPartner &&
        message.error("Player and the Partner have the same ID !! ");
    }
    if (singlePerf.includes("~error~") || doublePerf.includes("~error~")) {
      perfError = true;
      message.error("Please fill your performance correctly !");
      e.stopPropagation();
    }

    setValidated(true);

    single.pastPerformance = singlePerf;
    double.pastPerformance = doublePerf;

    if (
      ((isPlayingSingle &&
        Object.values(single).includes("") &&
        single.paymentMethod == "On-site" &&
        single.paymentSlip == "") ||
        !Object.values(single).includes("")) &&
      !perfError
    ) {
      try {
        const res = await Axios.get(
          process.env.REACT_APP_API_URL + "/player/getByObjectId",
          { params: { ids: single.player } },
          {
            headers: {},
          }
        );

        console.log("Result from get player by id", res.data.data);
        // showConfirm("Confirm your data !", true, res.data.toString());
        doneSingle = { ...doneSingle, valid: true, data: res.data.data[0] };
        !isPlayingDouble && check();
        console.log("SUPUN");
      } catch (error) {
        console.log("Error: ", error.response.data.message);
        //showConfirm("Error Loading Player !", false, error.response.data.message);
        doneSingle = { ...doneSingle, data: error.response.data.message };
        !isPlayingDouble && check();
      }
    }

    if (
      ((isPlayingDouble &&
        Object.values(double).includes("") &&
        double.paymentMethod == "On-site" &&
        double.paymentSlip == "") ||
        !Object.values(double).includes("")) &&
      !perfError
    ) {
      Axios.get(
        process.env.REACT_APP_API_URL + "/player/getByObjectId",
        { params: { ids: double.player + "," + double.playerPartner } },
        {
          headers: {},
        }
      )
        .then(async (res) => {
          console.log("Result from get player by id", res.data);
          // showConfirm("Confirm your data !", true, res.data.toString());
          if (res.data.data.length == 2) {
            doneDouble = {
              ...doneDouble,
              valid: true,
              validP: true,
              data: res.data.data[0]._id === double.player ? res.data.data[0] : res.data.data[1],
              dataP: res.data.data[1]._id === double.player ? res.data.data[0] : res.data.data[1],
            };
            console.log("Below");
            check();
          } else if (res.data.data.length == 1) {
            console.log("Here");
            doneDouble = createDoneDouble(double.player, res.data.data[0], doneDouble);

            check();
          } else {
            console.log(res.data);
            alert("Something went wrong !!");
          }
        })
        .catch((error) => {
          console.log("Here");
          console.log("Error: ", error.response.data.message);
          //showConfirm("Error Loading Player !", false, error.response.data.message);
          doneDouble = {
            ...doneDouble,
            valid: false,
            validP: false,
            data: error.response.data.message,
            dataP: error.response.data.message,
          };
          check();
        });
    }
  }

  const createDoneDouble = (player, data, doneDouble) => {
    if (Object.values(data).includes(player)) {
      return {
        ...doneDouble,
        valid: true,
        validP: false,
        data: data,
        dataP: "Invalid ID included for Partner",
      };
    }
    return { ...doneDouble, valid: false, validP: true, data: "Invalid ID included", dataP: data };
  };

  const check = () => {
    let message = "";
    if (isPlayingSingle && isPlayingDouble) {
      console.log("single double");
      doneDouble.valid && doneDouble.validP
        ? (message =
            "Player: " +
            doneDouble.data.firstName +
            " " +
            doneDouble.data.lastName +
            " " +
            ", Partner: " +
            doneDouble.dataP.firstName +
            " " +
            doneDouble.dataP.lastName +
            " , Gender: " +
            doneDouble.data.gender)
        : doneDouble.valid && !doneDouble.validP
        ? (message = doneDouble.dataP)
        : (message = doneDouble.data);
    } else if (isPlayingSingle && !isPlayingDouble) {
      console.log("single");
      // console.log("doneSingle", doneSingle.data);
      doneSingle.valid
        ? (message =
            "Player: " +
            doneSingle.data.firstName +
            " " +
            doneSingle.data.lastName +
            " , " +
            "Gender: " +
            doneSingle.data.gender)
        : (message = doneSingle.data);
    } else if (!isPlayingSingle && isPlayingDouble) {
      console.log("double");
      doneDouble.valid && doneDouble.validP
        ? (message =
            "Player: " +
            doneDouble.data.firstName +
            " " +
            doneDouble.data.lastName +
            " " +
            ", Partner: " +
            doneDouble.dataP.firstName +
            " " +
            doneDouble.dataP.lastName +
            " , Gender: " +
            doneDouble.data.gender)
        : doneDouble.valid && !doneDouble.validP
        ? (message = doneDouble.dataP)
        : (message = doneDouble.data);
    }
    console.log("Message : ", message);
    console.log(doneSingle.valid, doneDouble.valid, doneDouble.validP);
    if (
      (isPlayingDouble && (doneDouble.valid == false || doneDouble.validP == false)) ||
      (isPlayingSingle && doneSingle.valid == false)
    ) {
      showConfirm("Error Loading Player !", false, message);
    } else {
      showConfirm("Confirm your data !", true, message);
    }
  };

 

  return (
    <div className={`${Styles["body"]}`}>
      <HeaderPage />
      {isRegistrationsOpen ? (
        <>
          <div className={`${Styles["title"]}`}>Event Registration</div>
          <div className={`${Styles["tournament-guidlines"]}`}><a href="#">
          Tournament and Registration guildlines</a><img src={require("../../../assests/images/tap.gif")} /></div>
          <div className={`${Styles["info-container"]}`}>
            <img src={info} alt="info-icon" className={`${Styles["info-logo"]}`} />
            <div className={`${Styles["info"]}`}>
              Please note that first you have to register as a player through player registration
              portal before applying for single/double events. The Player ID given upon successful
              registration should be used as Player ID here .
            </div>
          </div>
          <div className={`${Styles["register-form"]}`}>
            {/* <img src={bg} className={`${Styles["bg"]}`}/> */}
            <MDBContainer>
              <MDBRow className="mt-4">
                <MDBCol>
                  <FormControlLabel
                    control={
                      <Switch
                        defaultChecked
                        onClick={() => {
                          setIsplayingSingle(!isPlayingSingle);
                        }}
                      />
                    }
                    label="Single"
                  />
                </MDBCol>
                <MDBCol>
                  <FormControlLabel
                    control={
                      <Switch
                        defaultChecked
                        onClick={() => {
                          setIsplayingDouble(!isPlayingDouble);
                        }}
                      />
                    }
                    label="Double"
                  />
                </MDBCol>
                {/* <MDBCol end size="4">
              <small>Mix Double</small> <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked  onClick={()=>{setIsplayingMix(!isPlayingMix)}}/>
            </MDBCol> */}
              </MDBRow>
            </MDBContainer>

            <MDBContainer className="">
              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                className={`${Styles["register-form-content"]}`}
              >
                <div hidden={!isPlayingSingle}>
                  <div className="row mb-1 ">
                    <MDBCol className="mb-1" lg="6" md="12" sm="12">
                      <MDBInput
                        wrapperClass="mb-1"
                        label="Player ID"
                        labelStyle={{ color: "white", fontFamily: "Hind"}}
                        className={`${Styles["mdbinput"]} bg-primary bg-opacity-25`}
                        labelClass="text-white"
                        name="player"
                        type="text"
                        value={single.player}
                        onChange={changePlayer}
                        required
                        contrast
                      />
                    </MDBCol>
                    <MDBCol className="mb-1" lg="6" md="12" sm="12">
                      {/* <MDBInput
                    wrapperClass="mb-1"
                    label="Age Group"
                    labelClass="text-white"
                    name="ageGroup"
                    type="text"
                    value={single.ageGroup}
                    onChange={changeAgeGroup}
                    required
                    contrast
                  /> */}
                      <Dropdown
                        options={ageOptions}
                        handleClick={(option) => {
                          setAgeGroup(option);
                          changeAgeGroup(option);
                        }}
                        value={ageGrpup}
                        lable={"Age Group"}
                      />
                    </MDBCol>
                  </div>
                  <div className="mb-2">
                    <div style={{ fontWeight: "bold", fontFamily: "Hind"}}>
                      {" "}
                      Singles : Past Performance
                    </div>

                    {singlePastPerformanceArray?.map((perf, index) => {
                      return (
                        <TableRow
                          perf={perf}
                          index={index}
                          handleChange={changeSinglePastPerformanceArray}
                        />
                      );
                    })}
                    <div className={`${Styles["plus-minus"]}`}>
                      <button className={`${Styles["plus-btn"]}`} onClick={AddAnotherRowS}>
                        <img src={require(`../../../assests/images/plus-row.png`)} />
                      </button>
                      <button className={`${Styles["plus-btn"]}`} onClick={RemoveanotherRowS}>
                        <img src={require(`../../../assests/images/minus-row.png`)} />
                      </button>
                    </div>
                  </div>
                </div>
                <div hidden={!isPlayingDouble}>
                  <div className="row mb-1 ">
                    {!isPlayingSingle && (
                      <MDBCol className="" lg="6" md="12" sm="12">
                        <MDBInput
                          wrapperClass="mb-1"
                          label="Player ID"
                          labelStyle={{ color: "white", fontFamily: "Hind"}}
                          className={`${Styles["mdbinput"]} bg-primary bg-opacity-25`}
                          labelClass="text-white"
                          name="player"
                          type="text"
                          value={double.player}
                          onChange={changePlayer}
                          required
                          contrast
                          display="none"
                        />{" "}
                      </MDBCol>
                    )}

                    <MDBCol className="mb-1" lg={isPlayingSingle ? "12" : "6"} md="12" sm="12">
                      <MDBInput
                        wrapperClass="mb-1"
                        label="Partner ID"
                        labelStyle={{ color: "white", fontFamily: "Hind"}}
                        className={`${Styles["mdbinput"]} bg-primary bg-opacity-25`}
                        labelClass="text-white"
                        name="d-partner"
                        type="text"
                        value={double.playerPartner}
                        onChange={(e) => {
                          const value = e.target.value;
                          setDouble((prevValue) => {
                            return { ...prevValue, playerPartner: value };
                          });
                        }}
                        required
                        contrast
                      />
                    </MDBCol>
                  </div>
                  <div className="row mb-2">
                    {!isPlayingSingle && (
                      <MDBCol className="mb-1" lg="12" md="12" sm="12">
                        <Dropdown
                          options={ageOptions}
                          handleClick={(option) => {
                            setAgeGroup(option);
                            changeAgeGroup(option);
                          }}
                          value={ageGrpup}
                          lable={"Age Group"}
                        />
                      </MDBCol>
                    )}
                  </div>

                  <div className="mb-2">
                    <div style={{ fontWeight: "bold", fontFamily: "Hind"}}>
                      {" "}
                      Doubles : Past Performance
                    </div>

                    {doublePastPerformanceArray?.map((perf, index) => {
                      return (
                        <TableRow
                          perf={perf}
                          index={index}
                          handleChange={changeDoublePastPerformanceArray}
                        />
                      ); //TODO:
                    })}
                    <div className={`${Styles["plus-minus"]}`}>
                      <button className={`${Styles["plus-btn"]}`} onClick={AddAnotherRowD}>
                        <img src={require(`../../../assests/images/plus-row.png`)} />
                      </button>
                      <button className={`${Styles["plus-btn"]}`} onClick={RemoveanotherRowD}>
                        <img src={require(`../../../assests/images/minus-row.png`)} />
                      </button>
                    </div>
                  </div>
                </div>
                {/* <div hidden={!isPlayingMix}>
              <div className="d-flex flex-row mb-1 ">
              {(!isPlayingSingle && !isPlayingDouble)&& <MDBCol>
                  <MDBInput
                    wrapperClass="mb-1"
                    label="Player ID"
                    labelClass="text-white"
                    name="player"
                    type="text"
                    value={single.player}
                    onChange={handleChange}
                    required
                    contrast
                    display='none'
                  /> </MDBCol>}
                
                <MDBCol>
                  <MDBInput
                    wrapperClass="mb-1"
                    label="Partner ID"
                    labelClass="text-white"
                    name="m-partner"
                    type="text"
                    value={single.player} //TODO:
                    onChange={handleChange}
                    required
                    contrast
                    
                  />
                </MDBCol>
              </div>
              <div className="mb-1">
                <div className="d-flex flex-row mb-1"> Mix Doubles : Past Performance</div>
                <div className="d-flex flex-row mb-1">
                  <MDBCol>
                    <div>Tournament Name</div>
                  </MDBCol>
                  <MDBCol>
                    <div>Level</div>
                  </MDBCol>
                  <MDBCol>
                    <div>Winning Place</div>
                  </MDBCol>
                </div>
                {mixPastPerformanceArray?.map((perf, index) => {
                  return <TableRow perf={perf} index={index} handleChange={handleChange} />;
                })}
                <PlusCircleTwoTone onClick={AddAnotherRowM} />
                <MinusCircleTwoTone onClick={RemoveanotherRowM} />
              </div>


            </div> */}
                {(isPlayingDouble || isPlayingSingle) && (
                  <div className="row mb-4 mt-2">
                    <MDBCol className="mb-1">
                      <Dropdown
                        options={paymentOptions}
                        handleClick={(option) => {
                          setPayment(option);
                          changePaymentMethod(option);
                        }}
                        value={payment}
                        lable={"Payment Method"}
                      />
                    </MDBCol>
                    {isBankTransfer && (
                      <MDBCol className="" lg="6" md="6" sm="12">
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Payment Slip"
                          labelStyle={{ color: "white", fontFamily: "Hind"}}
                          className={`${Styles["mdbinput"]} bg-primary bg-opacity-25`}
                          labelClass="text-white"
                          name="paymentSlip"
                          type="text"
                          value={isPlayingSingle ? single.paymentSlip : double.paymentSlip}
                          onChange={changePaymentSlip}
                          contrast
                        />
                      </MDBCol>
                    )}
                  </div>
                )}

                <button
                  className={`${Styles["btn"]}`}
                  type="submit"
                  hidden={!isPlayingDouble && !isPlayingSingle}
                >
                  Register
                </button>
              </Form>
            </MDBContainer>
          </div>
        </>
      ) : (
        <RegistrationsNotOpen/>
      )}
    </div>
  );
};

export default RegisterAll;
