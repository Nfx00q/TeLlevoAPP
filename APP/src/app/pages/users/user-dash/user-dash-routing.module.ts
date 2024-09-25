import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDashPage } from './user-dash.page';

const routes: Routes = [
  {
    path: '',
    component: UserDashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDashPageRoutingModule {}
