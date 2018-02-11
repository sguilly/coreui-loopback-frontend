import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './user.list.component';
import { UserEditComponent } from './user.edit.component';


const routes: Routes = [
  {
    path: 'list',
    component: UserListComponent,
    data: {
      title: 'Utilisateurs'
    }
  },
  {
    path: 'edit',
    component: UserEditComponent,
    data: {
      title: 'Utilisateurs'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
