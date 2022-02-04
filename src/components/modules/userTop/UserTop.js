import React from "react";
import Login from "../../pages/Login";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Fade from "react-reveal/Fade";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    background: "rgb(238,174,202)",
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 48,
    padding: "0 30px",
  },
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const UserTop = ({ token, topArtists, topTracks }) => {
  console.log(
    "topArtists array in UserTop.js",
    topArtists,
    "topTracks in userTop",
    topTracks
  );

  const classes = useStyles();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item>
              <Fade left big>
                <Typography
                  variant="h4"
                  style={{ fontWeight: 600 }}
                  className={classes.root}
                >
                  Top Artists
                </Typography>
              </Fade>
              {!token && <Login from="usertop.js" />}
              {topArtists.map((item) => (
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start" key={item.uri}>
                    <ListItemAvatar>
                      <Avatar alt="Cindy Baker" src={item.images[0].url} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {item.genres[0]}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              ))}
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Fade right big>
                <Typography
                  variant="h4"
                  style={{ fontWeight: 600 }}
                  className={classes.root}
                >
                  Top Tracks
                </Typography>
              </Fade>
              {!token && <Login from="usertop.js" />}
              {topTracks.map((item) => (
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start" key={item.uri}>
                    <ListItemAvatar>
                      <Avatar
                        alt="Cindy Baker"
                        src={item.album.images[0].url}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            By - {item.artists[0].name}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              ))}
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default UserTop;
