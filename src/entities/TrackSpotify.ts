export default class TrackSpotify{
    _id : String;
    id : String;
    title : String;
    name : String;
    titleFormat : String;
    songFindedInSpotify:boolean;
    artist : String;
    artistId : String="";
    artistFormat : String="";
    duration : number;
    date : Date;
    url: String;
    urlSmall : String;
    private : boolean;
    video : boolean=false;
    format : String;
    tags : boolean;
    fileSize : number=0;
    path :  String="";
}