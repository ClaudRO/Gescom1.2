import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Users/login/login.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

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
      this.obtenerCredenciales();
    }
  }
  
  obtenerCredenciales() {
    this.NombreUsuario = this.credencialesService.getNombreUsuario();
    this.id= this.credencialesService.getIdUsuario(); // Corrección aquí
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
