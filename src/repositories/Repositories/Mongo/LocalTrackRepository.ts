import { BaseMongoRepository } from "../../BaseRepositories/BaseMongoRepository";
import { Cursor } from "mongodb";

export default class LocalTrackRepository extends BaseMongoRepository<LocalTrack> {
  nameCollection: String = "localTrack";
  getAllLocalTracks(data: any): Promise<LocalTrack[]> {
    let cursorLocalTrack: Cursor<LocalTrack> = null;
    if (!data.web) {
      cursorLocalTrack = this.getAll({ private: false });
    } else {
      cursorLocalTrack = this.getAll({});
    }
    if (data.page !== undefined) {
      const page = parseInt(data.page);
      const pagesize = data.limit ? parseInt(data.limit) : 50;
      cursorLocalTrack.skip(pagesize * (page - 1)).limit(pagesize);
    }
    return cursorLocalTrack.toArray();
  }
  searchDeep(data: any): Promise<LocalTrack[]> {
    let cursorLocalTrack: Cursor<LocalTrack> = null;
    if (!data.web) {
      cursorLocalTrack = this.getAll({
        $text: { $search: data.search },
        private: false
      });
    } else {
      cursorLocalTrack = this.getAll({ $text: { $search: data.search } });
    }
    if (data.page !== undefined) {
      const page = parseInt(data.page);
      const pagesize = data.limit ? parseInt(data.limit) : 50;
      cursorLocalTrack.skip(pagesize * (page - 1)).limit(pagesize);
    }
    return cursorLocalTrack.toArray();
  }
}
