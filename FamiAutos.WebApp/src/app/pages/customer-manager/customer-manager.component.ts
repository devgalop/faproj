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
  showSearchForm:boolean = true;

  constructor(private readonly _customerSvc : CustomerService) { }

  ngOnInit(): void {
    
  }

}
