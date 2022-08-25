import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/shared/interfaces/car/car.interface';
import { Customer } from 'src/app/shared/interfaces/customer/customer.interface';
import { Reparation } from 'src/app/shared/interfaces/reparation/reparation.interface';

@Component({
  selector: 'app-customer-manager',
  templateUrl: './customer-manager.component.html',
  styleUrls: ['./customer-manager.component.css']
})
export class CustomerManagerComponent implements OnInit {
  showSearchForm:boolean = false;
  showAddForm:boolean = false;
  showAddCarForm:boolean = false;
  showAddReparationForm:boolean = false;
  showDashboard:boolean = false;
  showCarDashboard:boolean = false;
  showUpdateForm:boolean = false;
  showUpdateCarForm:boolean = false;
  showUpdateReparationForm:boolean = false;
  customerSelected!:Customer;
  carSelected!:Car;
  reparationSelected!:Reparation;

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

  updateReparation(reparation : Reparation){
    this.reparationSelected =reparation;
    this.openUpdateReparationForm();
  }

  assignCarToCustomer(customer: Customer) : void {
    this.openAddCarForm();
  }

  addReparationToCar(car:Car):void{
    this.openAddReparationForm();
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
    if(this.showAddReparationForm){
      this.showAddReparationForm = !this.showAddReparationForm;
    }
    if(this.showUpdateReparationForm){
      this.showUpdateReparationForm = !this.showUpdateReparationForm;
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
    if(this.showAddReparationForm){
      this.showAddReparationForm = !this.showAddReparationForm;
    }
    if(this.showUpdateReparationForm){
      this.showUpdateReparationForm = !this.showUpdateReparationForm;
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
    if(this.showAddReparationForm){
      this.showAddReparationForm = !this.showAddReparationForm;
    }
    if(this.showUpdateReparationForm){
      this.showUpdateReparationForm = !this.showUpdateReparationForm;
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
    if(this.showAddReparationForm){
      this.showAddReparationForm = !this.showAddReparationForm;
    }
    if(this.showUpdateReparationForm){
      this.showUpdateReparationForm = !this.showUpdateReparationForm;
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
    if(this.showAddReparationForm){
      this.showAddReparationForm = !this.showAddReparationForm;
    }
    if(this.showUpdateReparationForm){
      this.showUpdateReparationForm = !this.showUpdateReparationForm;
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
    if(this.showAddReparationForm){
      this.showAddReparationForm = !this.showAddReparationForm;
    }
    if(this.showUpdateReparationForm){
      this.showUpdateReparationForm = !this.showUpdateReparationForm;
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
    if(this.showAddReparationForm){
      this.showAddReparationForm = !this.showAddReparationForm;
    }
    if(this.showUpdateReparationForm){
      this.showUpdateReparationForm = !this.showUpdateReparationForm;
    }
  }

  openAddReparationForm():void{
    this.showAddReparationForm = !this.showAddReparationForm;
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
    if(this.showUpdateCarForm){
      this.showUpdateCarForm = !this.showUpdateCarForm;
    }
    if(this.showUpdateReparationForm){
      this.showUpdateReparationForm = !this.showUpdateReparationForm;
    }
  }

  openUpdateReparationForm():void{
    this.showUpdateReparationForm = !this.showUpdateReparationForm;
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
    if(this.showUpdateCarForm){
      this.showUpdateCarForm = !this.showUpdateCarForm;
    }
    if(this.showAddReparationForm){
      this.showAddReparationForm = !this.showAddReparationForm;
    }
  }

}
