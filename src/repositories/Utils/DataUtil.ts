import TrackSpotify from "../../entities/TrackSpotify";

export class DataUtil {
  static decodeBase64(data:string) {
    return JSON.parse(Buffer.from(data, 'base64').toString('ascii'))
  }
  static encodeBase64(data:string) {
    return Buffer.from(data).toString('base64')
  }
  static mapDataSpotify(track:any):TrackSpotify {
    const id = track.id;
    const name = track.name;
    const artist =
      track.artists && track.artists.length > 0 ? track.artists[0] : {};
    const url:any =
      track.album && track.album.images && track.album.images.length > 0
        ? DataUtil.getImagesSpotify(track.album.images)
        : "";
    const duration:number = track.duration_ms / 1000;
    let trackSpotify=new TrackSpotify();
    trackSpotify={
     _id: id,
      id: id,
      title: name,
      name: name,
      titleFormat: this.cleanString(name),
      songFindedInSpotify: true,
      artist: artist.name,
      artistId: artist.id,
      artistFormat: this.cleanString(artist.name),
      duration: duration || 0,
      date: new Date(),
      url: url !== "" ? url.url : "",
      urlSmall: url !== "" ? url.smallUrl : "",
      private: false,
      video: false,
      format: "",
      tags: false,
      fileSize: 0,
      path: ""
    }
    return trackSpotify;
  }
  static getImagesSpotify(images:any):any {
    const imagesDju:any = {};
    images.forEach((element:any) => {
      if (element.width >= 640) {
        imagesDju.url = element.url;
      }
      if (element.width <= 140) {
        imagesDju.smallUrl = element.url;
      }
    });
    if (!imagesDju.url) {
      imagesDju.url = images[0] && images[0].url ? images[0].url : "";
    }
    if (!imagesDju.smallUrl) {
      imagesDju.smallUrl = images[1] && images[1].url ? images[1].url : "";
    }
    return imagesDju;
  }
  static cleanString(text:any):String {
    if (text !== "") {
      const newText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return newText.toLowerCase();
    }
    return "unknown";
  }
}
