import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Customer } from 'src/app/shared/interfaces/customer/customer.interface';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-customer-manager',
  templateUrl: './customer-manager.component.html',
  styleUrls: ['./customer-manager.component.css']
})
export class CustomerManagerComponent implements OnInit {
  showSearchForm:boolean = false;
  showAddForm:boolean = false;

  constructor() { }

  ngOnInit(): void {
    
  }

  customerFound(customer : Customer) : void {
    console.log('Se encontró el cliente: ' + JSON.stringify(customer));
    this.openSearchForm();
  }

  customerRegistered(isSuccess : boolean) : void {
    if(isSuccess){
      this.openAddForm();
    }
  }

  openSearchForm():void{
    this.showSearchForm = !this.showSearchForm;
    if(this.showAddForm){
      this.showAddForm = !this.showAddForm;
    }
  }

  openAddForm():void{
    this.showAddForm = !this.showAddForm;
    if(this.showSearchForm){
      this.showSearchForm = !this.showSearchForm;
    }
  }

}
