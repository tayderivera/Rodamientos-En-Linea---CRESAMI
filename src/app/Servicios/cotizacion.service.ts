import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CotizacionFormulario } from '../Clases/bd';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  private apiUrl = 'https://tu-backend.com/api/cotizar'; // Cambia por tu endpoint real

  constructor(private http: HttpClient) {}

  enviarCotizacion(data: CotizacionFormulario): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}