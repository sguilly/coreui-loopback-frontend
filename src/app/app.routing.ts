import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadingPageComponent } from './views/loading-page/loading-page.component'
import { LoginPageComponent } from './views/login/login.component'

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'loadingpage',
    pathMatch: 'full',
  },

  {
    path: 'loadingpage',
    component: LoadingPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'entity',
        loadChildren: './views/entity/entity.module#EntityModule'
      }
      ,
      {
        path: 'user',
        loadChildren: './views/user/user.module#UserModule'
      }

    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
