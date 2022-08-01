import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { AccountingComponent } from './accounting.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CreateAccountingComponent } from './create-accounting/create-accounting.component';
import { DashboardAccountingComponent } from './dashboard-accounting/dashboard-accounting.component';
import { SearchAccountingComponent } from './search-accounting/search-accounting.component';
import { UpdateAccountingComponent } from './update-accounting/update-accounting.component';


@NgModule({
  declarations: [
    AccountingComponent,
    CreateAccountingComponent,
    DashboardAccountingComponent,
    SearchAccountingComponent,
    UpdateAccountingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    AccountingRoutingModule,
    ReactiveFormsModule
  ]
})
export class AccountingModule { }
