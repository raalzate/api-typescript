import { RepositoryMongo } from "../annotations/repository";
import { WriteOpResult } from "mongodb";
import PlayListRepository from "../repositories/Repositories/Mongo/PlayListRepository";
import { Service } from "typedi";

@Service()
export class PlayListDao {
  @RepositoryMongo()
  playListRepository: PlayListRepository;

  setId(barId: String) {
    this.playListRepository.setId(barId);
  }
  async addPlayListToBar(playlists:Array<PlayList>): Promise<any[]>{
    return await this.playListRepository.saveMassive(playlists);
  }
  async addSongToPlayList(idPlayList: String, tracks:Array<String>): Promise<any>{
    return await this.playListRepository.update(idPlayList,{ $push: { songs: { $each: tracks } } });
  }
  async deletePlaylist(idPlayList:String): Promise<any>{
    return await this.playListRepository.delete(idPlayList)
  }
}