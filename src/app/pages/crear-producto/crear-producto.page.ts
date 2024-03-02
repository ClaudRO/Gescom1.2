import { Component, OnInit } from '@angular/core';
import { Productos } from './producto';
import { ProductoServiceService } from './producto-service.service';
import { LoginService } from 'src/app/Users/login/login.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.page.html',
  styleUrls: ['./crear-producto.page.scss'],
})

export class CrearProductoPage implements OnInit {
  idusuario: Number = NaN;
  productos: Productos[] = [];

  newProducto: Productos = {
    id: NaN,
    idUsuario: NaN,
    nombre: "",
    descripcion: "",
    cantidad: 0,
    valor: 0,
    total: 0
  };

  constructor(
    private productoServ: ProductoServiceService,
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

  obtenerCredenciales() {
    const IdUsuario = this.credencialesService.getUserIdFromLocalStorage();
    if (IdUsuario !== null) {
      this.loadProductos(IdUsuario);
      this.credencialesService.getUsuario(IdUsuario).subscribe((usuario) => {
        this.idusuario = usuario.id;
        this.newProducto.idUsuario = this.idusuario;
      });
    } else {
      console.error('ID de usuario no válido');
    }
  }

  loadProductos(id: Number) {
    this.productoServ.listarProductos(id, true).subscribe({
      next: (resp: any) => { // Usamos 'any' temporalmente para facilitar la explicación
        console.log('Respuesta del servidor:', resp);
        if (resp.success && resp.data) {
          this.productos = resp.data; // Aquí asignamos el arreglo de productos
          console.log('Productos asignados:', this.productos);
        } else {
          console.error('Error al cargar los productos: Respuesta sin datos');
        }
      },
      error: (err) => {
        console.log(err.message);
      },
    });

  }
//console.log('Productos después de la suscripción:', this.productos); // Flag de depuración
  crearProducto() {
    if (!this.newProducto.nombre) {
      this.mostrarNotificacion('El nombre del producto no puede estar vacío.');
      return;
    }

    this.productoServ.agregarProducto(this.idusuario, this.newProducto).subscribe(() => {
      this.mostrarNotificacion('El Producto se guardó exitosamente');
      this.router.navigateByUrl('/inicio');
    });
  }
}
