import React from "react";
import { MDBCol, MDBInput } from "mdb-react-ui-kit";
import Styles from "./TableRow.module.css";

const TableRow = ({ index, member, onChange }) => {
  return (
    <div className="row mb-3">
      {/* Member Name */}
      <MDBCol lg="4" md="12" sm="12">
        <MDBInput
          wrapperClass="mb-2"
          label="Full Name"
          labelClass="text-white"
          type="text"
          value={member.name}
          onChange={(e) => onChange(index, "name", e.target.value)}
          contrast
          className={`${Styles.mdbinput} bg-primary bg-opacity-25`}
        />
      </MDBCol>

      {/* Contact Number */}
      <MDBCol lg="4" md="12" sm="12">
        <MDBInput
          wrapperClass="mb-2"
          label="Contact Number"
          labelClass="text-white"
          type="text"
          value={member.contact}
          onChange={(e) => onChange(index, "contact", e.target.value)}
          contrast
          className={`${Styles.mdbinput} bg-primary bg-opacity-25`}
        />
      </MDBCol>

      {/* Registration Number */}
      <MDBCol lg="4" md="12" sm="12">
        <MDBInput
          wrapperClass="mb-2"
          label="Registration Number"
          labelClass="text-white"
          type="text"
          value={member.regNo}
          onChange={(e) => onChange(index, "regNo", e.target.value)}
          contrast
          className={`${Styles.mdbinput} bg-primary bg-opacity-25`}
        />
      </MDBCol>
    </div>
  );
};

export default TableRow;
