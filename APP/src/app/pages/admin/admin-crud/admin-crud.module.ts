import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminCrudPageRoutingModule } from './admin-crud-routing.module';

import { AdminCrudPage } from './admin-crud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminCrudPageRoutingModule
  ],
  declarations: [AdminCrudPage]
})
export class AdminCrudPageModule {}
