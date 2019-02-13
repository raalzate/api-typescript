import { Service, Inject } from "typedi";
import {PlayListDao} from "../daos/PlayListDao";

@Service()
export class PlayListService{
  @Inject()
  playListDao:PlayListDao
  setId(barId:String){
    this.playListDao.setId(barId);
  }
}