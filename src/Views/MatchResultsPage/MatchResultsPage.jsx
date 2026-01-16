import React from "react";
//import FinishedMatchCard from './FinishedMatchCard';
import ResultRow from "./ResultRow";
import ResultRowDouble from "./ResultRowDouble";
import Styles from "./MatchResultsPage.module.css";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import OngoingMatchcard from "./OngoingMatchcard";
import { Link } from "react-router-dom";
import { fontSize } from "@mui/system";
import {schoolFinishedMatches} from './finishedMatches';
const MatchResultsPage = () => {
  
  const ages = ["Under 9", "Under 11", "Under 13", "Under 15", "Under 17", "Under 19"];
  const types = [
    "Boys' Single",
    "Girls' Single",
    "Boys' Double",
    "Girls' Double",
    "Company",
    "University",
  ];
  const dates = ["2023-02-13", "2022-01-02", "2022-01-03", "2022-01-03"];

  const [tempFinishedMatches, setTempFinishedMtches] =
    useState(schoolFinishedMatches);
  const [ageFilter, setAgeFilter] = useState("Age");
  const [typeFilter, setTypeFilter] = useState("Type");
  const [dateFilter, setDateFilter] = useState("Date");

  const [filterdAges, setFilteredAges] = useState([]);
  const [filterdTypes, setFilteredTypes] = useState(schoolFinishedMatches);
  const [filterdDates, setFilteredDates] = useState([]);

  function handleAgeFilter(e) {
    const id = parseInt(e.target.id);
    var tempArray = schoolFinishedMatches;
    tempArray =
      typeFilter !== "All" && typeFilter !== "Type"
        ? tempArray.filter((match) => {
            return (match.matchType + `' ` + match.matchCategory) === typeFilter;
          })
        : tempArray;
    // console.log(tempArray);
    tempArray =
      dateFilter !== "All" && dateFilter !== "Date"
        ? tempArray.filter((match) => {
            return match.date === dateFilter;
          })
        : tempArray;
    // console.log(tempArray);
    id >= 0 ? setAgeFilter(ages[id]) : setAgeFilter("All");
    if (id >= 0) {
      tempArray = tempArray.filter((match) => {
        return match.ageGroup === ages[id];
      });
    }
    //console.log(tempArray);
    setTempFinishedMtches(tempArray);
    //console.log(tempArray);
  }

  function handleTypeFilter(e) {
    const id = parseInt(e.target.id);
    var tempArray = schoolFinishedMatches;

    //console.log(tempArray);
    tempArray =
      ageFilter !== "All" && ageFilter !== "Age"
        ? tempArray.filter((match) => {
            return match.ageGroup === ageFilter;
          })
        : tempArray;
    //console.log(tempArray);
    tempArray =
      dateFilter !== "All" && dateFilter !== "Date"
        ? tempArray.filter((match) => {
            return match.date === dateFilter;
          })
        : tempArray;
    //console.log(tempArray);
    id >= 0 ? setTypeFilter(types[id]) : setTypeFilter("All");
    if (id >= 0) {
      tempArray = tempArray.filter((match) => {
        return (match.matchType + `' ` + match.matchCategory) === types[id];
      });
    }
    //console.log(tempArray);
    setTempFinishedMtches(tempArray);
    //console.log(tempArray);
  }

  function handleDateFilter(e) {
    const id = parseInt(e.target.id);
    var tempArray = schoolFinishedMatches;
    //console.log(tempArray);
    tempArray =
      ageFilter !== "All" && ageFilter !== "Age"
        ? tempArray.filter((match) => {
            return match.ageGroup === ageFilter;
          })
        : tempArray;
    //console.log(tempArray);
    tempArray =
      typeFilter !== "All" && typeFilter !== "Type"
        ? tempArray.filter((match) => {
            return (match.matchType + `' ` + match.matchCategory) === typeFilter;
          })
        : tempArray;
    //console.log(tempArray);
    id >= 0 ? setDateFilter(dates[id]) : setDateFilter("All");
    if (id >= 0) {
      tempArray = tempArray.filter((match) => {
        return match.scheduledDate === dates[id];
      });
    }

    // console.log(tempArray);
    setTempFinishedMtches(tempArray);
    //console.log(tempArray);
  }

  return (
    
    <div className={`${Styles["body"]}`}>

          <div className={`${Styles["header"]}`}>
            <div className={`${Styles["title"]} `}>
              <h2 style={{fontFamily:"overlock",fontSize:"35pt"}}>Match Results</h2>
            </div>
            
              <div className={`btn-group`}>
                <Dropdown className={`${Styles["select-container"]} `}>
                  <Dropdown.Toggle
                    variant="primary"
                    id="dropdown-basic"
                    className={`${Styles["select-btn"]}`}
                  >
                    <span  className={`${Styles["span-font"]} `}>{ageFilter}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className={`${Styles["select-menu"]}`}>
                    <Dropdown.Item onClick={handleAgeFilter} name="age" id="-1">
                      All
                    </Dropdown.Item>

                    {ages?.map((age, index) => {
                      return (
                        <Dropdown.Item
                          onClick={handleAgeFilter}
                          name="age"
                          id={index}
                        >
                          {age}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className={`${Styles["select-container"]} `}>
                  <Dropdown.Toggle
                    variant="primary"
                    id="dropdown-basic"
                    className={`${Styles["select-btn"]}`}
                  >
                    <span className={`${Styles["span-font"]} `}>{typeFilter}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className={`${Styles["select-menu"]}`}>
                    <Dropdown.Item
                      onClick={handleTypeFilter}
                      name="type"
                      id="-1"
                    >
                      All
                    </Dropdown.Item>
                    {types?.map((type, index) => {
                      return (
                        <Dropdown.Item
                          onClick={handleTypeFilter}
                          name="type"
                          id={index}
                        >
                          {type}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown className={`${Styles["select-container"]} `}>
                  <Dropdown.Toggle
                    variant="primary"
                    id="dropdown-basic"
                    className={`${Styles["select-btn"]}`}
                  >
                    <span className={`${Styles["span-font"]} `}>{dateFilter}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className={`${Styles["select-menu"]}`}>
                    <Dropdown.Item
                      onClick={handleDateFilter}
                      name="date"
                      id="-1"
                    >
                      All
                    </Dropdown.Item>

                    {dates?.map((date, index) => {
                      return (
                        <Dropdown.Item
                          onClick={handleDateFilter}
                          name="date"
                          id={index}
                        >
                          {date}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            
          </div>
          

          <div className={`${Styles["container"]}`}>
            {tempFinishedMatches?.map((match, index) => {
              return (
                match.matchCategory != 'Double'?
                <Link
                  to={`../match-results/${match.id}`}
                  state={{ obj: match }}
                  key={index}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ResultRow key={index} match={match} />
                </Link>
                :                 <Link
                to={`../match-results/${match.id}`}
                state={{ obj: match }}
                key={index}
                style={{ textDecoration: "none", color: "black" }}
              >
                <ResultRowDouble key={index} match={match} />
              </Link>
              );
            })}
          </div>
   

      {/* <div className={`${Styles["ongoing-match-result-section"]} col`}>
        Ongoing matches
        {ongoingMatches?.map((match, index) => {
          return <OngoingMatchcard match={match} key={index} />;
        })}
      </div> */}
    </div>
    
  );
};

export default MatchResultsPage;
