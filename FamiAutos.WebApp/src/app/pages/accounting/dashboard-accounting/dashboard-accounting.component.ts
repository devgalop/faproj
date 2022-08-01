import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Accounting } from 'src/app/shared/interfaces/accounting/accounting.interface';
import { AccountingService } from 'src/app/shared/services/accounting.service';


@Component({
  selector: 'app-dashboard-accounting',
  templateUrl: './dashboard-accounting.component.html',
  styleUrls: ['./dashboard-accounting.component.css']
})
export class DashboardAccountingComponent implements OnInit {

  @Input() accountingRows!:Accounting[]
  @Input() total!:number;
  @Output() updateAccountingRowClick = new EventEmitter<Accounting>();
  displayedColumns= ['Fecha', 'Descripcion', 'Tipo', 'Valor', 'Acciones']

  constructor(private readonly _accountingSvc : AccountingService) { }

  ngOnInit(): void {
  }

  OnUpdate(data: Accounting): void {
    console.log('Actualizar objeto: ' + JSON.stringify(data));
    this.updateAccountingRowClick.emit(data);
  }

  OnDelete(data: Accounting): void {
    console.log('Eliminar objeto: ' + JSON.stringify(data));
    if (confirm('Esta seguro que desea elminar este registro?')) {
      this._accountingSvc.deleteAccountingFlow(data.id).subscribe();
      window.location.reload();
    }
  }

}
