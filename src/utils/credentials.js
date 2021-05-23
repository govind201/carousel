// import queryString from 'query-string';
export const authEndpoint = 'https://accounts.spotify.com/authorize';
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = '68d0c9e07d2d4f4dae29f3b00f6f1805';
const redirectUri = 'http://localhost:3000/carousel';
const scopes = [
  'user-read-private',
  'user-read-email',
  'user-top-read',
  'user-modify-playback-state',
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

// export const getTokenFromResponse = () => {
//   var hash = window.location.hash;
//   const access_token = new URLSearchParams(hash).get('access_token');
//   alert(access_token);
//   return access_token;
// };

export const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}&response_type=token&show_dialog=true`;
