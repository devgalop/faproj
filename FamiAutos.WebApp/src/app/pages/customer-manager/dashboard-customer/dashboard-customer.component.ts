import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from 'src/app/shared/interfaces/customer/customer.interface';

@Component({
  selector: 'app-dashboard-customer',
  templateUrl: './dashboard-customer.component.html',
  styleUrls: ['./dashboard-customer.component.css']
})
export class DashboardCustomerComponent implements OnInit {
  displayedColumns:string[] = ["Placa", "Modelo", "Marca",""]
  @Input() customerSelected!:Customer;
  @Output() updateCustomerClick = new EventEmitter<Customer>();
  @Output() assignCarToCustomerClick = new EventEmitter<Customer>();

  constructor() { }

  ngOnInit(): void {
  }

  updateCustomer():void{
    console.log('Se actualizará el cliente '+ JSON.stringify(this.customerSelected));
    this.updateCustomerClick.emit(this.customerSelected);
  }

  assignCarToCustomer():void {
    console.log('Se añadirá un nuevo auto al cliente '+ JSON.stringify(this.customerSelected));
    this.assignCarToCustomerClick.emit(this.customerSelected);
  }

}
