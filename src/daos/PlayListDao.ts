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
  async addPlayListToBar(playlists: Array<PlayList>): Promise<any[]> {
    return await this.playListRepository.saveMassive(playlists);
  }
  async addSongToPlayList(
    idPlayList: String,
    tracks: Array<String>
  ): Promise<any> {
    return await this.playListRepository.update(idPlayList, {
      $push: { songs: { $each: tracks } }
    });
  }
  async deletePlaylist(idPlayList: String): Promise<any> {
    return await this.playListRepository.delete(idPlayList);
  }
  async getPlayList(idPlayList: String): Promise<PlayList> {
    return await this.playListRepository.getOnlyOne(idPlayList);
  }
  async getAllPlayList(): Promise<PlayList[]> {
    return await this.playListRepository
      .aggregate([
        { $project: { _id: 0, id: 1, name: 1, size: { $size: "$songs" } } }
      ])
      .toArray();
  }
  getSongsPlaylist(idPlaylist:String,params: String){
    return  this.playListRepository.getSongsPlaylist(idPlaylist,params)
  }
  getRamdomSongsPlaylist(idPlaylist:String){
    return  this.playListRepository.getRamdomSongsPlaylist(idPlaylist)
  }
}
