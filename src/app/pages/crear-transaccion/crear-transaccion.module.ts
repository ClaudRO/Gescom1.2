import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearTransaccionPageRoutingModule } from './crear-transaccion-routing.module';

import { CrearTransaccionPage } from './crear-transaccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearTransaccionPageRoutingModule
  ],
  declarations: [CrearTransaccionPage]
})
export class CrearTransaccionPageModule {}
