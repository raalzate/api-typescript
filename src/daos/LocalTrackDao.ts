import { RepositoryMongo } from "../annotations/repository";
import LocalTrackRepository from "../repositories/Repositories/Mongo/LocalTrackRepository";
import { Service } from "typedi";

@Service()
export class LocalTrackDao{
    @RepositoryMongo()
    localTrackRepository:LocalTrackRepository;

    setId(barId:String){
        this.localTrackRepository.setId(barId);
    }

    async getAllSong(data:any):Promise<any>{
       let tracks:Array<LocalTrack>=null;
       let error:any=null;
      try {
        tracks=await this.localTrackRepository.getAllLocalTracks(data);  
      } catch (err) {
          error=err;
      }
      return {
        tracks,
        error
      };  
    }
    
    async search(data:any):Promise<any>{
        let tracks:Array<LocalTrack>=null;
        let error:any=null;
       try {
         tracks=await this.localTrackRepository.searchDeep(data);  
       } catch (err) {
           error=err;
       }
       return {
         tracks,
         error
       };  
    }

}