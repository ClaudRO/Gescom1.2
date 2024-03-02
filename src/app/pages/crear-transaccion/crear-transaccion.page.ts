import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../crear-proveedor/proveedor';
import { Productos } from '../crear-producto/producto';
import { Transacciones } from './transacciones';
import { DetProductos } from './det-productos';
import { ProveedoreService } from '../crear-proveedor/proveedores.service';
import { ProductoServiceService } from '../crear-producto/producto-service.service';
import { TransaccionesService } from './transacciones.service';import { LoginService } from 'src/app/Users/login/login.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-crear-transaccion',
  templateUrl: './crear-transaccion.page.html',
  styleUrls: ['./crear-transaccion.page.scss'],
})
export class CrearTransaccionPage implements OnInit {
  cantidadProducto: number = 0;
  precioProducto: number = 0;
  idusuario: Number = NaN;
  proveedor_Selec: Number = NaN;
  showSearchField: boolean = false;

  proveedores: Proveedor[]=[];
  productos: Productos[]=[];
  productoSelec: Productos[]=[];
  detalles:DetProductos[]=[];
  detallesTotales: DetProductos[]=[];
  searchText: string = '';
  transaccionValida: boolean = false;



  newTransaccion: Transacciones ={
    id:NaN,
    idUsuario:NaN,
    proveedor_id:NaN,
    valorTotal:NaN,
  }

  newDetProd: DetProductos={
    id:NaN,
    transaccion_id:NaN,
    producto_id:NaN,
    cantidad:NaN,
    precio_unitario:NaN
  }



  constructor(
    private proveedoresServ: ProveedoreService,
    private productosServ: ProductoServiceService,
    private transaccionesServ: TransaccionesService,
    private credenciales:LoginService,
    private toastController: ToastController 
  ) { }

  ngOnInit() {
    this.getCredenciales();
  }
  getCredenciales(){
    const IdUsuario = this.credenciales.getUserIdFromLocalStorage();
    if (IdUsuario !== null) {
      this.loadProveedores(IdUsuario);
      this.loadProductos(IdUsuario);
      this.credenciales.getUsuario(IdUsuario).subscribe((usuario) => {
        this.idusuario = usuario.id;
        this.newTransaccion.idUsuario = this.idusuario;
      });
    } else {
      console.error('ID de usuario no válido');
    }
  }
  loadProveedores(id:Number){
    this.proveedoresServ.listarProveedores(id, true).subscribe({
      next: (resp: any) => { // Usamos 'any' temporalmente para facilitar la explicación
        console.log('Respuesta del servidor:', resp);
        if (resp.success && resp.data) {
          this.proveedores = resp.data; // Aquí asignamos el arreglo de productos
          console.log('Proveedores asignados:', this.proveedores);
        } else {
          console.error('Error al cargar los proveedores: Respuesta sin datos');
        }
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
  loadProductos(id:Number){
    this.productosServ.listarProductos(id, true).subscribe({
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
  filterProductos(): Productos[] {
    if (!this.searchText) {
      return this.productos;
    }

    const searchTerm = this.searchText.toLowerCase();
    return this.productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(searchTerm) ||
        producto.descripcion.toLowerCase().includes(searchTerm)
    );
  }
  agregarProducto(producto: Productos) {
    const productoSeleccionado: Productos = {
      id: producto.id,
      idUsuario: producto.idUsuario,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      cantidad: 0,
      valor: 0,
      total:0
    };
    const detalleProducto: DetProductos = {
      id: NaN,
      transaccion_id: 0, // Asigna el valor correcto aquí
      producto_id: producto.id,
      cantidad: 0,
      precio_unitario: 0
    };  
    this.productoSelec.push(productoSeleccionado);
    this.detallesTotales.push(detalleProducto);
    this.productos = this.productos.filter((p) => p.id !== producto.id);
    this.calcularTotalProducto(productoSeleccionado);
    this.calcularTotalTransaccion(); // Calcular el total de la transacción
  }
  calcularTotalProducto(producto: Productos) {
    producto.total = producto.cantidad.valueOf() * producto.valor.valueOf();
  }
  calcularTotalTransaccion() {
    let totalTransaccion = 0;
    for (const producto of this.productoSelec) {
      totalTransaccion += producto.total.valueOf();
    }
    this.newTransaccion.valorTotal = totalTransaccion;
  }
  anularProducto(producto: Productos) {
    this.productoSelec = this.productoSelec.filter(p => p.id !== producto.id);
    this.productos.push(producto);
    this.calcularTotalTransaccion(); // Calcular el total de la transacción

  }
  guardarDatos() {
    const productosSinCantidad = this.productoSelec.filter(producto => producto.cantidad.valueOf() <= 0);
    const productosSinValor = this.productoSelec.filter(producto => producto.valor.valueOf() <= 0);
  
    if (!this.proveedor_Selec) {
      this.mostrarNotificacion('Debes seleccionar un proveedor antes de guardar la transacción.');
      return;
    } else if (this.productoSelec.length === 0) {
      this.mostrarNotificacion('Debes seleccionar al menos un producto antes de guardar la transacción.');
      return;
    } else if (productosSinCantidad.length > 0) {
      this.mostrarNotificacion('Debes ingresar una cantidad válida para todos los productos seleccionados.');
      return;
    } else if (productosSinValor.length > 0) {
      this.mostrarNotificacion('Debes ingresar un valor válido para todos los productos seleccionados.');
      return;
    } else {
      const IdUser = this.credenciales.getUserIdFromLocalStorage();
  
      if (IdUser !== null) {
        this.newTransaccion.proveedor_id = this.proveedor_Selec;
        const detallesPro: DetProductos[] = this.productoSelec.map(producto => ({
          id: NaN,
          transaccion_id: 0, // Ajusta según tu lógica
          producto_id: producto.id,
          cantidad: producto.cantidad,
          precio_unitario: producto.valor
        }));
  
        // Llamar al servicio para guardar la transacción
        this.transaccionesServ.crearTransaccion(IdUser, this.newTransaccion, detallesPro).subscribe({
          next: (resp) => {
            console.log('Transacción guardada:', resp);
            this.getCredenciales();
            this.productoSelec = [];
            this.newTransaccion.valorTotal = 0;
            this.mostrarNotificacion('La transacción se guardó exitosamente');
            // Aquí puedes agregar lógica adicional
          },
          error: (error) => {
            console.error('Error al guardar la transacción:', error);
            // Manejar el error adecuadamente
          }
        });
      } else {
        console.error('ID de usuario no válido');
      }
    }
  }
  
  async mostrarNotificacion(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, // Duración en milisegundos
      position: 'top', // Posición de la notificación
      color: "tertiary"
    });
    toast.present();
  }

  decrementarCantidad(producto: Productos) {
    if (producto.cantidad.valueOf() > 0) {
      producto.cantidad=producto.cantidad.valueOf()-1;
    }
  }

  incrementarCantidad(producto: Productos) {
    producto.cantidad=producto.cantidad.valueOf()+1;
  }


}
