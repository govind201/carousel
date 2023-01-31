export const authEndpoint = 'https://accounts.spotify.com/authorize';
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = '68d0c9e07d2d4f4dae29f3b00f6f1805';



const scopes = [
  'user-read-private',
  'user-read-email',
  'user-top-read',
  'user-modify-playback-state',
  'playlist-modify-public'
];

export const getTokenFromResponse = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      var parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};


let redirectUri = 'https://spotify-carousel.netlify.app';
// let redirectUri = 'http://localhost:3000';
// let PROD_REDIRECT_URI = 'https://spotify-carousel.netlify.app/carousel';
//  let PROD_REDIRECT_URI = 'https://carousel-react-app.herokuapp.com';
// if(process.env.REACT_APP_ENVIRONMENT === 'PROD') {
    //  redirectUri = PROD_REDIRECT_URI;
//  }





export const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}&response_type=token&show_dialog=true`;