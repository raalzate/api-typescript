import { BaseFirebaseRepository } from "../../BaseRepositories/BaseFirebaseRepository";
import TrackLive from "../../../entities/TrackLive";

export default class LivePlaylistRepository extends BaseFirebaseRepository<TrackLive>{
    nameCollection: String = "livePlaylist";
}