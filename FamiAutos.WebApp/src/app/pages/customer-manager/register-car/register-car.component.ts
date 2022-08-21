import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { AddCar } from 'src/app/shared/interfaces/car/addCar.interface';
import { Customer } from 'src/app/shared/interfaces/customer/customer.interface';
import { CarService } from 'src/app/shared/services/car.service';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-register-car',
  templateUrl: './register-car.component.html',
  styleUrls: ['./register-car.component.css']
})
export class RegisterCarComponent implements OnInit {
  addCarModel!:AddCar;
  registerCarForm!: FormGroup;
  customerUpdated!:Customer;
  @Input() customerSelected!: Customer;
  @Output() customerUpdatedClick = new EventEmitter<Customer>();

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _carService: CarService,
              private readonly _customerService: CustomerService) { }

  ngOnInit(): void {
    this.registerCarForm = this.initForm();
  }

  registerCar():void{
    this.addCarModel={
      Plaque:this.registerCarForm.controls['plaque'].value,
      Model: this.registerCarForm.controls['model'].value,
      Brand: this.registerCarForm.controls['brand'].value,
      OwnerId:this.customerSelected.id
    }
    console.log('El nuevo auto es: '+ JSON.stringify(this.addCarModel));
    this._carService.addCar(this.addCarModel).pipe(
      tap(()=>{
        this._customerService.getCustomerByNit(this.customerSelected.nit)
            .pipe(
              tap( (customer : Customer) => {
                this.customerUpdated = customer;
                console.log(this.customerUpdated);
                this.customerUpdatedClick.emit(this.customerUpdated);
              })
            ).subscribe();
      })
    )
    .subscribe();
  }

  initForm():FormGroup {
    return this._formBuilder.group({
      plaque:['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      model:['',[]],
      brand:['',[]]
    })
  }

}
