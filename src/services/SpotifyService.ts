import { Service, Inject } from "typedi";
import { SpotifyDao } from "../daos/SpotifyDao";
import {SpotifySyncRepositoryDao} from "../daos/SpotifySyncRepositoryDao";

@Service()
export class SpotifyService {
  @Inject()
  spotifyDao: SpotifyDao;

  @Inject()
  syncRepositoryDao: SpotifySyncRepositoryDao;

  setId(barId: String) {
    this.spotifyDao.setId(barId);
    this.syncRepositoryDao.setId(barId);
  }

  async getPlaylists():Promise<any>{
    const spotifySync:any = await this.syncRepositoryDao.getSyncRepository();
    this.spotifyDao.setRefreshToken(spotifySync.token.refresh_token);
    return this.spotifyDao.getPlaylist();
  }

  async getUser():Promise<any>{
    const spotifySync:any = await this.syncRepositoryDao.getSyncRepository();
    this.spotifyDao.setRefreshToken(spotifySync.token.refresh_token);
    return this.spotifyDao.getCurrentUser();
  }

  async getDevices(): Promise<any> {
    const spotifySync:any = await this.syncRepositoryDao.getSyncRepository();
    this.spotifyDao.setRefreshToken(spotifySync.token.refresh_token);
    return this.spotifyDao.getDevices();
  }

  async search(searchSong:string): Promise<Array<TrackSpotify>> {
    const spotifySync:any = await this.syncRepositoryDao.getSyncRepository();
    this.spotifyDao.setRefreshToken(spotifySync.token.refresh_token);
    return this.spotifyDao.searchSong(searchSong);
  }


}