import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerManagerRoutingModule } from './customer-manager-routing.module';
import { CustomerManagerComponent } from './customer-manager.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { DashboardCustomerComponent } from './dashboard-customer/dashboard-customer.component';
import { RegisterCustomerComponent } from './register-customer/register-customer.component';
import { RegisterCarComponent } from './register-car/register-car.component';
import { UpdateCarComponent } from './update-car/update-car.component';
import { DashboardCarComponent } from './dashboard-car/dashboard-car.component';
import { AddReparationComponent } from './add-reparation/add-reparation.component';
import { UpdateReparationComponent } from './update-reparation/update-reparation.component';


@NgModule({
  declarations: [
    CustomerManagerComponent,
    RegisterCustomerComponent,
    SearchCustomerComponent,
    UpdateCustomerComponent,
    DashboardCustomerComponent,
    RegisterCarComponent,
    UpdateCarComponent,
    DashboardCarComponent,
    AddReparationComponent,
    UpdateReparationComponent
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
