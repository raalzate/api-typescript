import { BaseMongoRepository } from "../../BaseRepositories/BaseMongoRepository";
import { Cursor } from "mongodb";
import { QueryUtil } from "../../Utils/QueryUtil";

export default class PlayListRepository extends BaseMongoRepository<PlayList> {
  nameCollection: String = "playLists";

  getSongsPlaylist(idPlaylist: String, params: any): Promise<any[]> {
    const res = this.aggregate(this.getQuerySongsPlaylist(idPlaylist, params));
    return res.toArray();
  }

  getRamdomSongsPlaylist(idPlaylist: String):  Promise<any[]> {
    const res = this.aggregate(this.getQueryRamdomSongsPlaylist(idPlaylist));
    return res.toArray();
  }

  private getQueryRamdomSongsPlaylist(idPlaylist: String) {
    const query = QueryUtil.getQuery("songPlaylists");
    query[0]["$match"]["_id"] = idPlaylist;
    query[2]["$lookup"]["from"] = "localTrack_" + this.id;
    query.push({ $sample: { size: 100 } });
    query.push({ $skip: 0 });
    query.push({ $limit: 100 });
    return query;
  }

  private getQuerySongsPlaylist(idPlaylist: String, options: any) {
    const query = QueryUtil.getQuery("songPlaylists");
    query[0]["$match"]["_id"] = idPlaylist;
    query[2]["$lookup"]["from"] = "localTrack_" + this.id;
    query.push({ $skip: parseInt(options.skip) });
    query.push({ $limit: parseInt(options.limit) });
    return query;
  }
}
