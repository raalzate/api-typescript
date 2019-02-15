const SpotifyWebApi = require("spotify-web-api-node");
const ClientRest = require("node-rest-client").Client;

import { contants } from "../../contants";

import { DataUtil } from "../Utils/DataUtil";

const spotifyCredential = contants.SPOTIFY_CREDENTIAL;


const scopes = [
  "user-read-private",
  "user-read-email",
  "playlist-read-collaborative",
  "user-read-currently-playing",
  "user-modify-playback-state",
  "playlist-modify-public",
  "user-library-read",
  "playlist-read-private",
  "user-read-recently-played",
  "user-read-playback-state",
  "playlist-modify-private"
];

export default class BaseSpotifyRepository {
  barId: String = "";
  accesToken:String="";
  refreshToken:String="";
  userId: String = "";
  apiBaseUrl:String=contants.URL_API_SPOTIFY;
  authUrl:String=contants.URL_AUTH_SPOTIFY;
  
  spotifyApi = new SpotifyWebApi(spotifyCredential);
  client = new ClientRest();
  setId(barId: String): void {
    this.barId = barId;
  }
  setRefresToken(refreshToken:String){
      this.refreshToken=refreshToken;
  }

  callWs(options: any) {
    return new Promise<any>((resolve, reject) => {
      this.client[options.method](
        options.url,
        {
          headers: options.headers,
          data: options.body
        },
        (data: any, response: any) => {
          resolve(data);
        }
      );
    });
  }
  getUrlIntegration() {
    const state = {
      data: {
        barId: this.barId
      }
    };
    return this.spotifyApi.createAuthorizeURL(
      scopes,
      DataUtil.encodeBase64(JSON.stringify(state))
    );
  }
  async refreshAccessToken(): Promise<any> {
    const token = await this.callWs({
      method: "post",
      url: this.authUrl + "/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + spotifyCredential.clientBase64
      },
      body: {
        grant_type: "refresh_token",
        refresh_token: this.refreshToken,
        redirect_uri: spotifyCredential.redirectUri
      }
    });
    this.accesToken=token.access_token;
    this.spotifyApi.setAccessToken(token.access_token);
    try {
      const data = await this.spotifyApi.getMe();
      this.userId=data.body.id;
    } catch (error) {
        console.log(error);
    }
  }
}