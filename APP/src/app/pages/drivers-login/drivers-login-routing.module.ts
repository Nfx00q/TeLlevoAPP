import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriversLoginPage } from './drivers-login.page';

const routes: Routes = [
  {
    path: '',
    component: DriversLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriversLoginPageRoutingModule {}
