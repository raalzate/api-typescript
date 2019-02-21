import { Service, Inject } from "typedi";
import { LivePlaylistDao } from "../daos/LivePlaylistDao";
import { LocalTrackService } from "../services/LocalTrackService";
import * as moment from "moment";
import TrackLive from "../entities/TrackLive";
import { PlayListService } from "./PlayListService";

@Service()
export class LivePlaylistService {
  @Inject()
  livePlaylistDao: LivePlaylistDao;

  @Inject()
  localTrackService: LocalTrackService;

  @Inject()
  playListService: PlayListService;

  setId(barId: String) {
    this.livePlaylistDao.setId(barId);
    this.localTrackService.setId(barId);
    this.playListService.setId(barId);
  }
  async createRamdomSongs() {
    let result: any = null;
    try {
      const localTracks: Array<
        LocalTrack
      > = await this.localTrackService.getRamdomSongs();
      const livePlaylist: any = this.createLivePlaylists(localTracks);
      result = await this.livePlaylistDao.update(livePlaylist);
    } catch (error) {
      console.log(error);
    }
    return result;
  }
  async createSongs() {
    let result: any = null;
    const params = {
      page: 1,
      limit: 100
    };
    try {
      const data: any = await this.localTrackService.getAllSongs(params);
      const localTracks: Array<LocalTrack> = data.tracks;
      const livePlaylist: any = this.createLivePlaylists(localTracks);
      result = await this.livePlaylistDao.update(livePlaylist);
    } catch (error) {
      console.log(error);
    }
    return result;
  }
  async createRamdomSongsByPlaylist(playListId: String) {
    let result: any = null;
    try {
      const localTracks: Array<
        LocalTrack
      > = await this.playListService.getRamdomSongsPlaylist(playListId);
      const livePlaylist: any = this.createLivePlaylists(localTracks);
      result = await this.livePlaylistDao.update(livePlaylist);
    } catch (error) {
      console.log(error);
    }
    return result;
  }
  async createSongsByPlaylist(playListId: String) {
    let result: any = null;
    const params = {
      skip: 0,
      limit: 100
    };
    try {
      const localTracks: Array<
        LocalTrack
      > = await this.playListService.getSongsPlaylist(playListId, params);
      const livePlaylist: any = this.createLivePlaylists(localTracks);
      result = await this.livePlaylistDao.update(livePlaylist);
    } catch (error) {
      console.log(error);
    }
    return result;
  }
  private createLivePlaylists(localTracks: Array<LocalTrack>): any {
    const livePlaylist: any = {};
    localTracks.forEach((localTrack: LocalTrack, index) => {
      const item: TrackLive = new TrackLive();
      const hrTime = process.hrtime();
      const microseconds = hrTime[0] * 1000000 + hrTime[1] / 1000;
      item.date = moment(new Date()).format("DD-MM-YYYY HH:mm:ss");
      if (localTrack.id) {
        item.microseconds = microseconds + index;
        item.localMedia = localTrack;
        item.id = localTrack.id;
        item.md5key = localTrack.id;
        item.state = "BID";
        livePlaylist[localTrack.id.toString()] = item;
      }
    });
    return livePlaylist;
  }
}
