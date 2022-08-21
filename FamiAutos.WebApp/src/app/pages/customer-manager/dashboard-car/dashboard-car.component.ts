import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/shared/interfaces/car/car.interface';

@Component({
  selector: 'app-dashboard-car',
  templateUrl: './dashboard-car.component.html',
  styleUrls: ['./dashboard-car.component.css']
})
export class DashboardCarComponent implements OnInit {
  displayedColumns: string[] = ['Descripcion', 'Fecha Revisión' ,'Garantia (Meses)'];
  @Input() carSelected!:Car;

  constructor() { }

  ngOnInit(): void {
  }

}
