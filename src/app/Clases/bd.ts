export class Producto{
    constructor(){}
    idProducto:string="";   
    nombreProducto:string="";
    descripcionProducto:string="";
    categoriaProducto:string="";
    marcaProducto:string="";
    imagenProducto:string="";
    estado: string="";


    setData(data:any){
        this.idProducto=data.idProducto;
        this.nombreProducto=data.nombreProducto;
        this.descripcionProducto=data.descripcionProducto;
        this.categoriaProducto=data.categoriaProducto;
        this.marcaProducto=data.marcaProducto;
        this.imagenProducto=data.imagenProducto;
        this.estado=data.estado;    
    }
}
export class CotizacionFormulario {
    constructor(){}
        nombre: string="";
        apellido: string="";
        email: string="";
        mensaje?: string="";
        productos: Producto[] | undefined;

     setData(data:any){
        this.nombre=data.nombre;
        this.apellido=data.apellido;
        this.email=data.email;
        this.mensaje=data.mensaje;
        this.productos=data.productos;
        
    }

}