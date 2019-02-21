import {
  Param,
  Get,
  Post,
  Body,
  JsonController,
  QueryParams
} from "routing-controllers";

import { Inject } from "typedi";
import { SpotifyService } from "../services/SpotifyService";

@JsonController("/spotify")
export class SpotifyController {
  @Inject()
  spotifyService: SpotifyService;

  @Get("/url/:barId")
   createUrlSpotify(
    @Param("barId") barId: String
  ) {
    this.spotifyService.setId(barId);
    const url=this.spotifyService.getUrlIntegration();
    return {
      url
    }
  }
  @Post("/playlists/:barId")
  async getPlaylists(
    @Param("barId") barId: String,
    @Body() body: any
  ) {
    this.spotifyService.setId(barId);
    const playlists=await this.spotifyService.getPlaylists();
    return playlists
  }

  @Get("/user/:barId")
  async gerUser(
    @Param("barId") barId: String
  ) {
    this.spotifyService.setId(barId);
    const user=await this.spotifyService.getUser();
    return user;
  }

  @Get("/devices/:barId")
  async getDevices(
    @Param("barId") barId: String
  ) {
    this.spotifyService.setId(barId);
    const devices=await this.spotifyService.getDevices();
    return devices;
  }
  @Get("/search/:barId")
  async search(
    @Param("barId") barId: String,
    @QueryParams() params: any
  ) {
    this.spotifyService.setId(barId);
    const songs=await this.spotifyService.search(params.search);
    return songs;
  }
}
