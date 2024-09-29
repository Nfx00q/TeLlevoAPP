import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminCrudPage } from './admin-crud.page';

const routes: Routes = [
  {
    path: '',
    component: AdminCrudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminCrudPageRoutingModule {}
