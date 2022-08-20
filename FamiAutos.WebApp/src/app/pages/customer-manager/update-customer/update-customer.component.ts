import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { Customer } from 'src/app/shared/interfaces/customer/customer.interface';
import { UpdateCustomer } from 'src/app/shared/interfaces/customer/updateCustomer.interface';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  updateCustomerForm!: FormGroup;
  customerToBeUpdated!: UpdateCustomer;
  customerUpdated!: Customer;
  @Input() customerSelected!: Customer;
  @Output() customerUpdatedClick = new EventEmitter<Customer>();

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _customerService: CustomerService) { }

  ngOnInit(): void {
    this.updateCustomerForm = this.initForm();
  }

  updateCustomer():void{
    this.customerToBeUpdated = {
      Id: this.customerSelected.id,
      Name: this.updateCustomerForm.controls['name'].value,
      Cellphone: this.updateCustomerForm.controls['cellphone'].value,
      Address: this.updateCustomerForm.controls['address'].value
    }
    console.log('Objeto de cliente a actualizar '+ JSON.stringify(this.customerToBeUpdated));
    this._customerService.updateCustomer(this.customerToBeUpdated)
    .pipe(
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
      id:[this.customerSelected.id, [Validators.required]],
      name: [this.customerSelected.name, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      nit: [ this.customerSelected.nit, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      cellphone: [this.customerSelected.cellphone, [Validators.minLength(7),Validators.maxLength(13)]],
      email: [this.customerSelected.email, [Validators.email]],
      address: [this.customerSelected.address, []]
    })
  }

}
