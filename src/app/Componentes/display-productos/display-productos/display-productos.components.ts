import { Component, inject } from '@angular/core';

import { HeaderComponent } from "../../header/header.component";
import { ProductoService } from "../../../Servicios/producto.service";
import { Producto } from '../../../Clases/bd';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, addDoc, collection, doc, updateDoc } from '@angular/fire/firestore';

import { firstValueFrom } from 'rxjs';
import { SubirImagenService } from '../../../Servicios/subirimagen.service';
import Swal from 'sweetalert2';
import { Auth, onAuthStateChanged, User, signOut }  from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from "../../footer/footer.component";
import { CarritoCotizacionComponent } from "../../carrito-cotizacion/carrito-cotizacion.component";

import { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-display-productos',
  imports: [CommonModule, FormsModule, RouterModule, CarritoCotizacionComponent, HeaderComponent, FooterComponent],  
  templateUrl: './display-productos.component.html',
  styleUrl: './display-productos.component.css',
  
})
export class DisplayProductosComponent {

//para mostra el usuario actual
 usuarioActual: User | null = null;
 menuUsuarioAbierto =  false;
  auth = inject(Auth);

productos : Producto[] = []; //para el display de productos

// Variables para el modal
nuevoProducto : Producto = new Producto();
imagenSeleccionada: File | null = null;

//Variables del modal de edición
isModoEdicion =  false;
productoEditando: any = null;

//Variables de los filtros
filtroCategoria: string = '';
filtroMarca: string = '';
filtroEstatus: string = '';
busqueda ="";

  // Constructor
constructor(private productoService: ProductoService, private firestore: Firestore,
  private subirImagenService:SubirImagenService, private authentication :  Auth, private router: Router
) { 
  this.productoService = productoService;
  this.firestore = firestore;
 }

async agregarProducto() {
  // Validación: todos los campos obligatorios deben estar llenos
  if (
    !this.nuevoProducto.nombreProducto.trim() ||
    !this.nuevoProducto.categoriaProducto.trim() ||
    !this.nuevoProducto.marcaProducto.trim()
  ) {
    await Swal.fire({
      icon: 'warning',
      title: 'Campos obligatorios',
      text: 'Por favor, complete todos los campos obligatorios antes de guardar.'
    });
    return;
  }

  // Confirmación
  const confirm = await Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Deseas guardar este producto?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, guardar',
    cancelButtonText: 'Cancelar',
    customClass: {
      confirmButton: 'swal2-confirm-custom',
      cancelButton: 'swal2-cancel-custom',
      popup: 'swal2-popup-custom'
    }
  });

  if (confirm.isConfirmed) {
    try {
      let imagenUrl = '';
      if(this.imagenSeleccionada) {
       imagenUrl = await firstValueFrom(this.subirImagenService.subirImagen(this.imagenSeleccionada));

      }
       // Genera y asigna el id aleatorio
      this.nuevoProducto.idProducto = this.generateRandomString(20);

      this.nuevoProducto.imagenProducto = imagenUrl;
      this.nuevoProducto.estado = 'activo';
      const productosRef = collection(this.firestore, 'Producto');
      await addDoc(productosRef, { ...this.nuevoProducto });
      this.cerrarModal();
      this.nuevoProducto = new Producto(); // Limpiar formulario
      this.imagenSeleccionada = null; 
      await Swal.fire({
        icon: 'success',
        title: '¡Producto guardado!',
        text: 'El producto se guardó correctamente.'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al agregar: ' + error
      });
    }
  }
}

onFileSelected(event: any) {
  const file =  event.target.files[0];
  if (file) {
    this.imagenSeleccionada = file;
  }
}


isModalOpen = false;
  abrirModal() {
    this.isModalOpen = true;
  }

  cerrarModal() {
    this.isModalOpen = false;
    this.isModoEdicion = false;
    this.nuevoProducto = new Producto();
    this.productoEditando = null;
    this.imagenSeleccionada = null;
  }


