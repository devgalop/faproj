import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { Accounting } from 'src/app/shared/interfaces/accounting/accounting.interface';
import { AddAccounting } from 'src/app/shared/interfaces/accounting/addAccounting.interface';
import { AccountingService } from 'src/app/shared/services/accounting.service';

@Component({
  selector: 'app-create-accounting',
  templateUrl: './create-accounting.component.html',
  styleUrls: ['./create-accounting.component.css']
})
export class CreateAccountingComponent implements OnInit {
  addAccounting!: AddAccounting;
  addForm!: FormGroup;
  @Output() accountingAddedClick = new EventEmitter<Accounting[]>();

  constructor(private readonly _formBuilder : FormBuilder,
              private readonly _accountingSvc : AccountingService) 
  { }

  ngOnInit(): void {
    this.addForm = this.initForm();
  }

  saveAccounting(): void {
    this.addAccounting ={
      Description: this.addForm.controls['description'].value,
      CreatedAt: this.addForm.controls['datePicked'].value,
      FlowType: this.addForm.controls['accountingType'].value,
      Value: this.addForm.controls['value'].value
    }
    this.addForm = this.initForm();
    this._accountingSvc.addAccountingFlow(this.addAccounting)
        .pipe(
          tap((accounting:Accounting) =>{
            let monthSelected : number = this.addAccounting.CreatedAt.getMonth()+1;
            this._accountingSvc.getAccountingByMonth(monthSelected)
                .pipe(
                  tap((accountingResult: Accounting[]) => {
                    this.accountingAddedClick.emit(accountingResult);
                  })
                ).subscribe();
          })
        ).subscribe();
  }

  initForm():FormGroup {
    return this._formBuilder.group({
      datePicked: ['', [Validators.required]],
      description: [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      value: [0, [Validators.required, Validators.min(100)]],
      accountingType: ['', [Validators.required]]
    })
  }
}
