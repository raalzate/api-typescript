import { RepositoryMongo } from "../annotations/repository";
import LocalTrackRepository from "../repositories/Repositories/Mongo/LocalTrackRepository";
import { Service } from "typedi";
import { WriteError } from "mongodb";

@Service()
export class LocalTrackDao {
  @RepositoryMongo()
  localTrackRepository: LocalTrackRepository;

  setId(barId: String) {
    this.localTrackRepository.setId(barId);
  }

  async getAllSong(data: any): Promise<any> {
    let tracks: Array<LocalTrack> = null;
    let error: any = null;
    try {
      tracks = await this.localTrackRepository.getAllLocalTracks(data);
    } catch (err) {
      error = err;
    }
    return {
      tracks,
      error
    };
  }

  async search(data: any): Promise<any> {
    let tracks: Array<LocalTrack> = null;
    let error: any = null;
    try {
      tracks = await this.localTrackRepository.searchDeep(data);
    } catch (err) {
      error = err;
    }
    return {
      tracks,
      error
    };
  }
  async saveMassive(localTracks: Array<LocalTrack>): Promise<any[]> {
    let resultMongo: Array<any> = await this.localTrackRepository.saveMassive(localTracks);
    return resultMongo;
  }
  getRegisterSongs(error: any, localTracks: Array<LocalTrack>) {
    const resDataArray: Array<any> = [];
    if (error.result.nInserted > 0) {
      localTracks.forEach((track: LocalTrack) => {
        const resError: any = error.result.writeErrors.find(
          (element: WriteError) => localTracks[element.index].id === track.id
        );
        if (!resError) {
          resDataArray.push({
            id: track.id,
            insert: "OK",
            err: null
          });
        }
      });
    }
    return resDataArray;
  }
  getNotRegisterSongs(error: any, localTracks: Array<LocalTrack>) {
    const resultMongo: Array<any> = [];
    error.result.writeErrors.forEach((element: WriteError) => {
      const index = element.index;
      resultMongo.push({
        id: localTracks[index].id,
        insert: "FAIL",
        err: this.localTrackRepository.getCode(element.code)
      });
    });
    return resultMongo;
  }

  async privateSong(data: any): Promise<any> {
    return await this.localTrackRepository.updateMany(
      { _id: { $in: data.tracks } },
      { $set: { private: data.private } }
    );
  }
}
