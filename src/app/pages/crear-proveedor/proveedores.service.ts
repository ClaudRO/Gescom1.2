import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proveedor } from './proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedoreService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:3000/api/v1/usuarios'
  listarProveedores(usuarioId: Number, debugFlag: boolean = false): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.apiUrl}/${usuarioId}/proveedores`).pipe(
      tap((proveedores) => {
        if (debugFlag) {
          console.log('Datos recibidos del servidor:', proveedores);
        }
      })
    );
  }
  
  
  nombresReptidosProveedores(nombreIngresado: string, idUsuario: Number): Observable<boolean> {

    return this.http.get<Proveedor[]>(`${environment.apiURL}/proveedores`).pipe(
      map((proveedores: Proveedor[]) => {
        const proveedorEncontrado = proveedores.find(proveedor => proveedor.idUsuario === idUsuario && proveedor.nombre === nombreIngresado);
        if (proveedorEncontrado==undefined) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
  
  
  getProveedoresUsuario(usuarioId: Number): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.apiUrl}/${usuarioId}/proveedores`);
  }
  
  agregarProveedor(usuarioId: Number, proveedorData: any): Observable<any> {
    const url = `${this.apiUrl}/${usuarioId}/agregarProv`; // Ajusta la URL según tu estructura de rutas
    return this.http.post(url, proveedorData);
  }
  getProductoByID(id:Number):Observable<Proveedor>{
    return this.http.get<Proveedor>(`${environment.apiURL}/proveedores/?id=${id}`)
  }
  
  actualizarProducto(proveedor:any):Observable<Proveedor>{
    return this.http.put<Proveedor>(`${environment.apiURL}/proveedores/${proveedor.id}`,proveedor)
  }
  eliminarproducto(producto:any):Observable<Proveedor>{
    return this.http.delete<Proveedor>(`${environment.apiURL}/proveedores/${producto.id}`)
  }
}
