import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CrearTransaccionPageModule } from './pages/crear-transaccion/crear-transaccion.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Users/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./Users/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'crear-producto',
    loadChildren: () => import('./pages/crear-producto/crear-producto.module').then( m => m.CrearProductoPageModule)
  },
  {
    path: 'crear-proveedor',
    loadChildren: () => import('./pages/crear-proveedor/crear-proveedor.module').then( m => m.CrearProveedorPageModule)
  },
  {
    path: 'crear-transaccion',
    loadChildren: () => import('./pages/crear-transaccion/crear-transaccion.module').then( m => m.CrearTransaccionPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./pages/crear-transaccion/historial/historial.module').then( m => m.HistorialPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
