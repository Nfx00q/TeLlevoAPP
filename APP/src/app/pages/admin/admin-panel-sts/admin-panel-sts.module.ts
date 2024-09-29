import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPanelStsPageRoutingModule } from './admin-panel-sts-routing.module';

import { AdminPanelStsPage } from './admin-panel-sts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPanelStsPageRoutingModule
  ],
  declarations: [AdminPanelStsPage]
})
export class AdminPanelStsPageModule {}
