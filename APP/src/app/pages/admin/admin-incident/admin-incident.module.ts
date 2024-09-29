import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminIncidentPageRoutingModule } from './admin-incident-routing.module';

import { AdminIncidentPage } from './admin-incident.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminIncidentPageRoutingModule
  ],
  declarations: [AdminIncidentPage]
})
export class AdminIncidentPageModule {}
