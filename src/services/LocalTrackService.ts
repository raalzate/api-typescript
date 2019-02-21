import { Service, Inject } from "typedi";
import { LocalTrackDao } from "../daos/LocalTrackDao";

@Service()
export class LocalTrackService {
  @Inject()
  localTrackDao: LocalTrackDao;
  setId(barId: String) {
    this.localTrackDao.setId(barId);
  }
  getAllSongs(data: any): Promise<LocalTrack[]> {
    return this.localTrackDao.getAllSong(data);
  }
  searchLocalTracks(data: any): Promise<LocalTrack[]> {
    return this.localTrackDao.search(data);
  }
  async registerLocalTracks(localTracks: Array<LocalTrack>):Promise<any> {
    let dataLocal:Array<any> = [];
    for (let i = 0; i < localTracks.length; i += 30000) {
      const newLocalTracks = localTracks.slice(i, (i+30000));
      const data = await this.localTrackDao.saveMassive(newLocalTracks);
      dataLocal = dataLocal.concat(data);
    }
    return dataLocal;
  }
  privateSong(data:any):Promise<number>{
    return this.localTrackDao.privateSong(data)
  }
  getRamdomSongs(): Promise<LocalTrack[]>{
    return  this.localTrackDao.getRamdomSongs();
  }
  async deleteMassive(idsTracksToDelete: Array<String>):Promise<any> {
    return await this.localTrackDao.deleteMassive(idsTracksToDelete);
  }
}
