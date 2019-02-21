
import { Service } from "typedi";
import SpotifySyncRepository from "../repositories/Repositories/Firebase/SpotifySyncRepository";
import { RepositoryFirebase } from "../annotations/repository";
import * as admin from "firebase-admin";

@Service()
export class SpotifySyncDao {
  @RepositoryFirebase()
  spotifySyncRepository:SpotifySyncRepository;
   
  setId(barId: String) {
    this.spotifySyncRepository.setId(barId);
  }
  async getSyncRepository(): Promise<admin.database.DataSnapshot>{
    return await this.spotifySyncRepository.getOnlyOne();
  }
  setCode(code:String): Promise<void>{
    return this.spotifySyncRepository.save({code});
  }
}