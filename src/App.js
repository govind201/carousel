import React, { useReducer } from "react";
import "./App.css";
import Login from "./components/pages/Login";
import AudioFeatures from "./utils/AudioFeautures";
import { getTokenFromResponse } from "./utils/credentials";
import Nav from "./components/pages/nav";
import Flash from "react-reveal/Flash";
import Wobble from "react-reveal/Wobble";
import RubberBand from "react-reveal/RubberBand";

function App() {
  const [token, setToken] = React.useState("");
  const [user, setUser] = React.useState({
    user: "",
    userId: "",
  });
  React.useEffect(() => {
    let hash = getTokenFromResponse();
    window.location.hash = "";
    let tokenFromUrl = hash.access_token;
    if (!tokenFromUrl) return console.log("err NO TOKEN FOUND");
    setToken(tokenFromUrl);
    localStorage.setItem("token", token);
    console.log(token);
    return () => {
      localStorage.removeItem(token);
    };
  }, [token]);
  React.useEffect(() => {
    if (!token) return null;
    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from me in app.js", data);
        setUser({ userId: data.id, user: data.display_name, ...data });
      })
      .catch((error) => console.log(error));
  }, [token]);
  console.log(user);
  console.log("the user is  "   ,user.display_name)
  const isToken = token ? <p>Yes, they have token</p> : <p>No, they don't </p>;
  return (
    <>
      <div class="body gradient-bg">
        {!token && <Login from="app.js" />}
        {token && user.userId && (
          <div>
            <Nav />

            <div>
              <Flash>
                <h3>{isToken}</h3>
              </Flash>
            </div>

            <div className="head">
              <div>
                <RubberBand >
                  <h1>WELCOME TO CAROUSEL {user.display_name}</h1>
                </RubberBand>
                <Wobble>
                  <h2>All the music you  need</h2>
                </Wobble>
              </div>
            </div>

            <AudioFeatures token={token} userId={user.userId} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;

