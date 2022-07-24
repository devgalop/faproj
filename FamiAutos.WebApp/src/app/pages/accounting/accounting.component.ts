import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Accounting } from 'src/app/shared/interfaces/accounting/accounting.interface';
import { AddAccounting } from 'src/app/shared/interfaces/accounting/addAccounting.interface';
import { AccountingService } from 'src/app/shared/services/accounting.service';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})
export class AccountingComponent implements OnInit {
  existingAccounting!: Accounting[];
  showDashboardTable : boolean = false;
  showAddForm: boolean = false;

  constructor(private readonly _accountingSvc : AccountingService) 
  { }

  ngOnInit(): void {
    this._accountingSvc.getAccountingByYear(2022)
    .pipe(
      tap( (accounting : Accounting[]) => {
        this.existingAccounting = accounting;
        console.log(this.existingAccounting)
      })
    )
    .subscribe();
  }

  showForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  showTable(): void {
    this.showDashboardTable = !this.showDashboardTable;
  }

  saveAccounting(data : AddAccounting): void {
    console.log("Se agregara a la BD el registro:");
    console.log(data);
    this._accountingSvc.addAccountingFlow(data).subscribe();
    this.showForm();
    window.location.reload();
  }


}
