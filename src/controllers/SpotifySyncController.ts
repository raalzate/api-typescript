import {
  Get,
  JsonController,
  QueryParams
} from "routing-controllers";

import { Inject } from "typedi";
import { SpotifySyncService } from "../services/SpotifySyncService";
import { DataUtil } from "../repositories/Utils/DataUtil";

@JsonController("/SpotifySync")
export class SpotifySyncController {
  @Inject()
  spotifySyncService: SpotifySyncService;

  @Get("/redirect-url")
  async redirectUrl(@QueryParams() params: any) {
    const barId=DataUtil.decodeBase64(params.state).data.barId;
    this.spotifySyncService.setId(barId);
    await this.spotifySyncService.setCode(params.code);
    return params;
  }
}
