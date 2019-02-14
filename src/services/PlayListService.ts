import { Service, Inject } from "typedi";
import {PlayListDao} from "../daos/PlayListDao"
import {LocalTrackDao} from "../daos/LocalTrackDao"

@Service()
export class PlayListService{
  @Inject()
  playListDao:PlayListDao

  @Inject()
  localTrackDao:LocalTrackDao


  setId(barId:String){
    this.playListDao.setId(barId);
  }
  async addPlayListToBard(playlists:Array<PlayList>): Promise<any[]>{
    return await this.playListDao.addPlayListToBar(playlists);
  }
  async addSongToPlayList(idPlayList: String, tracks:Array<String>): Promise<any>{
    return await this.playListDao.addSongToPlayList(idPlayList, tracks);
  } 
  async deletePlayList(idPlayList: String): Promise<any>{
    const playList: PlayList =  await this.playListDao.getPlayList(idPlayList)
    await this.localTrackDao.deleteMassive(playList.songs)
    return await this.playListDao.deletePlaylist(idPlayList)
  }
  async getPlayLists():Promise<PlayList[]>{
    return await this.playListDao.getAllPlayList()
  }
  
}