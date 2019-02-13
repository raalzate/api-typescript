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
}