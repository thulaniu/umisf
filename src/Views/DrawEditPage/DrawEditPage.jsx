import { Grid } from "@mui/material";
import { useState } from "react";
import EditableDraw from "./EditableDraw";


export default function DrawEditPage(){

    const [rounds,setRounds] = useState([
        {
          title: 'Round one',
          seeds: [
            {
              id: 0,
              date: new Date().toDateString(),
              teams: [{ name: '-' }, { name: '-' }],
              teamId: [null, null]

    
            },
            {
              id: 1,
              date: new Date().toDateString(),
              teams: [{ name: '-' }, { name: '-' }],
              teamId: [null, null]
            },
            {
              id: 2,
              date: new Date().toDateString(),
              teams: [{ name: '-' }, { name: '-' }],
              teamId: [null, null]
            },
            {
              id: 3,
              date: new Date().toDateString(),
              teams: [{ name: '-' }, { name: '-' }],
              teamId: [null, null]
            },
          ],
        }
      ]);

      const [players,setPlayers] = useState([{id: 1, name: 'player1'}, {id: 2, name: 'player2'}, {id: 3, name: 'player3'}, {id: 4, name: 'player4'}, 
      {id: 5, name: 'player5'},{id: 6, name: 'player6'},{id: 7, name: 'player7'},{id: 8, name: 'player8'}]);

      const [addedPlayers,setAddedPlayers] = useState([]);

    return (
        <Grid container justifyContent='center'>
            <Grid item>
                <EditableDraw rounds={rounds} players={players} setRounds={setRounds} setPlayers={setPlayers} addedPlayers={addedPlayers} setAddedPlayers={setAddedPlayers}/>
            </Grid>
        </Grid>
    )
}