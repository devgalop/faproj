import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerManagerRoutingModule } from './customer-manager-routing.module';
import { CustomerManagerComponent } from './customer-manager.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { DashboardCustomerComponent } from './dashboard-customer/dashboard-customer.component';


@NgModule({
  declarations: [
    CustomerManagerComponent,
    SearchCustomerComponent,
    UpdateCustomerComponent,
    DashboardCustomerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomerManagerRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CustomerManagerModule { }
