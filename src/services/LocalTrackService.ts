import { Service, Inject } from "typedi";
import {LocalTrackDao} from "../daos/LocalTrackDao";

@Service()
export class LocalTrackService{
  @Inject()
  localTrackDao:LocalTrackDao
  setId(barId:String){
    this.localTrackDao.setId(barId);
  }
  getAllSongs(data:any):Promise<LocalTrack[]>{
    return this.localTrackDao.getAllSong(data)
  }
  searchLocalTracks(data:any):Promise<LocalTrack[]>{
    return this.localTrackDao.search(data)
  }
}