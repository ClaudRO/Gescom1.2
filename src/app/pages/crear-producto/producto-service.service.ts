import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Productos } from './producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:3000/api/v1/usuarios'
  listarProductos(usuarioId: Number, debugFlag: boolean = false): Observable<Productos[]> {
    return this.http.get<Productos[]>(`${this.apiUrl}/${usuarioId}/productos`).pipe(
      tap((productos) => {
        if (debugFlag) {
          console.log('Datos recibidos del servidor:', productos);
        }
      })
    );
  }
  
  
  nombresReptidosProductos(nombreIngresado: string, idUsuario: Number): Observable<boolean> {

    return this.http.get<Productos[]>(`${environment.apiURL}/productos`).pipe(
      map((productos: Productos[]) => {
        const productoEncontrado = productos.find(producto => producto.idUsuario === idUsuario && producto.nombre === nombreIngresado);
        if (productoEncontrado==undefined) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
  
  
  getProductosUsuario(usuarioId: Number): Observable<Productos[]> {
    return this.http.get<Productos[]>(`${this.apiUrl}/${usuarioId}/productos`);
  }
  
  agregarProducto(usuarioId: Number, productoData: any): Observable<any> {
    const url = `${this.apiUrl}/${usuarioId}/agregarProd`; // Ajusta la URL según tu estructura de rutas
    return this.http.post(url, productoData);
  }
  getProductoByID(id:Number):Observable<Productos>{
    return this.http.get<Productos>(`${environment.apiURL}/productos/?id=${id}`)
  }
  
  actualizarProducto(producto:any):Observable<Productos>{
    return this.http.put<Productos>(`${environment.apiURL}/productos/${producto.id}`,producto)
  }
  eliminarproducto(producto:any):Observable<Productos>{
    return this.http.delete<Productos>(`${environment.apiURL}/productos/${producto.id}`)
  }
}
