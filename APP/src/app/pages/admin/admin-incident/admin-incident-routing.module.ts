import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminIncidentPage } from './admin-incident.page';

const routes: Routes = [
  {
    path: '',
    component: AdminIncidentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminIncidentPageRoutingModule {}
