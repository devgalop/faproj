import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddAccounting } from 'src/app/shared/interfaces/accounting/addAccounting.interface';

@Component({
  selector: 'app-create-accounting',
  templateUrl: './create-accounting.component.html',
  styleUrls: ['./create-accounting.component.css']
})
export class CreateAccountingComponent implements OnInit {
  
  addAccounting!: AddAccounting;
  addForm!: FormGroup;

  @Output() addAccountingClick = new EventEmitter<AddAccounting>();

  constructor(private readonly _formBuilder : FormBuilder) 
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
    console.log("Se guardara el nuevo registro de Ingresos/Egresos");
    console.log(this.addAccounting);
    this.addForm = this.initForm();
    this.addAccountingClick.emit(this.addAccounting);
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
