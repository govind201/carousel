import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import Button from "@mui/material/Button";

export default function DenseAppBar() {
  const buttonClick = () => {
    console.log("iam  clicked here twow times");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#2E3B55" }}>
        <Toolbar variant="regular">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <LibraryMusicIcon style={{ fontSize: 50 }} />
          </IconButton>

          <Typography margin={2}>
            <Button variant="contained" onClick={buttonClick}>
              Crousal
            </Button>
          </Typography>
          <Typography margin={2}>
            <Button variant="contained" onClick={buttonClick}>
              graph
            </Button>
          </Typography>
          <Typography margin={2}>
            <Button variant="contained" onClick={buttonClick}>
              topTracks
            </Button>
          </Typography>
          <Typography margin={2}>
            <Button variant="contained" onClick={buttonClick}>
              TopArtist
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
