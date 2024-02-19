import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuarios } from 'src/app/Users/usuarios';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  
  private URL = 'http://localhost:3000/api/v1/usuarios';
  private URL2= 'http://localhost:3000/api/v1';
  constructor(private http:HttpClient) { }

  crearUsuario(newUsuario: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(this.URL, newUsuario);
  }
  validarCorreo(correo:string):Observable<boolean>{
    return this.http.get<Usuarios[]>(`${this.URL2}/usuarios`).pipe(
      map(usuarios => {
        const usuario1= usuarios.find(u => u.correo === correo);
        if(usuario1){
          return false;
        }else{
          return true;
        }
      })
    );
  }
}
