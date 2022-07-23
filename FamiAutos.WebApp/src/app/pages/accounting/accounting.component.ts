import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})
export class AccountingComponent implements OnInit {

  isAddingAccounting: boolean = false;
  addForm!: FormGroup;

  constructor(private readonly _formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.addForm = this.initForm();
  }

  public AddAccounting(): void {
    this.isAddingAccounting = !this.isAddingAccounting;
    console.log(this.isAddingAccounting);
  }

  public saveAccounting(): void {
    this.isAddingAccounting = !this.isAddingAccounting;
    console.log(this.isAddingAccounting);
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
