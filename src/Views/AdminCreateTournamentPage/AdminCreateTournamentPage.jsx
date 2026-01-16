import React, { useState } from "react";
import { Form, Input } from "reactstrap";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import ProfileHeader from '../ProfileHeader/ProfileHeader'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import styles from "./adminCreateTournamentPage.module.css";
import ImageUploader from "../RegistrationPage/Common/imageUploader/ImageUploader";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, ageGroup, theme) {
  return {
    fontWeight:
      ageGroup.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AdminCreateTournamentPage = () => {
  const [newTournament, setNewTournament] = useState({
    startingDate: "",
    description: "",
    flyers: [],
  });

  const [ageGroups, setAgeGroups] = useState([
    "Under 9",
    "Under 11",
    "Under 13",
    "Under 15",
    "Under 17",
    "Under 19",
    "Under 21",
    "University",
    "Company",
  ]);

  const [fileListFront, setFileListFront] = useState([]);
  const [fileListBack, setFileListBack] = useState([]);


  const theme = useTheme();
  const [ageGroup, setAgeGroup] = useState([]);

  const handleChange = (e) => {
    setAgeGroup(
      // On autofill we get a stringified value.
      typeof e.target.value === "string"
        ? e.target.value.split(",")
        : e.target.value
    );
  };

  const createTournament = (e)=>{
    e.preventDefault()
    console.log(newTournament)
    console.log(ageGroup)
  }

  return (
    <div className={`${styles["tournament-container"]}`}>

      <ProfileHeader user_type={"admin"} />
      <AdminNavbar page="tournament" />

      <div className={`${styles["main-title"]}`}>
        <a href="/admin/tournament">Tournament</a>
      </div>
      <div className={`${styles["main-title"]}`}>Create a Tournament</div>
      <div className={`${styles["form-container"]}`}>
        <Form onSubmit={createTournament}>
          <div className={`${styles["form-field-container"]}`}>
            <div className={`${styles["form-field-name"]}`}>Starting Date</div>
            <div className={`${styles["form-field-value"]}`}>
              <input
                type="date"
                className={`${styles["form-input"]}`}
                value={newTournament.startingDate}
                placeholder="Enter starting date.."
                onChange={(e) =>
                  setNewTournament({
                    ...newTournament,
                    startingDate: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <hr />

          <div className={`${styles["form-field-container"]}`}>
            <div className={`${styles["form-field-name"]}`}>Description</div>
            <div className={`${styles["form-field-value"]}`}>
              <textarea
                rows={4}
                cols={50}
                className={`${styles["form-input"]}`}
                value={newTournament.description}
                placeholder="Enter your description here.."
                onChange={(e) =>
                  setNewTournament({
                    ...newTournament,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <hr />

          <div className={`${styles["form-field-container"]}`}>
            <div className={`${styles["form-field-name"]}`}>Age groups</div>
            <div className={`${styles["form-field-value"]}`}>
              <FormControl sx={{ m: 1 }} fullWidth>
                <Select
                  sx={{
                    boxShadow: "none",
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    padding: "0",
                    fontFamily: "Hind",
                  }}
                  id="demo-multiple-chip"
                  size="small"
                  multiple
                  value={ageGroup}
                  onChange={handleChange}
                  className={`${styles["form-input"]}`}
                  placeholder="Select the age groups here.."
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {ageGroups.map((agegroup) => (
                    <MenuItem
                      key={agegroup}
                      value={agegroup}
                      style={getStyles(agegroup, ageGroup, theme)}
                    >
                      {agegroup}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <hr />

          <div className={`${styles["form-field-container"]}`}>
            <div className={`${styles["form-field-name"]}`}>T shirt</div>
            <div className={`${styles["form-field-value-tshirt"]}`}>
              <div className={`${styles["t-shirt"]}`}>
              <div className={`${styles["t-shirt-label"]}`}>Front</div>
                <ImageUploader
                  fileList={fileListFront}
                  setFileList={setFileListFront}
                />
              </div>
              <div className={`${styles["t-shirt"]}`}>
              <div className={`${styles["t-shirt-label"]}`}>Back</div>
                <ImageUploader
                  fileList={fileListBack}
                  setFileList={setFileListBack}
                />
              </div>
            </div>
          </div>
          <hr />

          <div className={`${styles["form-field-container"]}`}>
            <div className={`${styles["form-field-name"]}`}>Flyers</div>
            <div className={`${styles["form-field-value"]}`}>
              <input
                multiple
                type="file"
                className={`${styles["form-input"]}`}
                value={newTournament.flyers}
                placeholder="Enter your description here.."
                onChange={(e) =>
                  setNewTournament({
                    ...newTournament,
                    flyers: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <hr />
          <button className={`${styles["form-submit-button"]}`}>Save</button>
        </Form>
      </div>
    </div>
  );
};

export default AdminCreateTournamentPage;
