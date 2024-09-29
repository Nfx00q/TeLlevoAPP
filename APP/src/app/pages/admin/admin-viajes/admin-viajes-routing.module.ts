import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminViajesPage } from './admin-viajes.page';

const routes: Routes = [
  {
    path: '',
    component: AdminViajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminViajesPageRoutingModule {}
