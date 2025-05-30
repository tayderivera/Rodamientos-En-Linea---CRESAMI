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
