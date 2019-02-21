import {
    JsonController,
    Put,
    Param
  } from "routing-controllers";
  
  import { Inject } from "typedi";
  import { LivePlaylistService } from "../services/LivePlaylistService";
  
@JsonController("/LivePlaylist")
export class LivePlaylistController{
  @Inject()
  livePlaylistService: LivePlaylistService;

  
  @Put("/:barId")
  async createLivePlaylistByLocalTracks(
    @Param("barId") barId: String
  ) {
     this.livePlaylistService.setId(barId)
     const result=await this.livePlaylistService.createSongs();
     return result;
  }

  @Put("/:barId/:playlistId")
  async createLivePlaylistByPlaylist(
    @Param("barId") barId: String,
    @Param("playlistId") playlistId: String
  ) {
     this.livePlaylistService.setId(barId)
     const result=await this.livePlaylistService.createSongsByPlaylist(playlistId);
     return result;
  }


  @Put("/random/:barId")
  async createRamdomLivePlaylistByLocalTracks(
    @Param("barId") barId: String
  ) {
     this.livePlaylistService.setId(barId)
     const result=await this.livePlaylistService.createRamdomSongs();
     return result;
  }

  @Put("/random/:barId/:playlistId")
  async createRamdomLivePlaylistByPlaylist(
    @Param("barId") barId: String,
    @Param("playlistId") playlistId: String
  ) {
     this.livePlaylistService.setId(barId)
     const result=await this.livePlaylistService.createRamdomSongsByPlaylist(playlistId);
     return result;
  }

}