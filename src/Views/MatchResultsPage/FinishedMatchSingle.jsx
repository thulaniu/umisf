import React from "react";
import Styles from "./FinishedMatchSingle.module.css";
import { Table } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import { determineWinningRounds } from "./helpers/determineWinningRounds";

const FinishedMatchSingle = (props) => {

    return (
        <div className={`${Styles["container"]} align-items-center`}>
        <div className={`${Styles["card"]} align-items-center`}>
          <div className={`${Styles["card-header"]} row`}>
            <div
              className={`${Styles["card-title"]} col ${Styles["dp-container"]}`}
            >
              <img
                src={props.obj.playerOne.player.photo}
                alt={props.obj.playerOne.player.firstName + " " + props.obj.playerOne.player.lastName}
                className={`${Styles["dp"]} ${Styles["dp-left"]}`}
              />
            </div>
            <div
              className={`${Styles["card-title"]} ${Styles["trapezoid-left"]} `}
            >
              <div className={`${Styles["winning"]} text-center `}>
                {" "}
                <h3 className={`${Styles["winning-rounds"]} ${Styles["fadeIn"]}`}>{determineWinningRounds(props.obj)[0]} </h3>{" "}
              </div>
            </div>
            <div className={`${Styles["card-title"]} col`}></div>
            <div
              className={`${Styles["card-title"]} ${Styles["trapezoid-right"]}`}
            >
              <div className={`${Styles["winning"]} text-center `}>
                {" "}
                <h3 className={`${Styles["winning-rounds"]} ${Styles["fadeIn"]}`}>{determineWinningRounds(props.obj)[1]}</h3>{" "}
              </div>
            </div>
            <div
              className={`${Styles["card-title"]} ${Styles["dp-container"]} col`}
            >
              <img
                src={props.obj.playerTwo.player.photo}
                alt={props.obj.playerTwo.player.firstName + " " + props.obj.playerTwo.player.lastName}
                className={`${Styles["dp"]} ${Styles["dp-right"]}`}
              />
            </div>
          </div>
    
          <div className={`${Styles["table-container"]} ${Styles["fadeIn"]} row align-items-center`}>
            <Table size="sm" className={`${Styles["table"]} text-center`}>
              <thead>
                <tr>
                  <th>{props.obj.playerOne.player.firstName + " " + props.obj.playerOne.player.lastName}</th>
                  <th>Vs</th>
                  <th>{props.obj.playerTwo.player.firstName + " " + props.obj.playerTwo.player.lastName}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{props.obj.matchResult.teamOneScores[0]}</td>
                  <td>Round 1</td>
                  <td>{props.obj.matchResult.teamTwoScores[0]}</td>
                </tr>
                <tr>
                  <td>{props.obj.matchResult.teamOneScores[1]}</td>
                  <td>Round 2</td>
                  <td>{props.obj.matchResult.teamTwoScores[1]}</td>
                </tr>
                <tr>
                  <td>{props.obj.matchResult.teamOneScores[2] == null ? '-': props.obj.matchResult.teamOneScores[2]}</td>
                  <td>Round 3</td>
                  <td>{props.obj.matchResult.teamTwoScores[2] == null ? '-': props.obj.matchResult.teamTwoScores[2]}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        </div>
      );
    };

export default FinishedMatchSingle;