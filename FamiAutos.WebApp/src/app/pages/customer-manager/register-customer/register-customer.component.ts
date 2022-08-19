import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddCustomer } from 'src/app/shared/interfaces/customer/addCustomer.interface';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css']
})
export class RegisterCustomerComponent implements OnInit {
  registerCustomerForm!: FormGroup;
  newCustomer!: AddCustomer;
  @Output() customerRegisteredClick = new EventEmitter<boolean>();

  constructor(private readonly _formBuilder : FormBuilder,
              private readonly _customerSvc: CustomerService) { }

  ngOnInit(): void {
    this.registerCustomerForm = this.initForm();
  }

  registerCustomer(): void {
    this.newCustomer = {
      Name: this.registerCustomerForm.controls['name'].value,
      Nit: this.registerCustomerForm.controls['nit'].value,
      Email: this.registerCustomerForm.controls['email'].value,
      Cellphone: this.registerCustomerForm.controls['cellphone'].value,
      Address: this.registerCustomerForm.controls['address'].value
    }
    console.log('Cliente que se añadirá a la BD: '+ JSON.stringify(this.newCustomer));
    this._customerSvc.addCustomer(this.newCustomer).subscribe();
    this.registerCustomerForm = this.initForm();
    this.customerRegisteredClick.emit(true);
  }

  initForm():FormGroup {
    return this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      nit: [ '', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      cellphone: ['', []],
      email: ['', [Validators.required, Validators.email]],
      address: ['', []]
    })
  }

}
