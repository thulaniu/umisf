import React from "react";
import Styles from "./OngoingMatchCard.module.css";
import player1 from "./temp_img/LeeChongWei.jpg";
import player2 from "./temp_img/lin_dan.webp";
import {Table} from "react-bootstrap";

const OngoingMatchcard = (props) => {
  const match = {
    match_id: "123456",
    age_group: "U: 9",
    type: "Boys' single",
    time: "10:00 AM",
    date: "2022-01-03",
    player_1: {
      player_id: "111",
      player_name: "Lee C. Wei",
      player_dp: player1,
    },
    player_2: {
      player_id: "222",
      player_name: "Lin Dan",
      player_dp: player2,
    },
    round_1: { player_1_score: 21, player_2_score: 18 },
    round_2: { player_1_score: 15, player_2_score: 15 },
    round_3: { player_1_score: 0, player_2_score: 0 },
    number_of_rounds: 2,
    winner_id: "111",
  };

  return (
    <div className={`${Styles["card"]} border border-3 border-light`}>
      <div className={`${Styles["title"]}`}>
        <div className={`${Styles["t-age"]} text-center`} style={{ fontSize: "1.5vw",marginTop:"0.4vw" }}>
          {match.age_group}
        </div>
        <div className={`${Styles["t-type"]} text-center`} style={{ fontSize: "1.5vw",marginTop:"0.4vw" }}>{match.type}</div>
      </div>

      <div className={`${Styles["details"]} `}>
        <div className={`${Styles["d-player1"]}`}>
          <p style={{ height: "1vw", fontSize: "1vw" , marginTop:"0.4vw"}} className="text-center">
            {match["player_1"]["player_name"]}
          </p>
          <img
            src={match["player_1"]["player_dp"]}
            alt={match["player_1"]["player_name"]}
            className={`${Styles["dp"]}`}
          />
        </div>
        <div className={`${Styles["d-player2"]} `}>
          <p style={{ height: "1vw", fontSize: "1vw",marginTop:"0.4vw" }} className="text-center">
            {match["player_2"]["player_name"]}
          </p>
          <div className={`${Styles["dp"]} d-flex`}>
          <img
            src={match["player_2"]["player_dp"]}
            alt={match["player_2"]["player_name"]}
            className={`${Styles["dp-left"]} img-fluid`}
          />
          </div>

        </div>
      </div>
      <div className={`${Styles["results"]} `}>
      <Table size="sm" className={`${Styles["table"]} text-center`} >
          <tbody >
            <tr>
              <td style={{fontSize:"1vw"}}></td>
              <td style={{fontSize:"1vw"}}></td>
              <td style={{fontSize:"1vw"}}></td>
            </tr>
            <tr>
              <td style={{fontSize:"1vw"}}>{match["round_1"]["player_1_score"]}</td>
              <td style={{fontSize:"1vw"}}>Round 1</td>
              <td style={{fontSize:"1vw"}}>{match["round_1"]["player_2_score"]}</td>
            </tr>
            <tr>
              <td style={{fontSize:"1vw"}}>{match["round_2"]["player_1_score"]}</td>
              <td style={{fontSize:"1vw"}}>Round 2</td>
              <td style={{fontSize:"1vw"}}>{match["round_2"]["player_2_score"]}</td>
            </tr>
            <tr>
              <td style={{fontSize:"1vw"}}>{match["round_3"]["player_1_score"]}</td>
              <td style={{fontSize:"1vw"}}>Round 3</td>
              <td style={{fontSize:"1vw"}}>{match["round_3"]["player_2_score"]}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default OngoingMatchcard;
