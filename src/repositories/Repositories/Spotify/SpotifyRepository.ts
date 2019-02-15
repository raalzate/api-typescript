import BaseSpotifyRepository from "../../BaseRepositories/BaseSpotifyRepository";

export class SpotifyRepository extends BaseSpotifyRepository {
  async getAllPlaylist(): Promise<any> {
    let playlists: Array<any> = [];
    let index = 0;
    let nextSong: boolean = true;
    while (nextSong) {
      const data = await this.getPlaylists({
        offset: index,
        limit: 50
      });
      const items = data.body.items;
      playlists = playlists.concat(items);
      if (data.body.next !== null) {
        index += 50;
      } else {
        nextSong = false;
      }
    }
    return playlists;
  }

  deletePlaylist(idPlaylist: String) {
    return this.callWs({
      method: "delete",
      url: this.apiBaseUrl + `/playlists/${idPlaylist}/followers`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.accesToken}`
      }
    });
  }

  async getCurrentUser(): Promise<any> {
    let user = null;
    try {
      const data = await this.spotifyApi.getMe();
      user=data.body;
    } catch (error) {
        console.log(error);
    }
    return user;
  }

  getDevices() {
    return this.callWs({
      method: "get",
      url: this.apiBaseUrl + "/me/player/devices",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.accesToken}`
      }
    });
  }

  async searchSong(search:string): Promise<Array<any>> {
    let tracks:any=[];
    const data:any=await this.callWs({
      method: "get",
      url: this.apiBaseUrl + `/search?q=${encodeURI(search)}&type=artist%2Ctrack`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.accesToken}`
      }
    });
    if(data&&data.tracks&&data.tracks.items&&data.tracks.items.length>0){
        tracks=data.tracks.items;
    }
    return tracks;
  }

  getPlaylists(options: any): Promise<any> {
    return this.spotifyApi.getUserPlaylists(this.userId, {
      offset: options.offset ? options.offset : 0,
      limit: options.limit ? options.limit : 50
    });
  }
}
