import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

export default function DenseAppBar() {
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

          <Typography variant="h6" color="inherit" component="div" margin={2}>
            Crousal
          </Typography>
          <Typography variant="h6" color="inherit" component="div" margin={2}>
            TopArtists
          </Typography>
          <Typography variant="h6" color="inherit" component="div" margin={2}>
            TopTracks
          </Typography>
          <Typography variant="h6" color="inherit" component="div" margin={2}>
            Favourites
          </Typography>
          <Typography variant="h6" color="inherit" component="div" margin={2}>
            graphs
          </Typography>
          <Typography variant="h6" color="inherit" component="div" margin={2}>
            Disable
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
