import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SubirImagenService {
  private cloudName = 'dlum7fpkk';
  private uploadPreset = 'productos_unsigned';

  constructor(private http: HttpClient) {}

  subirImagen(file: File) {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`; //API DE CLOUDINARY
    // Configuración de la petición
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    return this.http.post<any>(url, formData).pipe(
      map(res => res.secure_url) // url publica para guardarla en firestore
    );
  }
}
