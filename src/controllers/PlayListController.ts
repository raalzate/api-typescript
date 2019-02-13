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
  
  @JsonController("/PlayList")
  export class PlayListController {
    @Inject()
    userService: PlayListService;

    @Put("/:barId")
  async add(@Param("barId") barId: String, @Body() body: any) {
    if (body <= 0) {
      return {
        error: "el page tiene que ser mayor a 0"
      };
    }
    this.userService.setId(barId);
  //  return await this.userService.privateSong(body);
  }

}