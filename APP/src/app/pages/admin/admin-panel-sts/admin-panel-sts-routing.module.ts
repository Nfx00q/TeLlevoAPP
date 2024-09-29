import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPanelStsPage } from './admin-panel-sts.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelStsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelStsPageRoutingModule {}
