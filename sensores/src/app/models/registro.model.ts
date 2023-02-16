export class Registro {

    public codigo: string;
    public razon: string;
    public nombre: string;
    public lat: number;
    public lon: number;
    public created: Date;


    constructor(
        codigo: string,
        razon: string,
        nombre: string,
        lat:number,
        lon:number,
        
    ) {
        this.codigo = codigo;
        this.razon = razon;
        this.nombre = nombre;
        this.created = new Date();
        this.lat = lat;
        this.lon = lon;
    }



}