import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import {
  SingleEliminationBracket,
  SVGViewer,
} from "@g-loot/react-tournament-brackets";

/* ---------------- CUSTOM MATCH ---------------- */

const CustomMatch = ({ match }) => {
  const p1 = match.participants?.[0];
  const p2 = match.participants?.[1];

  const score1 = p1?.score || [];
  const score2 = p2?.score || [];

  const winnerId = match.winnerId;

  const rowStyle = (isWinner) => ({
    backgroundColor: isWinner ? "#495283" : "#1a1d2e",
    padding: "4px",
    marginBottom: "2px",
    borderRadius: "4px",
    color: "white",
  });

  const scoreBox = {
    width: "15%",
    textAlign: "center",
    borderLeft: "1px solid #adb3d1",
  };

  return (
    <div style={{ width: 160, fontSize: "11px" }}>
      {/* TEAM 1 */}
      <div style={rowStyle(p1?.id === winnerId)}>
        {score1.length ? (
          <Grid container>
            <Grid item sx={{ width: "55%" }}>
              {p1?.name || "NO TEAM"}
            </Grid>
            {score1.map((s, i) => (
              <Grid key={i} item sx={scoreBox}>
                {s}
              </Grid>
            ))}
          </Grid>
        ) : (
          p1?.name || "NO TEAM"
        )}
      </div>

      {/* TEAM 2 */}
      <div style={rowStyle(p2?.id === winnerId)}>
        {score2.length ? (
          <Grid container>
            <Grid item sx={{ width: "55%" }}>
              {p2?.name || "NO TEAM"}
            </Grid>
            {score2.map((s, i) => (
              <Grid key={i} item sx={scoreBox}>
                {s}
              </Grid>
            ))}
          </Grid>
        ) : (
          p2?.name || "NO TEAM"
        )}
      </div>
    </div>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */

export default function Draw(props) {
  const { rounds } = props;
  const [titleIndex, setTitleIndex] = useState(0);

  const titles = rounds.map((round) => round.title);

  return (
    <Grid container>
      {/* MOBILE ROUND SELECTOR */}
      <Grid
        sx={{ display: { md: "none", xs: "flex" } }}
        item
        container
        xs={12}
        justifyContent="center"
        mt={1}
        gap={1}
      >
        {titles.map((title, index) => (
          <Button
            key={index}
            sx={{ backgroundColor: "#1a1d2e" }}
            variant={index === titleIndex ? "contained" : "outlined"}
            onClick={() => setTitleIndex(index)}
          >
            {title}
          </Button>
        ))}
      </Grid>

      {/* BRACKET */}
      <Grid item container xs={12} mt={1}>
        <SingleEliminationBracket
          matches={rounds}
          matchComponent={CustomMatch}
          svgWrapper={({ children, ...props }) => (
            <SVGViewer {...props}>{children}</SVGViewer>
          )}
        />
      </Grid>
    </Grid>
  );
}
