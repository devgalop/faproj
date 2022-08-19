import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/shared/interfaces/customer/customer.interface';

@Component({
  selector: 'app-dashboard-customer',
  templateUrl: './dashboard-customer.component.html',
  styleUrls: ['./dashboard-customer.component.css']
})
export class DashboardCustomerComponent implements OnInit {
  displayedColumns:string[] = ["Placa", "Modelo", "Marca",""]
  @Input() customerSelected!:Customer;

  constructor() { }

  ngOnInit(): void {
  }

}
