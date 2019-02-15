import {
  Param,
  Get,
  Post,
  Body,
  Put,
  QueryParams,
  JsonController,
  Delete
} from "routing-controllers";
import { Inject } from "typedi";
import { PlayListService } from "../services/PlayListService";

@JsonController("/playList")
export class PlayListController {
  @Inject()
  playlistService: PlayListService;

  @Post("/:barId/add")
  async addPlayLists(
    @Param("barId") barId: String,
    @Body() body: Array<PlayList>
  ) {
    if (!body && body.length === 0) {
      return {
        error: "el arraglo de playlist no puede ir vacio"
      };
    }
    this.playlistService.setId(barId);
    return await this.playlistService.addPlayListToBard(body);
  }

  @Put("/:barId/:playList/add")
  async addSongsToPlayList(
    @Param("barId") barId: String,
    @Param("playList") playList: String,
    @Body() body: Array<String>
  ) {
    if (!body && body.length === 0) {
      return {
        error: "el arraglo de Strings no puede ir vacio"
      };
    }
    this.playlistService.setId(barId);
    return await this.playlistService.addSongToPlayList(playList, body);
  }

  @Delete("/:barId/:playListId")
  async deletePlayList(
    @Param("barId") barId: String,
    @Param("playListId") playListId: String
  ) {
    if (!barId && !playListId) {
      return {
        error: "los parametros no pueden venir nulos"
      };
    }
    this.playlistService.setId(barId);
    return await this.playlistService.deletePlayList(playListId);
  }
  @Get("/:barId")
  async getPlayLists(@Param("barId") barId: String) {
    if (!barId) {
      return {
        error: "los parametros no pueden venir nulos"
      };
    }
    this.playlistService.setId(barId);
    return await this.playlistService.getPlayLists();
  }
  @Get("/:barId/:playListId")
  async getQuerySongsPlaylist(
    @Param("barId") barId: String,
    @Param("playListId") playListId: String,
    @QueryParams() params: any
  ) {
    if (!barId && !playListId) {
      return {
        error: "los parametros no pueden venir nulos"
      };
    }
    this.playlistService.setId(barId);
    return await this.playlistService.getSongsPlaylist(playListId,params);
  }
}
