import { Component, Input, OnInit } from '@angular/core';
import { Accounting } from 'src/app/shared/interfaces/accounting/accounting.interface';

@Component({
  selector: 'app-dashboard-accounting',
  templateUrl: './dashboard-accounting.component.html',
  styleUrls: ['./dashboard-accounting.component.css']
})
export class DashboardAccountingComponent implements OnInit {

  @Input() accountingRows!:Accounting[]
  displayedColumns= ['Fecha', 'Descripcion', 'Tipo', 'Valor', 'Acciones']
  constructor() { }

  ngOnInit(): void {
  }

}
