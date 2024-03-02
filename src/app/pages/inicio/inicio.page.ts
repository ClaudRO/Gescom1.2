import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Users/login/login.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  private usuario: string = '';
  NombreUsuario: string = '';
  id:Number=NaN

  constructor(private credencialesService: LoginService, private router:Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.credencialesService.getToken()) {
      // No hay un token válido, redirigir a la página de inicio de sesión
      this.router.navigate(['/login']);
    } else {
      // Hay un token válido, obtener las credenciales y mostrar la información
      const headers = this.credencialesService.setTokenHeader();
      this.obtenerCredenciales();
    }
  }
  
  obtenerCredenciales() {
    const IdUsuario = this.credencialesService.getUserIdFromLocalStorage();
    if (IdUsuario !== null) {
      this.credencialesService.getUsuario(IdUsuario).subscribe((usuario) => {
        // Haz lo que necesites con la información del usuario
        this.NombreUsuario = usuario.nombre;
      });
    } else {
      console.error('ID de usuario no válido');
      // Puedes manejar el caso cuando el ID de usuario es null
    }
    
  }

  logout() {
    this.credencialesService.setCredenciales("", ""); // Limpiar las credenciales
    this.credencialesService.setNombreUsuario(""); // Limpiar el nombre de usuario
    this.NombreUsuario = ''; // Limpiar la variable en el componente
    this.id=NaN;
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  

} 
