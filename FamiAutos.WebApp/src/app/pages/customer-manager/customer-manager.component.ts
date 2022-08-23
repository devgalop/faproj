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
  showUpdateCarForm:boolean = false;
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

  updateCar(car : Car) : void {
    this.carSelected = car;
    this.openUpdateCarForm();
  }

  carUpdated(car : Car): void {
    this.carSelected = car;
    this.openCarDashboard();
  }

  reparationDeleted(car: Car): void {
    this.carSelected = car;
    console.log('carro actualizado: '+ JSON.stringify(car));
    this.openCarDashboard();
    this.openCarDashboard();
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
    if(this.showUpdateCarForm){
      this.showUpdateCarForm = !this.showUpdateCarForm;
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
    if(this.showUpdateCarForm){
      this.showUpdateCarForm = !this.showUpdateCarForm;
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
    if(this.showUpdateCarForm){
      this.showUpdateCarForm = !this.showUpdateCarForm;
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
    if(this.showUpdateCarForm){
      this.showUpdateCarForm = !this.showUpdateCarForm;
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
    if(this.showUpdateCarForm){
      this.showUpdateCarForm = !this.showUpdateCarForm;
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
    if(this.showUpdateCarForm){
      this.showUpdateCarForm = !this.showUpdateCarForm;
    }
  }

  openUpdateCarForm():void{
    this.showUpdateCarForm = !this.showUpdateCarForm;
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
    if(this.showCarDashboard){
      this.showCarDashboard = !this.showCarDashboard;
    }
  }

}
