import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { AccountingComponent } from './accounting.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from '../../material.module';


@NgModule({
  declarations: [
    AccountingComponent
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
