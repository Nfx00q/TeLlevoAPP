import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserDashPageRoutingModule } from './user-dash-routing.module';

import { UserDashPage } from './user-dash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserDashPageRoutingModule
  ],
  declarations: [UserDashPage]
})
export class UserDashPageModule {}
