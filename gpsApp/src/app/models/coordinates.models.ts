export class Coordinates {

    public lat: number;
    public lon: number;
    public created:Date;
    public icon:String;

    constructor( lat: number, lon: number ) {

        this.lat = lat;
        this.lon = lon;
        this.created = new Date();
        this.icon = 'pin-outline'
    }


}