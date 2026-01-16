import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Form, Input } from "reactstrap";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import styles from "./adminPaymentCreatePage.module.css";

const AdminPaymentCreatePage = (props) => {
  const [paymentDetails, setPaymentDetails] = useState({
    id: "",
    paymentMethod: "",
    paymentSlip: "",
    paymentApprover: "",
    paymentConfirmed: true, // since the payment is created by a system user, payment will be confirmed by default.
  });

  const createPayment = (e) => {
    e.preventDefault();
    //set the payment approver to the logged in user
    console.log(paymentDetails);
  };

  return (
    <div className={`${styles["account-container"]}`}>
      <ProfileHeader user_type={"admin"} />
      <AdminNavbar page="payments" />

      <div className={`${styles["main-title"]}`}>
        <a href="/admin/payments">Payments</a>
      </div>
      <div className={`${styles["tool-bar"]}`}>Add new payment record</div>
      <div className={`${styles["profile-container"]}`}>
        <Form onSubmit={createPayment}>
          <div className={`${styles["profile-field-container"]}`}>
            <div className={`${styles["profile-field-name"]}`}>Payment Method</div>
            <div className={`${styles["profile-field-value"]}`}>
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(e) =>
                  setPaymentDetails({ ...paymentDetails, paymentMethod: e.target.value })
                }
              >
                <option selected>Select the payment method ..</option>
                <option value="On-site">On-site</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
              {/* give the ability to download the pdf, once clicked */}
            </div>
          </div>
          <hr />

          {paymentDetails.paymentMethod === "Bank Transfer" && (
            <div>
              <div className={`${styles["profile-field-container"]}`}>
                <div className={`${styles["profile-field-name"]}`}>Payment Slip</div>
                <div className={`${styles["profile-field-value"]}`}>
                  <input
                    type="file"
                    className={`${styles["form-input"]}`}
                    onChange={(e) =>
                      setPaymentDetails({ ...paymentDetails, paymentSlip: e.target.files[0].name })
                    }
                  />
                </div>
              </div>

              <hr />
            </div>
          )}

          <button className={`${styles["form-submit-button"]}`}>Add record</button>
        </Form>
      </div>
    </div>
  );
};

export default AdminPaymentCreatePage;
