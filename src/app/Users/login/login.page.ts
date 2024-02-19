import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../usuarios';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credenciales: Usuarios = {
    id:NaN,
    nombre: "",
    apellido: "",
    contrasenia: "",
    fechaDeNacimiento: new Date(),
    tipo_usuario: "",
    correo: "",
    numeroCelular: NaN,
   
  };

  constructor(private credencialesService: LoginService, private router: Router) { }

  ngOnInit() {
    this.resetCampos();
  }

  resetCampos() {
    this.credenciales.correo = '';
    this.credenciales.contrasenia = '';
  }
  login() {
    const { correo, contrasenia } = this.credenciales;

    this.credencialesService.obtenerToken(correo, contrasenia).subscribe(({ token, userId }) => {
      console.log('Token obtenido:', token);
  
      if (token) {
        // Setear el token en el servicio
        this.credencialesService.setToken(token);
    
        // Setear el ID del usuario en el servicio
        this.credencialesService.getUsuario(userId).subscribe((usuario) => {
          // Haz lo que necesites con la información del usuario
          console.log('Usuario obtenido:', usuario);
  
          // Redirigir o realizar otras acciones según sea necesario
          this.resetCampos();
          this.router.navigate(['/inicio']).then(() => console.log('Navegación a /inicio completada')).catch((error) => console.error('Error en la navegación:', error));
        });

      } else {
        console.log('No se pudo obtener el token');
        // Manejar error al obtener el token
      }
    });
   
  
    // Agregar un retorno fuera del subscribe
     // O el valor que tenga sentido en tu lógica
  }

}
