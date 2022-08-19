import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { Customer } from 'src/app/shared/interfaces/customer/customer.interface';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit {
  searchType: string = 'Placa';
  searchParameter!: string;
  searchCustomerForm!: FormGroup;
  customerFound!:Customer;
  @Output() searchCustomerClick = new EventEmitter<Customer>();

  constructor(private readonly _formBuilder: FormBuilder, 
              private readonly _customerSvc: CustomerService) { }

  ngOnInit(): void {
    this.searchCustomerForm = this.initForm();
  }

  searchCustomer():void{
    this.searchParameter = this.searchCustomerForm.controls['searchText'].value;
    if(this.searchType == 'Nit'){
      console.log('Se buscará por Nit: '+ this.searchParameter);
      this._customerSvc.getCustomerByNit(this.searchParameter)
      .pipe(
        tap( (customer : Customer) => {
          this.customerFound = customer;
          console.log(this.customerFound);
          this.searchCustomerClick.emit(this.customerFound);
        })
      )
      .subscribe();
    }else{
      console.log('Se buscará por Placa: '+ this.searchParameter);
      this._customerSvc.getCustomerByCarPlaque(this.searchParameter)
      .pipe(
        tap( (customer : Customer) => {
          this.customerFound = customer;
          console.log(this.customerFound);
          this.searchCustomerClick.emit(this.customerFound);
        })
      )
      .subscribe();
    }
  }

  initForm():FormGroup{
    return this._formBuilder.group({
      searchText: ['', [Validators.required]]
    });
  }

}
