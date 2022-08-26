import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Accounting } from 'src/app/shared/interfaces/accounting/accounting.interface';
import { AccountingService } from 'src/app/shared/services/accounting.service';

@Component({
  selector: 'app-update-accounting',
  templateUrl: './update-accounting.component.html',
  styleUrls: ['./update-accounting.component.css']
})
export class UpdateAccountingComponent implements OnInit {
  @Input() actualAccounting!:Accounting;
  @Output() saveAccountingModified = new EventEmitter<Accounting[]>();
  @Output() cancelUpdateAccounting = new EventEmitter<boolean>();
  accountingModified!:Accounting;
  updateForm!:FormGroup;

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _accountingSvc : AccountingService){}

  ngOnInit(): void {
    this.updateForm = this.initForm();
  }

  updateAccounting():void{
    this.accountingModified = {
      id: this.actualAccounting.id,
      description: this.updateForm.controls['description'].value,
      createdAt: this.updateForm.controls['datePicked'].value,
      flowType: this.updateForm.controls['accountingType'].value,
      value: this.updateForm.controls['value'].value
    }
    this._accountingSvc.modifyAccountingFlow(this.accountingModified)
        .pipe(
          tap((accounting: Accounting)=>{
            let monthSelected : number = new Date(this.actualAccounting.createdAt).getMonth()+1;
            this._accountingSvc.getAccountingByMonth(monthSelected)
                .pipe(
                  tap((accountingResult: Accounting[]) => {
                    this.saveAccountingModified.emit(accountingResult);
                  })
                ).subscribe();
          })
        ).subscribe();
  }

  cancelUpdate():void {
    console.log("cancel");
    this.cancelUpdateAccounting.emit(true);
  }

  initForm():FormGroup {
    return this._formBuilder.group({
      datePicked: [this.actualAccounting.createdAt, [Validators.required]],
      description: [ this.actualAccounting.description, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      value: [this.actualAccounting.value, [Validators.required, Validators.min(100)]],
      accountingType: [this.actualAccounting.flowType, [Validators.required]]
    })
  }

}
