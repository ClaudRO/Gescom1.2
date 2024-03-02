import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearTransaccionPage } from './crear-transaccion.page';

const routes: Routes = [
  {
    path: '',
    component: CrearTransaccionPage
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearTransaccionPageRoutingModule {}
