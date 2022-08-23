import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tap } from 'rxjs';
import { Car } from 'src/app/shared/interfaces/car/car.interface';
import { Reparation } from 'src/app/shared/interfaces/reparation/reparation.interface';
import { CarService } from 'src/app/shared/services/car.service';
import { ReparationService } from 'src/app/shared/services/reparation.service';

@Component({
  selector: 'app-dashboard-car',
  templateUrl: './dashboard-car.component.html',
  styleUrls: ['./dashboard-car.component.css']
})
export class DashboardCarComponent implements OnInit {
  displayedColumns: string[] = ['Descripcion', 'Fecha Revisión' ,'Garantia (Meses)'];
  @Input() carSelected!:Car;
  @Output() updateCarClick = new EventEmitter<Car>();
  @Output() reparationDeletedClick = new EventEmitter<Car>();

  constructor(private readonly _reparationSvc : ReparationService,
              private readonly _carSvc : CarService) { }

  ngOnInit(): void {
  }

  updateCar(): void{
    this.updateCarClick.emit(this.carSelected);
  }

  modifyCarRevision(revision : Reparation): void {

  }

  deleteReparation(reparation : Reparation): void {
    if (confirm('Esta seguro que desea elminar este registro?')) {
      this._reparationSvc.deleteReparation(reparation.id)
          .pipe(
            tap((car : Car)=>{
              console.log('respuesta: '+car);
              this.reparationDeletedClick.emit(car);
            })
          ).subscribe();
    }
  }

}
