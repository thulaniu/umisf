import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  rectIntersection,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import {
  Grid,
  Typography,
  Popover,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useState } from "react";
import {
  SingleEliminationBracket,
  SVGViewer,
} from "@g-loot/react-tournament-brackets";

import Draggable from "./Draggable";
import Droppable from "./Droppable";

/* ---------------- CUSTOM MATCH ---------------- */

const CustomMatch = ({ match }) => {
  return (
    <div
      style={{
        background: "#1a1d2e",
        color: "white",
        padding: "6px",
        borderRadius: "6px",
        fontSize: "11px",
        width: "140px",
      }}
    >
      <Droppable id={match.id * 2}>
        <div style={{ padding: "4px" }}>
          {match.participants?.[0]?.name || "NO TEAM"}
        </div>
      </Droppable>

      <Droppable id={match.id * 2 + 1}>
        <div style={{ padding: "4px" }}>
          {match.participants?.[1]?.name || "NO TEAM"}
        </div>
      </Droppable>
    </div>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */

export default function EditableDraw(props) {
  const {
    rounds,
    players,
    setRounds,
    setPlayers,
    addedPlayers,
    setAddedPlayers,
  } = props;

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  /* ---------------- PLAYER CARD ---------------- */

  function playerCard(player) {
    return (
      <Draggable id={player.id} key={player.id}>
        <Grid
          onClick={(event) => {
            setSelectedIndex(player.id);
            setAnchorEl(event.currentTarget);
          }}
          item
          container
          sx={{
            width: "100%",
            height: "40px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1a1d2e",
            color: "white",
            mb: 1,
            cursor: "pointer",
          }}
        >
          <Typography sx={{ fontSize: "11px" }}>
            {player.name || "NO TEAM"}
          </Typography>
        </Grid>

        <Popover
          open={selectedIndex === player.id}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Card sx={{ maxWidth: 300 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://via.placeholder.com/300"
            />
            <CardContent>
              <Typography variant="h6">
                Player Profile - {player.name}
              </Typography>
              <Typography variant="body2">
                Profile component goes here 🙂
              </Typography>
            </CardContent>
          </Card>
        </Popover>
      </Draggable>
    );
  }

  /* ---------------- DRAG END ---------------- */

  function onDragEnd({ over, active }) {
    if (!over) return;

    const matchId = Math.floor(over.id / 2);
    const teamIndex = over.id % 2;

    const newTeam = players.find((p) => p.id === active.id);
    if (!newTeam) return;

    const newPlayers = players.filter((p) => p.id !== active.id);

    const newRounds = [...rounds];
    const match = newRounds[0].matches[matchId];

    const oldTeam = match.participants[teamIndex];

    match.participants[teamIndex] = {
      id: newTeam.id,
      name: newTeam.name,
    };

    if (oldTeam?.id) {
      newPlayers.push(oldTeam);
    }

    setPlayers(newPlayers);
    setRounds(newRounds);
  }

  /* ---------------- DND SENSOR ---------------- */

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 5,
      },
    })
  );

  /* ---------------- RENDER ---------------- */

  return (
    <Grid container mt={2} justifyContent="center">
      <DndContext
        sensors={sensors}
        onDragEnd={onDragEnd}
        collisionDetection={rectIntersection}
        modifiers={[restrictToWindowEdges]}
      >
        {/* LEFT - PLAYERS */}
        <Grid item xs={12} md={3}>
          {players.map((player) => playerCard(player))}
        </Grid>

        {/* RIGHT - BRACKET */}
        <Grid item xs={12} md={9}>
          <SingleEliminationBracket
            matches={rounds}
            matchComponent={CustomMatch}
            svgWrapper={({ children, ...props }) => (
              <SVGViewer {...props}>{children}</SVGViewer>
            )}
          />
        </Grid>
      </DndContext>
    </Grid>
  );
}
