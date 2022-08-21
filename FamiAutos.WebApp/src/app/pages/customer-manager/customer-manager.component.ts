import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/shared/interfaces/car/car.interface';
import { Customer } from 'src/app/shared/interfaces/customer/customer.interface';

@Component({
  selector: 'app-customer-manager',
  templateUrl: './customer-manager.component.html',
  styleUrls: ['./customer-manager.component.css']
})
export class CustomerManagerComponent implements OnInit {
  showSearchForm:boolean = false;
  showAddForm:boolean = false;
  showAddCarForm:boolean = false;
  showDashboard:boolean = false;
  showCarDashboard:boolean = false;
  showUpdateForm:boolean = false;
  customerSelected!:Customer;
  carSelected!:Car;

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

  assignCarToCustomer(customer: Customer) : void {
    this.openAddCarForm();
  }

  carAddedToCustomer(customer: Customer): void {
    console.log('Cliente actualizado '+ JSON.stringify(customer));
    this.customerSelected = customer;
    this.openDashboard();
  }

  showCarView(carSelected : Car): void {
    this.carSelected = carSelected;
    this.openCarDashboard();
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
    if(this.showAddCarForm){
      this.showAddCarForm = !this.showAddCarForm;
    }
    if(this.showCarDashboard){
      this.showCarDashboard = !this.showCarDashboard;
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
    if(this.showAddCarForm){
      this.showAddCarForm = !this.showAddCarForm;
    }
    if(this.showCarDashboard){
      this.showCarDashboard = !this.showCarDashboard;
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
    if(this.showAddCarForm){
      this.showAddCarForm = !this.showAddCarForm;
    }
    if(this.showCarDashboard){
      this.showCarDashboard = !this.showCarDashboard;
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
    if(this.showAddCarForm){
      this.showAddCarForm = !this.showAddCarForm;
    }
    if(this.showCarDashboard){
      this.showCarDashboard = !this.showCarDashboard;
    }
  }

  openAddCarForm():void{
    this.showAddCarForm = !this.showAddCarForm;
    if(this.showSearchForm){
      this.showSearchForm = !this.showSearchForm;
    }
    if(this.showAddForm){
      this.showAddForm = !this.showAddForm;
    }
    if(this.showDashboard){
      this.showDashboard = !this.showDashboard;
    }
    if(this.showUpdateForm){
      this.showUpdateForm = !this.showUpdateForm;
    }
    if(this.showCarDashboard){
      this.showCarDashboard = !this.showCarDashboard;
    }
  }

  openCarDashboard():void{
    this.showCarDashboard = !this.showCarDashboard;
    if(this.showSearchForm){
      this.showSearchForm = !this.showSearchForm;
    }
    if(this.showAddForm){
      this.showAddForm = !this.showAddForm;
    }
    if(this.showDashboard){
      this.showDashboard = !this.showDashboard;
    }
    if(this.showUpdateForm){
      this.showUpdateForm = !this.showUpdateForm;
    }
    if(this.showAddCarForm){
      this.showAddCarForm = !this.showAddCarForm;
    }
  }

}
