import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  
  
  constructor(private readonly _formBuilder: FormBuilder, 
              private readonly _customerSvc: CustomerService) { }

  ngOnInit(): void {
    this.searchCustomerForm = this.initForm();
  }

  searchCustomer():void{
    this.searchParameter = this.searchCustomerForm.controls['searchText'].value
    if (this.searchType == 'Email') {
      console.log('Se buscará por Email: '+ this.searchParameter);
      
    }else if(this.searchType == 'Nit'){
      console.log('Se buscará por Nit: '+ this.searchParameter);
    }else{
      console.log('Se buscará por Placa: '+ this.searchParameter);
    }
  }

  initForm():FormGroup{
    return this._formBuilder.group({
      searchText: ['', [Validators.required]]
    });
  }

}
