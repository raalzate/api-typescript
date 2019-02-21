import { Service, Inject } from "typedi";
import { SpotifyDao } from "../daos/SpotifyDao";
import TrackSpotify from "../entities/TrackSpotify";
import { SpotifySyncService } from "./SpotifySyncService";

@Service()
export class SpotifyService {
  @Inject()
  spotifyDao: SpotifyDao;
   
  @Inject()
  spotifySyncService:SpotifySyncService

  setId(barId: String) {
    this.spotifyDao.setId(barId);
    this.spotifySyncService.setId(barId);
  }

  getUrlIntegration():any{
    return this.spotifyDao.getUrlSpotify();
  }

  async getPlaylists():Promise<any>{
    const spotifySync:any = await this.spotifySyncService.getSyncRepository();
    this.spotifyDao.setRefreshToken(spotifySync.token.refresh_token);
    return this.spotifyDao.getPlaylist();
  }

  async getUser():Promise<any>{
    const spotifySync:any = await this.spotifySyncService.getSyncRepository();
    this.spotifyDao.setRefreshToken(spotifySync.token.refresh_token);
    return this.spotifyDao.getCurrentUser();
  }

  async getDevices(): Promise<any> {
    const spotifySync:any = await this.spotifySyncService.getSyncRepository();
    this.spotifyDao.setRefreshToken(spotifySync.token.refresh_token);
    return this.spotifyDao.getDevices();
  }

  async search(searchSong:string): Promise<Array<TrackSpotify>> {
    const spotifySync:any = await this.spotifySyncService.getSyncRepository();
    this.spotifyDao.setRefreshToken(spotifySync.token.refresh_token);
    return this.spotifyDao.searchSong(searchSong);
  }


}