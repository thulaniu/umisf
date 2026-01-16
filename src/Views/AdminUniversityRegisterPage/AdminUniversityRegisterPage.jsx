import React, { useEffect, useState } from "react";
import { Form, Input } from "reactstrap";
import { useParams } from "react-router-dom";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import styles from "./adminUniversityRegisterPage.module.css";
import ImageUploader from "../RegistrationPage/Common/imageUploader/ImageUploader";

const AdminUniversityRegisterPage = () => {
  let { year } = useParams();

  const [fileListPhoto, setFileListPhoto] = useState([]);

  const [newUniversity, setNewUniversity] = useState({
    name: "",
    gender: "",
    contactNumber: "",
    paymentMethod: "",
    paymentSlip: "",
  });

  const [players, setPlayers] = useState([
    {
      firstName: "",
      lastName: "",
      gender: "",
      profileImage: [],
    },
    {
      firstName: "",
      lastName: "",
      gender: "",
      profileImage: [],
    },
    {
      firstName: "",
      lastName: "",
      gender: "",
      profileImage: [],
    },
  ]);

  const createUniversity = (e) => {
    e.preventDefault();
    console.log(newUniversity);
    console.log(players);
    console.log(fileListPhoto);
  };

  const enterPlayerDetails = (index, e) => {
    let exitingPlayers = [...players];
    exitingPlayers[index][e.target.name] = e.target.value;
    setPlayers(exitingPlayers);
  };

  const addNewRow = (e) => {
    e.preventDefault();
    setPlayers([
      ...players,
      { firstName: "", lastName: "", gender: "", profileImage: [] },
    ]);
  };

  return (
    <div className={`${styles["tournament-container"]}`}>
      <ProfileHeader user_type={"admin"} />
      <AdminNavbar page="universities" />
      <div className={`${styles["main-title"]}`}>
        <a href="/admin/universities">Universities</a>
        <img
          src={require("../../assests/images/forward_arrow.png")}
          alt=""
        />{" "}
        <a href={"/admin/universities/year/" + year}>{year}</a>
      </div>
      <div className={`${styles["main-title"]}`}>Register a university</div>
      <div className={`${styles["form-container"]}`}>
        <Form onSubmit={createUniversity}>
          <div className={`${styles["form-field-container"]}`}>
            <div className={`${styles["form-field-name"]}`}>
              Name of the university
            </div>
            <div className={`${styles["form-field-value"]}`}>
              <input
                type="text"
                className={`${styles["form-input"]}`}
                value={newUniversity.name}
                placeholder="Enter name.."
                onChange={(e) =>
                  setNewUniversity({
                    ...newUniversity,
                    name: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <hr />
          <div className={`${styles["form-field-container"]}`}>
            <div className={`${styles["form-field-name"]}`}>Gender</div>
            <div className={`${styles["form-field-value"]}`}>
              <input
                type="text"
                className={`${styles["form-input"]}`}
                value={newUniversity.gender}
                placeholder="Enter the gender.."
                onChange={(e) =>
                  setNewUniversity({
                    ...newUniversity,
                    gender: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <hr />
          <div className={`${styles["form-field-container"]}`}>
            <div className={`${styles["form-field-name"]}`}>Contact number</div>
            <div className={`${styles["form-field-value"]}`}>
              <input
                type="text"
                className={`${styles["form-input"]}`}
                value={newUniversity.contactNumber}
                placeholder="Enter your contact number.."
                onChange={(e) =>
                  setNewUniversity({
                    ...newUniversity,
                    contactNumber: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <hr />
          <div className={`${styles["form-field-container"]}`}>
            <div className={`${styles["form-field-name"]}`}>Players</div>
            <div className={`${styles["form-field-value"]}`}>
              <table className="table" style={{ background: "#f7f7fe" }}>
                <thead>
                  <tr>
                    <th className={`${styles["table-cell"]}`} scope="col">
                      #
                    </th>
                    <th className={`${styles["table-cell"]}`} scope="col">
                      First Name
                    </th>
                    <th className={`${styles["table-cell"]}`} scope="col">
                      Last Name
                    </th>
                    <th className={`${styles["table-cell"]}`} scope="col">
                      Gender
                    </th>
                    <th className={`${styles["table-cell"]}`} scope="col">
                      Profile photo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player, i) => (
                    <tr>
                      <th
                        className={`${styles["table-cell"]} pr-0`}
                        scope="row"
                      >
                        {i + 1}
                      </th>
                      <td className={`${styles["table-cell"]} pl-1 pr-1`}>
                        <input
                          type="text"
                          className={`${styles["form-input"]}`}
                          value={player["firstName"]}
                          name="firstName"
                          placeholder="Enter your first name.."
                          onChange={(e) => enterPlayerDetails(i, e)}
                        />
                      </td>
                      <td className={`${styles["table-cell"]} pl-1 pr-1`}>
                        <input
                          type="text"
                          className={`${styles["form-input"]}`}
                          value={player["lastName"]}
                          name="lastName"
                          placeholder="Enter your last name.."
                          onChange={(e) => enterPlayerDetails(i, e)}
                        />
                      </td>

                      <td className={`${styles["table-cell"]} pl-1 pr-1`}>
                        <select
                          class="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          className={`${styles["form-input"]}`}
                          name="gender"
                          defaultValue={"default"}
                          onChange={(e) => enterPlayerDetails(i, e)}
                        >
                          <option value={"default"}>
                            Select your gender..
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </td>
                      <td className={`${styles["table-cell"]}`}>
                        <div className={`${styles["t-shirt"]}`}>
                          <ImageUploader
                            fileList={fileListPhoto}
                            setFileList={setFileListPhoto}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className={`${styles["add-row"]}`} onClick={addNewRow}>
                <img src={require("../../assests/images/add.png")} alt="" />{" "}
                {"Add new row"}
              </button>
            </div>
          </div>
          <hr />
          <div className={`${styles["form-field-container"]}`}>
            <div className={`${styles["form-field-name"]}`}>Payment method</div>
            <div className={`${styles["form-field-value"]}`}>
              <select
                class="form-select form-select-sm"
                aria-label=".form-select-sm example"
                className={`${styles["form-input"]}`}
                name="paymentMethod"
                defaultValue={"default"}
                onChange={(e) =>
                  setNewUniversity({
                    ...newUniversity,
                    paymentMethod: e.target.value,
                  })
                }
              >
                <option value={"default"}>Select your payment method..</option>
                <option value="On-site">On-site</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>
          </div>
          <hr />
          {newUniversity["paymentMethod"] == "Bank Transfer" && (
            <div>
              <div className={`${styles["form-field-container"]}`}>
                <div className={`${styles["form-field-name"]}`}>
                  Payment Slip
                </div>
                <div className={`${styles["form-field-value"]}`}>
                  <input
                    multiple
                    type="file"
                    className={`${styles["form-input"]}`}
                    onChange={(e) =>
                      setNewUniversity({
                        ...newUniversity,
                        paymentSlip: e.target.files[0],
                      })
                    }
                  />
                </div>
              </div>
              <hr />
            </div>
          )}
          <button className={`${styles["form-submit-button"]}`}>Save</button>
        </Form>
      </div>
    </div>
  );
};

export default AdminUniversityRegisterPage;
