import React, { useState } from "react";
import Styles from "./TableRow.module.css";
import { MDBCol, MDBInput } from "mdb-react-ui-kit";
import Dropdown from "../../../../common/Dropdown/Dropdown";

const TableRow = (props) => {
  // console.log('Props of table row: ',props)
  const levelOptions = ["School", "Zonal", "Provincial", "National", "International"];
  const [level, setLevel] = useState("");
  const PlaceOptions = ["Champion", "Runnerup", "Second-Runnerup", "Quaterfinalist"];
  const [place, setPlace] = useState("");
  return (
    <div>
      <div className="row">
        <MDBCol className="" lg="4" md="12" sm="12">
          <MDBInput
            wrapperClass="mb-3"
            labelClass="text-white"
            name={"name-" + props.index}
            type="text"
            value={props.perf.name}
            onChange={(e) => {
              props.handleChange(e.target.value, e.target.name);
            }}
            contrast
            label="Tournament"
            labelStyle={{ color: "white", fontFamily: "Hind" }}
            className={`${Styles["mdbinput"]} bg-primary bg-opacity-25`}
          />
        </MDBCol>
        <MDBCol className="" lg="4" md="12" sm="12">
          <Dropdown
            options={levelOptions}
            handleClick={(option, id) => {
              setLevel(option);
              props.handleChange(option, id);
            }}
            value={level}
            name={"level-" + props.index}
            lable={"Level"}
          />
        </MDBCol>
        <MDBCol className="" lg="4" md="12" sm="12">
          <Dropdown
            options={PlaceOptions}
            handleClick={(option, id) => {
              setPlace(option);
              props.handleChange(option, id);
            }}
            value={place}
            name={"place-" + props.index}
            lable={"Winning Place"}
          />
        </MDBCol>
      </div>
      <div class="row d-lg-none mt-6 mb-6 d-xl-none"></div>
    </div>
  );
};

export default TableRow;
