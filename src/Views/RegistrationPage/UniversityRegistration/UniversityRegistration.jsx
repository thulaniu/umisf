import React, { useState } from "react";
import HeaderPage from "../../HeaderPage/HeaderPage";
import Footer from "../../HomePage/Footer/footer";
import styles from "./UniversityRegistration.module.css";
import MyDropzone from "../Common/MyDropzone/MyDropzone";

/* ================= VALIDATION HELPERS ================= */
const isValidName = (name) => /^[A-Za-z\s]+$/.test(name.trim());
const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

const emptyMember = { name: "", contact: "", regNo: "" };

export default function UniversityRegistration() {
  /* ================= STATES ================= */
  const [university, setUniversity] = useState("");
  const [category, setCategory] = useState("");
  const [teamName, setTeamName] = useState("");

  const [members, setMembers] = useState([]);
  const [current, setCurrent] = useState(emptyMember);
  const [editIndex, setEditIndex] = useState(null);

  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    contact: "",
    regNo: "",
  });

  const isMemberLimitReached = members.length >= 8;

  /* ================= FILE UPLOAD ================= */
  const handleImageDrop = (file) => {
    console.log("Uploaded file:", file);
  };

  /* ================= ADD / UPDATE MEMBER ================= */
  const addOrUpdateMember = () => {
    const errors = { name: "", contact: "", regNo: "" };

    if (!current.name) {
      errors.name = "Full name is required.";
    } else if (!isValidName(current.name)) {
      errors.name = "Only letters and spaces allowed.";
    }

    if (!current.contact) {
      errors.contact = "Contact number is required.";
    } else if (!isValidPhone(current.contact)) {
      errors.contact = "Must be exactly 10 digits.";
    }

    if (!current.regNo) {
      errors.regNo = "Registration number is required.";
    }

    setFieldErrors(errors);

    if (errors.name || errors.contact || errors.regNo) return;

    if (editIndex !== null) {
      const updated = [...members];
      updated[editIndex] = current;
      setMembers(updated);
      setEditIndex(null);
    } else {
      if (isMemberLimitReached) return;
      setMembers([...members, current]);
    }

    setCurrent(emptyMember);
    setFieldErrors({ name: "", contact: "", regNo: "" });
  };

  /* ================= EDIT / DELETE ================= */
  const editMember = (index) => {
    setCurrent(members[index]);
    setEditIndex(index);
  };

  const deleteMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  /* ================= REGISTER TEAM ================= */
  const handleRegisterTeam = () => {
    setError("");

    if (!university || !category || !teamName) {
      setError("Please select University, Category, and Team Name.");
      return;
    }

    if (members.length < 5) {
      setError("You must add at least 5 members to register the team.");
      return;
    }

    if (!agreed) {
      setError("You must agree to the tournament guidelines to register.");
      return;
    }

    alert("Team registered successfully!");
  };

  return (
    <>
      <HeaderPage />

      <main className={styles.pageWrapper}>
        <h1 className={styles.title}>Event Registration – University Team</h1>

        {/* ================= INFO CARD ================= */}
        <div className={styles.infoCard}>
          <p><strong>UMISF Badminton Championship</strong></p>

          <ul>
            <li>📍 MBA</li>
            <li>📅 26th – 2nd February 2026</li>
            <li>⏰ Entries close: 20th February 2026</li>
          </ul>

          <a
            href="/documents/UMISF_Badminton_Guidelines.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.guidelineLink}
          >
            📄 View Tournament Guidelines
          </a>

          <div className={styles.agreement}>
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="agree">
              I hereby agree to comply with the rules governing the tournament
              and the decision of the Tournament Committee.
            </label>
          </div>
        </div>

        {/* ================= FORM CARD ================= */}
        <div className={styles.formCard}>
          <div className={styles.grid}>
            <div>
              <label>University</label>
              <select value={university} onChange={(e) => setUniversity(e.target.value)}>
                <option value="">Select University</option>
                <option>University of Moratuwa</option>
                <option>University of Colombo</option>
                <option>University of Kelaniya</option>
                <option>University of Sri Jayewardenepura</option>
                <option>University of Ruhuna</option>
                <option>University of Jaffna</option>
                <option>University of Vavuniya</option>
                <option>University of the Visual & Performing Arts</option>
                <option>Eastern University of Sri Lanka</option>
                <option>Rajarata University of Sri Lanka</option>
                <option>Sabaragamuwa University of Sri Lanka</option>
                <option>Uva Wellassa University</option>
                <option>Wayamba University of Sri Lanka</option>
                <option>South Eastern University of Sri Lanka</option>
                <option>Gampaha Wickramarachchi University of Indigenous Medicine</option>
              </select>
            </div>

            <div>
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option>Men’s Team Championship</option>
                <option>Women’s Team Championship</option>
              </select>
            </div>

            <div>
              <label>Team Name</label>
              <select value={teamName} onChange={(e) => setTeamName(e.target.value)}>
                <option value="">Select Team</option>
                <option>Team A</option>
                <option>Team B</option>
              </select>
            </div>
          </div>

          <h3 className={styles.sectionTitle}>Team Members</h3>
          <p className={styles.helperText}>Minimum of 5 and maximum of 8 members per team</p>

          {/* ================= MEMBER INPUT ================= */}
          <div className={styles.memberInput}>
            <div>
              <input
                placeholder="Full Name"
                value={current.name}
                onChange={(e) =>
                  setCurrent({ ...current, name: e.target.value })
                }
              />
              {fieldErrors.name && (
                <span className={styles.fieldError}>{fieldErrors.name}</span>
              )}
            </div>

            <div>
              <input
                placeholder="Contact Number"
                value={current.contact}
                onChange={(e) =>
                  setCurrent({ ...current, contact: e.target.value })
                }
              />
              {fieldErrors.contact && (
                <span className={styles.fieldError}>{fieldErrors.contact}</span>
              )}
            </div>

            <div>
              <input
                placeholder="Registration Number"
                value={current.regNo}
                onChange={(e) =>
                  setCurrent({ ...current, regNo: e.target.value })
                }
              />
              {fieldErrors.regNo && (
                <span className={styles.fieldError}>{fieldErrors.regNo}</span>
              )}
            </div>

            <button
              className={styles.registerBtn}
              onClick={addOrUpdateMember}
              disabled={isMemberLimitReached && editIndex === null}
            >
              {editIndex !== null ? "Update Member" : "Add Member"}
            </button>
          </div>

          {members.map((m, i) => (
            <div key={i} className={styles.memberRow}>
              <span>{m.name}</span>
              <span>{m.contact}</span>
              <span>{m.regNo}</span>

              <div className={styles.actions}>
                <button className={styles.edit} onClick={() => editMember(i)}>
                  Edit
                </button>
                <button className={styles.delete} onClick={() => deleteMember(i)}>
                  Delete
                </button>
              </div>
            </div>
          ))}

          <div className={styles.paymentRow}>
            <div className={styles.paymentInfo}>
              <h4>Payment Details</h4>
              <p>Account Name: Badminton UOM</p>
              <p>Account Number: 85473940</p>
              <p>Branch: University of Moratuwa</p>
              <p><strong>Fee: Rs. 10,000.00</strong></p>
              <p><strong>Upload the payment slip as PDF</strong></p>
            </div>

            <div className={styles.uploadSection}>
              <MyDropzone onFileUploaded={handleImageDrop} />
            </div>
          </div>

          {error && <p className={styles.errorText}>{error}</p>}

          <div className={styles.registerWrapper}>
            <button className={styles.registerBtn} onClick={handleRegisterTeam}>
              Register Team
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
