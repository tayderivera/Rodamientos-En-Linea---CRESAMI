import { Component } from '@angular/core';
import { Auth, onAuthStateChanged, User, signOut }  from '@angular/fire/auth';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductoService } from '../../Servicios/producto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../Clases/bd';
import { FooterComponent } from '../footer/footer.component';
import { CarritoCotizacionComponent } from "../carrito-cotizacion/carrito-cotizacion.component";
import { CarritoCotizacionService } from '../../Servicios/carrito.service';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-detalle-producto',
  imports: [RouterModule, CommonModule, FormsModule, FooterComponent, CarritoCotizacionComponent, HeaderComponent],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent {
isMenuOpen = false;
menuUsuarioAbierto =  false;
 productoId: string | null = null;
  producto: any = null;
  productosRelacionados: Producto[] = []
  usuarioActual: User | null = null;

constructor(private authentication: Auth, 
  private route: ActivatedRoute,
  private router :  Router,
  private productoService :  ProductoService,
  private carritoCotService :  CarritoCotizacionService){}

  ngOnInit(){
     this.route.paramMap.subscribe(params => {
    this.productoId = params.get('id');
    if (this.productoId) {
      this.productoService.getProductoPorId(this.productoId).subscribe(producto => {
        this.producto = producto;
        if (producto) {
          this.obtenerProductosRelacionados(producto);
        }
      });
    }
  });

  }

   toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleMenuUsuario(){
      this.menuUsuarioAbierto = !this.menuUsuarioAbierto;
  }

   cerrarMenuUsuario() {
    this.menuUsuarioAbierto = false;
  }

  cerrarSesion(){
    signOut(this.authentication).then(() => {
      this.router.navigate(['']);
    });
    this.cerrarMenuUsuario();
  }
   obtenerProductosRelacionados(producto: Producto) {
    this.productoService.getProductos().subscribe(productos => {
    const otros = productos.filter(p =>p.idProducto !== producto.idProducto)
    const mezclados = otros.sort(() => Math.random() - 0.5)
     this.productosRelacionados = mezclados.slice(0, 4);
    })
  }

  
verDetalle(idProducto : string){
  this.router.navigate(['/producto', idProducto])
  window.scrollTo({top: 0, behavior: 'smooth'})
}

agregaralCarrito(){
  if (this.producto){
    this.carritoCotService.agregarProducto(this.producto)
    //Swal.fire("Producto añadido al carrito de cotización. ");
    this.carritoCotService.abrirPopoverSubject.next();
  }
}

}
