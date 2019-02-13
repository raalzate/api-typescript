import { Service, Inject } from "typedi";
import {PlayListDao} from "../daos/PlayListDao";

@Service()
export class PlayListService{
  @Inject()
  playListDao:PlayListDao
  setId(barId:String){
    this.playListDao.setId(barId);
  }
  async addPlayListToBard(playlists:Array<PlayList>): Promise<any[]>{
    return await this.playListDao.addPlayListToBar(playlists);
  }
}