import React from "react";
import { authUrl } from "../../utils/credentials";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import Button from "@mui/material/Button";
import "./static/Login.css";
import { makeStyles } from '@mui/styles';

const Login = ({ from }) => {
  const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
  });
  

  const classes = useStyles();


  return (

    <div className="main">
      <Typography
        mb={2}
        style={{ fontSize: 55 }}
        variant="h4"
        gutterBottom
        component="div"
      >
        <LibraryMusicIcon style={{ fontSize: 50 }} /> Carousal
      </Typography>

      

      <Button className={classes.root}>
      <Link href={authUrl} style={{ textDecoration: 'none',color : 'white' }}>LOGIN WITH SPOTIFY,{from}</Link>
      </Button>
    </div>
  );
};

export default Login;
