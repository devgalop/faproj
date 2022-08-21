import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car } from 'src/app/shared/interfaces/car/car.interface';
import { tap } from 'rxjs';
import { Customer } from 'src/app/shared/interfaces/customer/customer.interface';
import { CarService } from 'src/app/shared/services/car.service';

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
  @Output() showCarViewClick = new EventEmitter<Car>();

  constructor(private readonly _carSvc: CarService) { }

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

  showCarView(carSelected: Car): void {
    console.log('Ver Auto '+ JSON.stringify(carSelected));
    this._carSvc.getCarByPlaque(carSelected.plaque)
        .pipe(
          tap((car : Car) => {
            console.log('Auto encontrado: '+ JSON.stringify(car));
            this.showCarViewClick.emit(car);
          })
        ).subscribe();
    
  }

}
