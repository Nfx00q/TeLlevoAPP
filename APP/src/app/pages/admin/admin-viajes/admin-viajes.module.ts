import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminViajesPageRoutingModule } from './admin-viajes-routing.module';

import { AdminViajesPage } from './admin-viajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminViajesPageRoutingModule
  ],
  declarations: [AdminViajesPage]
})
export class AdminViajesPageModule {}
