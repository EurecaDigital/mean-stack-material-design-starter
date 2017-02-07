import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { UsersAdminComponent } from './components/users-admin/users-admin.component';

const routes: Routes = [
  { path: '', component: UsersAdminComponent },
  { path: 'home', component: HomeComponent}
];

export const routing = RouterModule.forRoot(routes);
