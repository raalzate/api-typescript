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
  addPlayListToBar(data: any):Promise<PlayList> {
    return new Promise<any>((resolve, reject) => {
        this.playListRepository
          .updateMany(
            { _id: { $in: data._id } },
            { $set: { private: data.private } }
          )
          .then(data => {
            resolve(data.result);
          })
          .catch(err => {
            reject(err.error);
          });
      });

}
}