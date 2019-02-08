import { Controller, Param, Get,Post,Body, QueryParams } from "routing-controllers";
import { Inject } from "typedi";
import { LocalTrackService } from "../services/LocalTrackService";

@Controller("/localTrack")
export class LocalTrackController {
  @Inject()
  userService: LocalTrackService;
  @Get("/:barId")
  async getAllSongs(@Param("barId") barId: String, @QueryParams() params: any) {
    if (params.page <= 0) {
      return {
        error: "el page tiene que ser mayor a 0"
      };
    }
    this.userService.setId(barId);
    const data: Array<LocalTrack> = await this.userService.getAllSongs(params);
    return data;
  }

  @Get("/:barId/search")
  async searchLocalTracks(@Param("barId") barId: String, @QueryParams() params: any) {
    if (params.page <= 0) {
      return {
        error: "el page tiene que ser mayor a 0"
      };
    }
    this.userService.setId(barId);
    const data: Array<LocalTrack> = await this.userService.searchLocalTracks(params);
    return data;
  }
}
