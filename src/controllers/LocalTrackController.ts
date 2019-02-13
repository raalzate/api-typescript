import {
  Param,
  Get,
  Post,
  Body,
  QueryParams,
  JsonController
} from "routing-controllers";
import { Inject } from "typedi";
import { LocalTrackService } from "../services/LocalTrackService";

@JsonController("/localTrack")
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
  async searchLocalTracks(
    @Param("barId") barId: String,
    @QueryParams() params: any
  ) {
    if (params.page <= 0) {
      return {
        error: "el page tiene que ser mayor a 0"
      };
    }
    this.userService.setId(barId);
    const data: Array<LocalTrack> = await this.userService.searchLocalTracks(
      params
    );
    return data;
  }
  @Post("/:barId/add")
  async registerMasive(
    @Param("barId") barId: String,
    @Body({ options: { limit: "1024mb" } }) localTracks:Array<LocalTrack>
  ) {
    this.userService.setId(barId);
    return await this.userService.registerLocalTracks(localTracks);
  }
}
