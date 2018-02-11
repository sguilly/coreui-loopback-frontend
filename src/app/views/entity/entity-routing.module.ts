import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntityListComponent } from './entity.list.component';
import { EntityEditComponent } from './entity.edit.component';
import { EntityViewComponent } from './entity.view.component';


const routes: Routes = [
  {
    path: 'list',
    component: EntityListComponent,
    data: {
      title: 'Entités'
    }
  },
  {
    path: 'edit',
    component: EntityEditComponent,
    data: {
      title: 'Entités'
    }
  },
  {
    path: 'view',
    component: EntityViewComponent,
    data: {
      title: 'Entités'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntityRoutingModule {}
