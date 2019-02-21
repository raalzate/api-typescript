import { BaseFirebaseRepository } from "../../BaseRepositories/BaseFirebaseRepository";
import SpotifySync from "../../../entities/SpotifySync";

export default class SpotifySyncRepository extends BaseFirebaseRepository<SpotifySync>{
    nameCollection: String = "spotifySync";
}