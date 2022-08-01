import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Accounting } from 'src/app/shared/interfaces/accounting/accounting.interface';
import { AccountingService } from 'src/app/shared/services/accounting.service';

@Component({
  selector: 'app-update-accounting',
  templateUrl: './update-accounting.component.html',
  styleUrls: ['./update-accounting.component.css']
})
export class UpdateAccountingComponent implements OnInit {

  @Input() actualAccounting!:Accounting;
  @Output() saveAccountingModified = new EventEmitter<Accounting>();
  @Output() cancelUpdateAccounting = new EventEmitter<boolean>();
  accountingModified!:Accounting;
  updateForm!:FormGroup;

  constructor(private readonly _formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.updateForm = this.initForm();
    console.log("data seleccionada: " + JSON.stringify(this.actualAccounting));
  }

  updateAccounting():void{
    this.accountingModified = {
      id: this.updateForm.controls['id'].value,
      description: this.updateForm.controls['description'].value,
      createdAt: this.updateForm.controls['datePicked'].value,
      flowType: this.updateForm.controls['accountingType'].value,
      value: this.updateForm.controls['value'].value
    }
    console.log("modificado "+ JSON.stringify(this.accountingModified));
    this.saveAccountingModified.emit(this.accountingModified);
  }

  cancelUpdate():void {
    console.log("cancel");
    this.cancelUpdateAccounting.emit(true);
  }

  initForm():FormGroup {
    return this._formBuilder.group({
      id:[this.actualAccounting.id, [Validators.required, Validators.minLength(1)]],
      datePicked: [this.actualAccounting.createdAt, [Validators.required]],
      description: [ this.actualAccounting.description, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      value: [this.actualAccounting.value, [Validators.required, Validators.min(100)]],
      accountingType: [this.actualAccounting.flowType, [Validators.required]]
    })
  }

}
