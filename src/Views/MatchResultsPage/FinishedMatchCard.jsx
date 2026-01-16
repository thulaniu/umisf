import React from "react";
import Styles from "./FinishedMatchCard.module.css";
import player1 from "./temp_img/LeeChongWei.jpg";
import player2 from "./temp_img/lin_dan.webp";
import { Table } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import { determineWinningRounds } from "./helpers/determineWinningRounds";
import FinishedMatchSingle from "./FinishedMatchSingle";
import FinishedMatchDouble from "./FinishedMatchDouble";


const FinishedMatchCard = () => {

    let location = useLocation();
    let {obj} = location.state;
   

  return (
    <>
    {(obj.matchCategory == 'Single') ?<FinishedMatchSingle obj={obj}/>: <FinishedMatchDouble obj={obj}/> } 
    
    </>
  );
};

export default FinishedMatchCard;
