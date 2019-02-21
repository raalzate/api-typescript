const IS_DEV: Boolean = true;
const serviceAccountKeyDev = require("./repositories/KeysFirebase/serviceAccountKeyDev.json");
const serviceAccountKeyProd = require("./repositories/KeysFirebase/serviceAccountKey.json");

let contants = {
  FB_CONFIG: serviceAccountKeyDev,
  SPOTIFY_CREDENTIAL: {
    clientId: "572051bf303d4881ace14e67d7b74aa5",
    clientSecret: "c879a843246744e6ad5009f00c8e052c",
    clientBase64:
      "NTcyMDUxYmYzMDNkNDg4MWFjZTE0ZTY3ZDdiNzRhYTU6Yzg3OWE4NDMyNDY3NDRlNmFkNTAwOWYwMGM4ZTA1MmM=",
    redirectUri: "http://localhost:8385/api/SpotifySync/redirect-url"
  },
  URL_API_SPOTIFY: "https://api.spotify.com/v1",
  URL_AUTH_SPOTIFY: "https://accounts.spotify.com/api",
  DATABASE_URL: "https://dju-developer.firebaseio.com"
};

if (!IS_DEV) {
  contants = {
    FB_CONFIG: serviceAccountKeyProd,
    SPOTIFY_CREDENTIAL: {
      clientId: "2ecd0c0227bd485089bef916b2dd14bb",
      clientSecret: "b8490f0745ab4fa89c1649c2dc484701",
      clientBase64:
        "MmVjZDBjMDIyN2JkNDg1MDg5YmVmOTE2YjJkZDE0YmI6MDI4NmYzOGNhODhlNGZkM2JmZDJjMThiY2NmYTU3ZWU=",
      redirectUri: "http://104.248.233.122/api/SpotifySync/redirect-url"
    },
    URL_API_SPOTIFY: "https://api.spotify.com/v1",
    URL_AUTH_SPOTIFY: "https://accounts.spotify.com/api",
    DATABASE_URL: "https://dju-media-prod.firebaseio.com"
  };
}

export { contants };
