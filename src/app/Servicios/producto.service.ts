import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, doc, updateDoc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Producto } from '../Clases/bd';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private collectionName = 'Producto';

  constructor(private firestore: Firestore) {}

  getProductos(): Observable<Producto[]> {
      const productosCollection = collection(this.firestore, 'Producto');
        return collectionData(productosCollection, { idField: 'idProducto' }) as Observable<Producto[]>;
  }
}