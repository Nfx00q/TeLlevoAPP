import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriversLoginPageRoutingModule } from './drivers-login-routing.module';

import { DriversLoginPage } from './drivers-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriversLoginPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DriversLoginPage]
})
export class DriversLoginPageModule {}
