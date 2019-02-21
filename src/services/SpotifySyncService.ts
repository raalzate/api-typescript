import { Service, Inject } from "typedi";
import {SpotifySyncDao} from "../daos/SpotifySyncDao";

@Service()
export class SpotifySyncService{
    @Inject()
    spotifySyncDao: SpotifySyncDao;

    setId(barId: String) {
        this.spotifySyncDao.setId(barId);
    }

    getSyncRepository():Promise<any>{
        return  this.spotifySyncDao.getSyncRepository(); 
    }
    setCode(code:String):Promise<any>{
        return this.spotifySyncDao.setCode(code);
    }


}