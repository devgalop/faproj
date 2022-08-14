import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Accounting } from 'src/app/shared/interfaces/accounting/accounting.interface';
import { AddAccounting } from 'src/app/shared/interfaces/accounting/addAccounting.interface';
import { SearchAccounting } from 'src/app/shared/interfaces/accounting/searchAccounting.interface';
import { AccountingService } from 'src/app/shared/services/accounting.service';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})
export class AccountingComponent implements OnInit {
  existingAccounting!: Accounting[];
  accountingSelected! : Accounting;
  showDashboardTable : boolean = false;
  showSearchForm: boolean = false;
  showAddForm: boolean = false;
  showUpdateForm: boolean = false;
  showButtons: boolean = true;
  total!:number;
  constructor(private readonly _accountingSvc : AccountingService) 
  { }

  ngOnInit(): void {
  }

  openAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  openSearchForm():void{
    this.showSearchForm = !this.showSearchForm;
    if(this.showDashboardTable){
      this.showDashboardTable = !this.showDashboardTable;
    }
  }

  openUpdateForm():void{
    this.showUpdateForm = !this.showUpdateForm;
    if(this.showDashboardTable){
      this.showDashboardTable = !this.showDashboardTable;
    }
    if(this.showAddForm){
      this.showAddForm = !this.showAddForm;
    }
    if(this.showButtons){
      this.showButtons = !this.showButtons;
    }
  }

  showMainButtons(): void {
    this.showButtons = !this.showButtons;
  }

  showTable(): void {
    this.showDashboardTable = !this.showDashboardTable;
  }

  saveAccounting(data : AddAccounting): void {
    console.log("Se agregara a la BD el registro:");
    console.log(data);
    this._accountingSvc.addAccountingFlow(data).subscribe();
    this.openAddForm();
    //window.location.reload();
  }

  saveAccountingModifiedRow(data : Accounting):void{
    console.log("Se modificará registro en BD:");
    console.log(data);
    this._accountingSvc.modifyAccountingFlow(data).subscribe();
    this.openUpdateForm();
    this.showMainButtons();
    //window.location.reload();
  }

  updateAccountingRow(data : Accounting):void{
    console.log("Se actualizará el dato "+ JSON.stringify(data));
    this.accountingSelected = data;
    this.openUpdateForm();
  }

  cancelUpdateAccounting(isCancelled:boolean):void{
    console.log("Actualizacion cancelada");
    this.openUpdateForm();
    this.showMainButtons();
  }

  searchAccounting(data : SearchAccounting):void{
    let daySelected: number = data.dateSelected.getDate();
    let monthSelected : number = data.dateSelected.getMonth()+1;
    let yearSelected : number = data.dateSelected.getFullYear();
    if(data.searchType === 'byDay'){
      console.log("Se hará la busqueda del día :" + data.dateSelected);
      this._accountingSvc.getAccountingByDate(yearSelected,monthSelected,daySelected)
      .pipe(
        tap( (accounting : Accounting[]) => {
          this.existingAccounting = accounting;
          console.log(this.existingAccounting);
          this.total = this.existingAccounting.
            reduce((accumulator, row) => {
              return (row.flowType === 0) ? accumulator + row.value : accumulator - row.value 
            }, 0);
        })
      )
      .subscribe();
    }else if(data.searchType === 'byMonth'){
      console.log("Se hará la busqueda del mes :" + monthSelected);
      this._accountingSvc.getAccountingByMonth(monthSelected)
      .pipe(
        tap( (accounting : Accounting[]) => {
          this.existingAccounting = accounting;
          console.log(this.existingAccounting);
          this.total = this.existingAccounting.
            reduce((accumulator, row) => {
              return (row.flowType === 0) ? accumulator + row.value : accumulator - row.value 
            }, 0);
        })
      )
      .subscribe();
    }else{
      console.log("Se hará la busqueda del año :" + yearSelected);
      this._accountingSvc.getAccountingByYear(yearSelected)
      .pipe(
        tap( (accounting : Accounting[]) => {
          this.existingAccounting = accounting;
          console.log(this.existingAccounting);
          this.total = this.existingAccounting.
            reduce((accumulator, row) => {
              return (row.flowType === 0) ? accumulator + row.value : accumulator - row.value 
            }, 0);
        })
      )
      .subscribe();
    }
    this.openSearchForm();
    this.showTable();
  }


}
