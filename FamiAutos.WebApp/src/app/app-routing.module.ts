import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'accounting', loadChildren: () => import('./pages/accounting/accounting.module').then(m => m.AccountingModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'customer-manager', loadChildren: () => import('./pages/customer-manager/customer-manager.module').then(m => m.CustomerManagerModule) },
  { path: '**', redirectTo:'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
