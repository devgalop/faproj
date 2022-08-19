import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerManagerComponent } from './customer-manager.component';

const routes: Routes = [{ path: '', component: CustomerManagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerManagerRoutingModule { }
