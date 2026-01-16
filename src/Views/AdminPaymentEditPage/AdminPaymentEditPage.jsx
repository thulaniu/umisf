import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Form, Input } from "reactstrap";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import styles from "./adminPaymentEditPage.module.css";

const AdminPaymentEditPage = (props) => {
  const location = useLocation();
  const [paymentDetails, setPaymentDetails] = useState(location.state);

  const [show, setShow] = useState(false);

  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const deletePayment = (e) => {
    e.preventDefault();
    setShow(false);
  };

  const submitConfirmation = (e) => {
    console.log(paymentDetails);
  };

  const confirmPayment = (e) => {
    e.preventDefault();
    //set the payment approver to the logged in user
    setPaymentDetails({ ...paymentDetails, paymentConfirmed: "Confirmed" });
    //payment confirmation should be a string--> with following enums confimed/not-confirmed/ declined
    submitConfirmation();
  };

  const declinePayment = (e) => {
    e.preventDefault();
    //set the payment approver to the logged in user
    setPaymentDetails({ ...paymentDetails, paymentConfirmed: "Declined" });
    submitConfirmation();
  };

  return (
    <div className={`${styles["account-container"]}`}>
      <ProfileHeader user_type={"admin"} />
      <AdminNavbar page="payments" />

      <div className={`${styles["main-title"]}`}>
        <a href="/admin/payments">Payments</a>
        <img src={require("../../assests/images/forward_arrow.png")} alt="" /> {paymentDetails.id}
      </div>
      <div className={`${styles["tool-bar"]}`}>
        <button onClick={handleShow}>
          <img src={require("../../assests/images/delete.png")} alt="" /> Delete Payment
        </button>
      </div>
      <div className={`${styles["profile-container"]}`}>
        <Form>
          <div className={`${styles["profile-field-container"]}`}>
            <div className={`${styles["profile-field-name"]}`}>Payment ID</div>
            <div className={`${styles["profile-field-value"]}`}>
              <input
                disabled
                type="text"
                className={`${styles["form-input"]}`}
                value={paymentDetails.id}
              />
            </div>
          </div>
          <hr />

          <div className={`${styles["profile-field-container"]}`}>
            <div className={`${styles["profile-field-name"]}`}>Payment Method</div>
            <div className={`${styles["profile-field-value"]}`}>
              <input
                disabled
                type="text"
                className={`${styles["form-input"]}`}
                value={paymentDetails.paymentMethod}
              />
              {/* give the ability to download the pdf, once clicked */}
            </div>
          </div>
          <hr />

          {paymentDetails.paymentMethod === "Bank Transfer" && (
            <div>
              <div className={`${styles["profile-field-container"]}`}>
                <div className={`${styles["profile-field-name"]}`}>Payment Slip</div>
                <div className={`${styles["profile-field-value"]}`}>
                  <a href="" download className={`${styles["file-name"]}`}>
                    {paymentDetails.paymentSlip}
                  </a>
                  {/* give the ability to download the pdf, once clicked */}
                </div>
              </div>

              <hr />
            </div>
          )}

          {paymentDetails.paymentApprover && (
            <div>
              <div className={`${styles["profile-field-container"]}`}>
                <div className={`${styles["profile-field-name"]}`}>Payment Approver</div>
                <div className={`${styles["profile-field-value"]}`}>
                  <input
                    disabled
                    type="text"
                    className={`${styles["form-input"]}`}
                    value={paymentDetails.paymentApprover}
                    placeholder="Enter your roles.."
                    onChange={(e) =>
                      setPaymentDetails({ ...paymentDetails, paymentApprover: e.target.value })
                    }
                  />
                  {/* payment approover will be a disabled option. Once he cofirm/decline, his name will be updated */}
                </div>
              </div>
              <hr />
            </div>
          )}
          <button
            className={`${styles["form-submit-button"]}`}
            style={{ marginRight: "5px" }}
            onClick={confirmPayment}
          >
            Confirm
          </button>

          <button
            className={`${styles["form-submit-button"]}`}
            style={{ background: "red" }}
            onClick={declinePayment}
          >
            Decline
          </button>
        </Form>
      </div>

      {/* modal for adding img */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header style={{ backgroundColor: "#f5f6fa" }}>
          <Modal.Title style={{ fontFamily: "Hind", fontSize: "18px" }}>Delete Payment</Modal.Title>
        </Modal.Header>
        <form style={{ backgroundColor: "#f5f6fa" }}>
          <Modal.Body>
            <div className="row">
              <div className="col-11">
                <h5 style={{ fontFamily: "Hind", fontSize: "18px" }}>
                  Are you sure you want to delete this payment record?{" "}
                </h5>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button
              onClick={handleClose}
              className="btn btn-secondary"
              style={{ fontFamily: "Hind", fontSize: "18px" }}
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-light"
              onClick={deletePayment}
              style={{
                fontFamily: "Hind",
                fontSize: "18px",
                background: "red",
                color: "white",
              }}
            >
              Delete
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default AdminPaymentEditPage;
