import { Service } from "typedi";
import { RepositorySpotify } from "../annotations/repository";
import { SpotifyRepository } from "../repositories/Repositories/Spotify/SpotifyRepository";
import { DataUtil } from "../repositories/Utils/DataUtil";

import TrackSpotify from "../entities/TrackSpotify";

@Service()
export class SpotifyDao {
  @RepositorySpotify()
  spotify: SpotifyRepository;

  setId(barId: String) {
    this.spotify.setId(barId);
  }
  setRefreshToken(refreshToken: String) {
    this.spotify.setRefresToken(refreshToken);
  }
   
  getUrlSpotify(): String {
    return this.spotify.getUrlIntegration();
  }


  async getPlaylist(): Promise<any> {
    await this.spotify.refreshAccessToken();
    const playlists = await this.spotify.getAllPlaylist();
    return playlists.map((element: any) => ({
      id: element.id,
      name: element.name,
      private: false,
      size: element.tracks.total
    }));
  }
  async deletePlaylist(playlistId:String): Promise<any> {
    await this.spotify.refreshAccessToken();
    return this.spotify.deletePlaylist(playlistId);
  }

  async getCurrentUser(): Promise<any> {
    await this.spotify.refreshAccessToken();
    return this.spotify.getCurrentUser();
  }

  async getDevices(): Promise<any> {
    await this.spotify.refreshAccessToken();
    return this.spotify.getDevices();
  }
  
  async searchSong(searchSong:string): Promise<Array<TrackSpotify>> {
    await this.spotify.refreshAccessToken();
    let songs:Array<TrackSpotify>=[];
    songs=await this.spotify.searchSong(searchSong);
    if (songs.length > 0) {
        songs=songs.map((song:any)=>{
          return DataUtil.mapDataSpotify(song);
        });
    }
    return songs;
  }


}
