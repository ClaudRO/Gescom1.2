import { Component, OnInit } from '@angular/core';
import { Proveedor } from './proveedor';
import { ProveedoreService } from './proveedores.service';
import { LoginService } from 'src/app/Users/login/login.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-proveedor',
  templateUrl: './crear-proveedor.page.html',
  styleUrls: ['./crear-proveedor.page.scss'],
})
export class CrearProveedorPage implements OnInit {

  idusuario: Number = NaN;
  proveedores: Proveedor[] = [];

  newProveedor: Proveedor = {
    id: NaN,
    idUsuario: NaN,
    nombre: "",
    descripcion: ""
  };

  constructor(
    private proveedorServ: ProveedoreService,
    private credencialesService: LoginService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.obtenerCredenciales();
  }

  async mostrarNotificacion(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color: 'tertiary'
    });
    toast.present();
  }
  loadProveedores(id: Number) {
    this.proveedorServ.listarProveedores(id, true).subscribe({
      next: (resp: any) => { // Usamos 'any' temporalmente para facilitar la explicación
        console.log('Respuesta del servidor:', resp);
        if (resp.success && resp.data) {
          this.proveedores = resp.data; // Aquí asignamos el arreglo de productos
          console.log('Proveedor asignados:', this.proveedores);
        } else {
          console.error('Error al cargar los proveedores: Respuesta sin datos');
        }
      },
      error: (err) => {
        console.log(err.message);
      },
    });

  }

  obtenerCredenciales() {
    const IdUsuario = this.credencialesService.getUserIdFromLocalStorage();
    if (IdUsuario !== null) {
      this.loadProveedores(IdUsuario);
      this.credencialesService.getUsuario(IdUsuario).subscribe((usuario) => {
        this.idusuario = usuario.id;
        this.newProveedor.idUsuario = this.idusuario;
      });
    } else {
      console.error('ID de usuario no válido');
    }
  }

  
//console.log('Productos después de la suscripción:', this.productos); // Flag de depuración
  crearProveedor() {
    if (!this.newProveedor.nombre) {
      this.mostrarNotificacion('El nombre del producto no puede estar vacío.');
      return;
    }

    this.proveedorServ.agregarProveedor(this.idusuario, this.newProveedor).subscribe(() => {
      this.mostrarNotificacion('El Proveedor se guardó exitosamente');
      this.router.navigateByUrl('/inicio');
    });
  }
}
