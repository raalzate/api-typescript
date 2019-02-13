import { BaseMongoRepository } from "../../BaseRepositories/BaseMongoRepository";
import { Cursor } from "mongodb";


export default class PlayListRepository extends BaseMongoRepository<PlayList>{
    nameCollection: String = "playList";
    
    
}