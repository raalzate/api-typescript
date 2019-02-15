import { BaseFirebaseRepository } from "../../BaseRepositories/BaseFirebaseRepository";

export default class SpotifySyncRepository extends BaseFirebaseRepository<SpotifySync>{
    nameCollection: String = "spotifySync";
}