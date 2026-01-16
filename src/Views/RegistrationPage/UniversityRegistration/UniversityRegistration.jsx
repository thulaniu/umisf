import React, { useState } from "react";
import HeaderPage from "../../HeaderPage/HeaderPage";
import Footer from "../../HomePage/Footer/footer";
import ImageUploader from "../Common/imageUploader/ImageUploader";
import styles from "./UniversityRegistration.module.css";

const emptyMember = { name: "", contact: "", regNo: "" };

export default function UniversityRegistration() {
  // dropdown states
  const [university, setUniversity] = useState("");
  const [category, setCategory] = useState("");
  const [teamName, setTeamName] = useState("");

  // members
  const [members, setMembers] = useState([]);
  const [current, setCurrent] = useState(emptyMember);
  const [editIndex, setEditIndex] = useState(null);

  // image uploader
  const [fileList, setFileList] = useState([]);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");

  const isMemberLimitReached = members.length >= 8;

  const addOrUpdateMember = () => {
    if (!current.name || !current.contact || !current.regNo) return;

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
  };

  const editMember = (index) => {
    setCurrent(members[index]);
    setEditIndex(index);
  };

  const deleteMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <HeaderPage />

      {/* ================= PAGE BODY ================= */}
      <main className={styles.pageWrapper}>
        <h1 className={styles.title}>Event Registration – University Team</h1>

        {/* Info Card */}
        <div className={styles.infoCard}>
          <p>
            <strong>UMISF Badminton Championship</strong>
          </p>
          <ul>
            <li>📍 MBA</li>
            <li>📅 26th – 2nd February 2026</li>
            <li>⏰ Entries close: 20th February 2026</li>
          </ul>
        </div>

        {/* Form Card */}
        <div className={styles.formCard}>
          {/* Dropdowns */}
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
                <option>
                  Gampaha Wickramarachchi University of Indigenous Medicine
                </option>
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

          {/* Team Members */}
          <h3 className={styles.sectionTitle}>Team Members</h3>
          <p className={styles.helperText}>Maximum of 8 members per team</p>

          <div className={styles.memberInput}>
            <input
              placeholder="Full Name"
              value={current.name}
              onChange={(e) => setCurrent({ ...current, name: e.target.value })}
            />
            <input
              placeholder="Contact Number"
              value={current.contact}
              onChange={(e) => setCurrent({ ...current, contact: e.target.value })}
            />
            <input
              placeholder="Registration Number"
              value={current.regNo}
              onChange={(e) => setCurrent({ ...current, regNo: e.target.value })}
            />

            <button
              className={styles.registerBtn}
              onClick={addOrUpdateMember}
              disabled={isMemberLimitReached && editIndex === null}
            >
              {editIndex !== null ? "Update Member" : "Add Member"}
            </button>
          </div>

          {/* Members List */}
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

          {/* Payment + Upload */}
          <div className={styles.paymentRow}>
            <div className={styles.paymentInfo}>
              <h4>Payment Details</h4>
              <p>Account Name: Badminton UOM</p>
              <p>Account Number: 85473940</p>
              <p>Branch: University of Moratuwa</p>
              <p><strong>Fee: Rs. 10,000.00</strong></p>
            </div>

            <div className={styles.uploadSection}>
              <ImageUploader
                fileList={fileList}
                setFileList={setFileList}
                setImage={setImage}
                setImageName={setImageName}
                isfile={true}
              />
            </div>
          </div>

          {/* Register Button */}
          <div className={styles.registerWrapper}>
            <button align="center"className={styles.registerBtn}>Register Team</button>
          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <Footer />
    </>
  );
}
