import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Accounting } from 'src/app/shared/interfaces/accounting/Accounting.interface';
import { AddAccounting } from 'src/app/shared/interfaces/accounting/addAccounting.interface';
import { AccountingService } from 'src/app/shared/services/accounting.service';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})
export class AccountingComponent implements OnInit {
  accounting!:Accounting;
  addAccounting!: AddAccounting;
  showAddForm: boolean = false;
  addForm!: FormGroup;

  constructor(private readonly _formBuilder : FormBuilder,
    private readonly _accountingSvc : AccountingService) 
  { }

  ngOnInit(): void {
    this.addForm = this.initForm();
  }

  public showForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  public saveAccounting(): void {
    this.addAccounting ={
      Description: this.addForm.controls['description'].value,
      CreatedAt: this.addForm.controls['datePicked'].value,
      FlowType: this.addForm.controls['accountingType'].value,
      Value: this.addForm.controls['value'].value
    }
    console.log("Se guardara el nuevo registro de Ingresos/Egresos");
    console.log(this.addAccounting);
    this._accountingSvc.addAccountingFlow(this.addAccounting).subscribe();
    this.showForm();
    this.addForm = this.initForm();
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
