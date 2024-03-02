import { Injectable } from '@angular/core';
import { catchError, map,Observable,mergeMap } from 'rxjs';
import { Usuarios } from '../usuarios'; 
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private usuario: string = '';
  private contrasenia: string = '';
  private nombreUsuario: string = ''; // Cambio aquí
  private id: Number=NaN;
  private idnumber: number=NaN;

  private URL = 'http://localhost:3000/api/v1/usuarios';
  private URL2= 'http://localhost:3000/api/v1';
  constructor(private http: HttpClient) { }

  setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
  getUserIdFromLocalStorage(): number | null {
  const userIdString = localStorage.getItem('user_id');

  if (userIdString) {
    return parseInt(userIdString, 10);
  } else {
    return null;
  }
}
  setTokenHeader(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  setCredenciales(usuario: string, contrasenia: string) {
    this.usuario = usuario;
    this.contrasenia = contrasenia;
  }

  getCredenciales(): { usuario: string, contrasenia: string } {
    return { usuario: this.usuario, contrasenia: this.contrasenia };
  }

  setNombreUsuario(nombreUsuario: string) { // Nuevo método
    this.nombreUsuario = nombreUsuario;
  }
  setIdUsuario(id: Number) { // Nuevo método
    this.id = id;
  }

  getNombreUsuario(): string { // Nuevo método
    return this.nombreUsuario;
  }
  getIdUsuarionumber():number{
    return this.idnumber;
  }
  getIdUsuario(): Number { // Nuevo método
    return this.id;
  }

  /*validarCredenciales(correo: string, contrasenia: string): Observable<boolean> {
    console.log('Validando credenciales...');
    return this.http.get<Usuarios[]>(`${this.URL2}/usuarios`).pipe(
      map(usuarios => {
        const usuario = usuarios.find(u => u.correo === correo && u.contrasenia === contrasenia);
        if (usuario) {
          this.setNombreUsuario(usuario.nombre);
          this.setIdUsuario(usuario.id);
        }
        return !!usuario;
      })
    );
  }*/
  infoUser(correo: string, contrasenia: string): Observable<boolean> {
    console.log('Validando credenciales...');
    return this.http.get<Usuarios[]>(`${this.URL2}/usuarios`).pipe(
      map(usuarios => {
        const usuario = usuarios.find(u => u.correo === correo && u.contrasenia === contrasenia);
        if (usuario) {
          this.setNombreUsuario(usuario.nombre);
          this.setIdUsuario(usuario.id);
        }
        return !!usuario;
      })
    );
  }
  getUsuario(id: number): Observable<Usuarios> {
    const headers = this.setTokenHeader();
  
    return this.http.get<Usuarios>(`${this.URL2}/usuarios/${id}`, { headers });
  }
  retornarID(correo: string, contrasenia: string): Observable<Number|null> {
    return this.http.get<Usuarios[]>(`${this.URL2}/usuarios`).pipe(
      map(usuarios => {
        const usuario = usuarios.find(u => u.correo === correo && u.contrasenia === contrasenia);
        if (usuario) {
          return usuario.id;
        }else{
          return null;
        }
        
      })
    );
  }



obtenerToken(correo: string, contrasenia: string): Observable<{ token: string, userId: number }> {
  console.log('Obteniendo token...');
  return this.http.post<any>(`${this.URL2}/usuarios/login`, { correo, contrasenia }).pipe(
    map(response => {
      const token = response.token;

      if (token) {
        this.setToken(token);
        this.setTokenHeader(); // Incluye el token en el encabezado de cada solicitud
      }

      // Devuelve un objeto con el token y el ID del usuario
      return { token, userId: response.userId };
    }),
    catchError(error => {
      console.error('Error al obtener el token:', error);
      throw error;
    })
  );  
}
}
