import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Transacciones } from './transacciones';
import { environment } from 'src/environments/environment';
import { DetProductos } from './det-productos';


@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {
  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:3000/api/v1/usuarios'

  listarTransacciones(idUsuario: number): Observable<Transacciones[]> {
    return this.http.get<Transacciones[]>(`${environment.apiURL}/transacciones`).pipe(
      map((transacciones: Transacciones[]) => {
        return transacciones.filter(transacciones => transacciones.idUsuario === idUsuario);
      })
    );
  }
  crearTransaccion(usuarioId: Number, newTransaccion:Transacciones,detalles: DetProductos[]):Observable<any>{
    console.log('Usuario ID:', usuarioId);
    console.log('Nueva transacción:', newTransaccion);
    console.log('Detalles:', detalles);
    const url = `${this.apiUrl}/${usuarioId}/agregarTrans`; // Ajusta la URL de acuerdo a tu API

    const body = {
      transaccion: newTransaccion,
      detalles: detalles
    };

    return this.http.post(url, body);
  }
  agregarProveedor(usuarioId: Number, proveedorData: any): Observable<any> {
    const url = `${this.apiUrl}/${usuarioId}/agregarProv`; // Ajusta la URL según tu estructura de rutas
    return this.http.post(url, proveedorData);
  }
  
  
  getTransaccionByID(id:Number):Observable<Transacciones>{
    return this.http.get<Transacciones>(`${environment.apiURL}/transacciones/?id=${id}`)
  }
  eliminartransaccion(transaccion:any):Observable<Transacciones>{
    return this.http.delete<Transacciones>(`${environment.apiURL}/transacciones/${transaccion.id}`)
  }
}