//Modal edición
abrirModalEdicion(producto: any) {
  this.isModalOpen = true;
  this.isModoEdicion = true;
  this.nuevoProducto = { ...producto }; // Clona los datos para editar
  this.productoEditando = producto;
}

async guardarEdicion() {
   if (!this.nuevoProducto.idProducto) {
    Swal.fire('Error', 'No se pudo identificar el producto a editar.', 'error');
    return;
  }
  try {
    //si el usuario selecciona una nueva imagen se sube y se usa la nueva url
    let imagenUrl = this.nuevoProducto.imagenProducto;
    if (this.imagenSeleccionada) {
      imagenUrl = await firstValueFrom(this.subirImagenService.subirImagen(this.imagenSeleccionada));
    }

    const productoRef = doc(this.firestore, 'Producto', this.nuevoProducto.idProducto);
    await updateDoc(productoRef, {
      nombreProducto: this.nuevoProducto.nombreProducto,
      descripcionProducto: this.nuevoProducto.descripcionProducto,
      categoriaProducto: this.nuevoProducto.categoriaProducto,
      marcaProducto: this.nuevoProducto.marcaProducto,
      imagenProducto: imagenUrl,
      estado: this.nuevoProducto.estado
    });
    // Actualiza el producto en el array local si es necesario
    Object.assign(this.productoEditando, this.nuevoProducto, { imagenProducto: imagenUrl });
    this.cerrarModal();
    Swal.fire('¡Editado!', 'El producto fue actualizado.', 'success');
  } catch (error) {
    Swal.fire('Error', 'No se pudo editar el producto.', 'error');
  }
}

//función para desactivar el estado del producto
async desactivarProducto(producto: Producto) {
  const confirm = await Swal.fire({
    title: '¿Estás seguro?',
    text: 'El producto será desactivado y no será visible para los clientes.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, desactivar',
    cancelButtonText: 'Cancelar'
  });

  if (confirm.isConfirmed) {
    try {
      const productoRef = doc(this.firestore, 'Producto', producto.idProducto);
      await updateDoc(productoRef, { estado: 'inactivo' });
      producto.estado = 'inactivo'; // Actualiza el array local si es necesario
      Swal.fire('Desactivado', 'El producto ya no será visible para los clientes.', 'success');
    } catch (error) {
      Swal.fire('Error', 'No se pudo desactivar el producto.', 'error');
    }
  }
  
}

async activarProducto(producto: Producto) {
  try {
    const productoRef = doc(this.firestore, 'Producto', producto.idProducto);
    await updateDoc(productoRef, { estado: 'activo' });
    producto.estado = 'activo'; // Actualiza el array local si es necesario
    Swal.fire('Activado', 'El producto está visible para los clientes.', 'success');
  } catch (error) {
    Swal.fire('Error', 'No se pudo activar el producto.', 'error');
  }
}


//Función para generar string para el ID del producto
generateRandomString(num: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result1 = '';
  const charactersLength = characters.length;
  for (let i = 0; i < num; i++) {
      result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result1;
}

get productosFiltrados() {
  return this.productos.filter(producto => 
    (this.filtroCategoria === '' || producto.categoriaProducto === this.filtroCategoria) &&
    (this.filtroMarca === '' || producto.marcaProducto === this.filtroMarca) &&
    (this.filtroEstatus === '' || producto.estado === this.filtroEstatus) &&
    (this.busqueda === '' ||
      producto.nombreProducto.toLowerCase().includes(this.busqueda.toLowerCase()) ||
      producto.descripcionProducto.toLowerCase().includes(this.busqueda.toLowerCase())
    )
  );
}


  verDetalle(idProducto : string){
    this.router.navigate(['/producto', idProducto])

}

/* Sección de CRUD productos*/

   scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  isMenuOpen = false;
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

 ngOnInit(): void {
    this.productoService.getProductos().subscribe((productos: Producto[]) => {
      this.productos = productos;
      
    });
    onAuthStateChanged(this.auth, (user) => {
      this.usuarioActual =  user;
    })
  }

//logica para enviar la cotizacion mediante EmailJS
  enviarCotizacion(){
    
  }



  }


 
  

