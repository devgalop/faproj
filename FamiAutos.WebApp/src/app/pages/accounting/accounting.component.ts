import { Component, OnInit } from '@angular/core';
import { AddAccounting } from 'src/app/shared/interfaces/accounting/addAccounting.interface';
import { AccountingService } from 'src/app/shared/services/accounting.service';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})
export class AccountingComponent implements OnInit {
  showAddForm: boolean = false;

  constructor(private readonly _accountingSvc : AccountingService) 
  { }

  ngOnInit(): void {
  }

  showForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  saveAccounting(data : AddAccounting): void {
    console.log("Se agregara a la BD el registro:");
    console.log(data);
    this._accountingSvc.addAccountingFlow(data).subscribe();
    this.showForm();
  }


}
