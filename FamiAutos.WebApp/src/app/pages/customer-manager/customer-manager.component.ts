import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Customer } from 'src/app/shared/interfaces/customer/customer.interface';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-customer-manager',
  templateUrl: './customer-manager.component.html',
  styleUrls: ['./customer-manager.component.css']
})
export class CustomerManagerComponent implements OnInit {
  showSearchForm:boolean = false;
  showAddForm:boolean = false;
  showDashboard:boolean = false;
  showUpdateForm:boolean = false;
  customerSelected!:Customer;

  constructor() { }

  ngOnInit(): void {
    
  }

  customerFound(customer : Customer) : void {
    console.log('Se encontró el cliente: ' + JSON.stringify(customer));
    this.customerSelected = customer;
    this.openDashboard();
  }

  customerRegistered(isSuccess : boolean) : void {
    if(isSuccess){
      this.openAddForm();
    }
  }

  customerUpdated(customer : Customer) : void {
    console.log('Cliente actualizado '+ JSON.stringify(customer));
    this.customerSelected = customer;
    this.openDashboard();
  }

  updateCustomer(customer: Customer) : void {
    console.log('Actualizar cliente: '+ JSON.stringify(customer));
    this.openUpdateForm();
  }

  openSearchForm():void{
    this.showSearchForm = !this.showSearchForm;
    if(this.showAddForm){
      this.showAddForm = !this.showAddForm;
    }
    if(this.showDashboard){
      this.showDashboard = !this.showDashboard;
    }
    if(this.showUpdateForm){
      this.showUpdateForm = !this.showUpdateForm;
    }
  }

  openAddForm():void{
    this.showAddForm = !this.showAddForm;
    if(this.showSearchForm){
      this.showSearchForm = !this.showSearchForm;
    }
    if(this.showDashboard){
      this.showDashboard = !this.showDashboard;
    }
    if(this.showUpdateForm){
      this.showUpdateForm = !this.showUpdateForm;
    }
  }

  openDashboard(): void{
    this.showDashboard = !this.showDashboard;
    if(this.showSearchForm){
      this.showSearchForm = !this.showSearchForm;
    }
    if(this.showAddForm){
      this.showAddForm = !this.showAddForm;
    }
    if(this.showUpdateForm){
      this.showUpdateForm = !this.showUpdateForm;
    }
  }

  openUpdateForm(): void{
    this.showUpdateForm = !this.showUpdateForm;
    if(this.showSearchForm){
      this.showSearchForm = !this.showSearchForm;
    }
    if(this.showAddForm){
      this.showAddForm = !this.showAddForm;
    }
    if(this.showDashboard){
      this.showDashboard = !this.showDashboard;
    }
  }

}
