import {
    Param,
    Get,
    Post,
    Body,
    Put,
    QueryParams,
    JsonController
  } from "routing-controllers";
  import { Inject } from "typedi";
  import { PlayListService } from "../services/PlayListService";
  
  @JsonController("/playList")
  export class PlayListController {
    @Inject()
    playlistService: PlayListService;

  @Post("/:barId/add")
  async addPlayLists(@Param("barId") barId: String, @Body() body: Array<PlayList>) {
    if (!body&&body.length === 0) {
      return {
        error: "el arraglo de playlist no puede ir vacio"
      };
    }
    this.playlistService.setId(barId);
    return await this.playlistService.addPlayListToBard(body);
  }

  @Put("/:barId/:playList/add")
  async addSongsToPlayList(@Param("barId") barId: String, @Param("playList") playList: String, @Body() body: Array<String>){
    if (!body&&body.length === 0) {
      return {
        error: "el arraglo de Strings no puede ir vacio"
      };
    }
    this.playlistService.setId(barId);
    return await this.playlistService.addSongToPlayList(playList, body);
  }

}