import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageComponent } from 'src/app/shared/interfaces/pageComponent.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pages!: PageComponent[]

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.pages = [
      { name: 'Reporte Ingresos/Egresos', description: 'Este módulo es el encargado de realizar la gestión de los ingresos y egresos de la compañía.', route: 'accounting', imageUrl: ''},
      { name: 'Clientes', description: 'Este módulo se encarga de la administración de los clientes', route: 'home', imageUrl: ''},
      { name: 'Facturación', description: 'Este módulo se encarga de la gestión de facturación.', route: 'home', imageUrl: ''}
    ]
  }

  goTo(route: string): void {
    console.log("redirigir a modulo: " + route);
    this._router.navigate([route])
  }

}
