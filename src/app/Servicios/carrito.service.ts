import {Injectable} from '@angular/core'
import { Subject } from 'rxjs';
import { Producto } from '../Clases/bd';

@Injectable({
  providedIn: 'root'
})
export class CarritoCotizacionService {
  private productos: Producto[] = [];

  abrirPopoverSubject = new Subject<void>();
  abrirPopover$ = this.abrirPopoverSubject.asObservable();

  constructor(){
  this.cargarCarrito()
  }
  
  private guardarCarrito() : void {
    localStorage.setItem('productos', JSON.stringify(this.productos))
  }

  private cargarCarrito(): void{
    const prodData = localStorage.getItem('productos')
    if (prodData){
        this.productos = JSON.parse(prodData)
    }
  }


  agregarProducto(producto: Producto) {
    // Evita duplicados (opcional)
    if (!this.productos.find(p => p.idProducto === producto.idProducto)) {
      this.productos.push(producto);
      this.guardarCarrito()
    }
  }

  getCarrito(){
    return this.productos
  }

eliminarProductoPorId(idProducto: string) {
  this.productos = this.productos.filter(p => p.idProducto !== idProducto);
  this.guardarCarrito(

  )
}

  limpiarCarrito() {
    this.productos = [];
    this.guardarCarrito();
  }
}