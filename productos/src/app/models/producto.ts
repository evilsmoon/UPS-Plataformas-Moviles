export class Producto {
  public _id: string;
  public nombre: string;
  public tipo: string;
  public marca: string;
  public precio: number;
  public proveedor: string;

  constructor(
    _id: string,
    nombre: string,
    tipo: string,
    marca: string,
    precio: number,
    proveedor: string
  ) {
    this._id = _id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.marca = marca;
    this.precio = precio;
    this.proveedor = proveedor;
  }
}
