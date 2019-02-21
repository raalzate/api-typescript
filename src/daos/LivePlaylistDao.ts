import { RepositoryFirebase } from "../annotations/repository";
import LivePlaylistRepository from "../repositories/Repositories/Firebase/LivePlaylistRepository";
import { Service } from "typedi";

@Service()
export class LivePlaylistDao {
  @RepositoryFirebase()
  livePlaylistRepository: LivePlaylistRepository;

  setId(barId: String) {
    this.livePlaylistRepository.setId(barId);
  }

  update(object:any): Promise<void>{
    return this.livePlaylistRepository.updateMany(object);
  }

}