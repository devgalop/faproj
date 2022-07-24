import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchAccounting } from 'src/app/shared/interfaces/accounting/searchAccounting.interface';

@Component({
  selector: 'app-search-accounting',
  templateUrl: './search-accounting.component.html',
  styleUrls: ['./search-accounting.component.css']
})
export class SearchAccountingComponent implements OnInit {

  searchAccounting!: SearchAccounting;
  searchForm!: FormGroup;
  @Output() searchAccountingClick = new EventEmitter<SearchAccounting>();

  constructor(private readonly _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.initForm();
  }

  searchReportAccounting(): void {
    this.searchAccounting = {
      dateSelected: this.searchForm.controls['datePicked'].value,
      searchType: this.searchForm.controls['searchType'].value
    }
    console.log("Se guardara hará la busqueda");
    console.log(this.searchAccounting);
    this.searchForm = this.initForm();
    this.searchAccountingClick.emit(this.searchAccounting);
  }

  initForm():FormGroup{
    return this._formBuilder.group({
      datePicked: ['', [Validators.required]],
      searchType: ['', [Validators.required]]
    });
  }

}
