import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../interfaces/car/car.interface';
import { AddReparation } from '../interfaces/reparation/addReparation.interface';
import { Reparation } from '../interfaces/reparation/reparation.interface';
import { UpdateReparation } from '../interfaces/reparation/updateReparation.interface';

@Injectable({
  providedIn: 'root'
})
export class ReparationService {

  private baseApiURL: string = environment.APIUrl;
  private apiURL = this.baseApiURL + '/api/Reparation';
  private complementPath!: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private readonly _httpClient: HttpClient) {}

  addReparation(data : AddReparation): Observable<any>{
    this.complementPath = 'AddReparation'
    return this._httpClient.post(`${this.apiURL}/${this.complementPath}`, data).pipe(
        catchError(this.handleError)
    );
  }

  getReparation(id: number):Observable<Reparation>{
    this.complementPath = 'GetReparation/'+ id;
    return this._httpClient.get<Reparation>(`${this.apiURL}/${this.complementPath}`).pipe(
      catchError(this.handleError));
  }

  getAllReparationsByCarPlaque(plaque: string):Observable<Reparation[]>{
    this.complementPath = 'GetAllByCar/'+ plaque;
    return this._httpClient.get<Reparation[]>(`${this.apiURL}/${this.complementPath}`).pipe(
      catchError(this.handleError));
  }

  updateReparation(data : UpdateReparation): Observable<any>{
    this.complementPath = 'UpdateReparation'
    return this._httpClient.post(`${this.apiURL}/${this.complementPath}`, data).pipe(
        catchError(this.handleError)
    );
  }

  deleteReparation(id: number):Observable<Car>{
    this.complementPath = 'DeleteReparation/'+ id;
    return this._httpClient.get<Car>(`${this.apiURL}/${this.complementPath}`).pipe(
      catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        console.error('A ocurrido un error:', error.error.message);
    } else {
        console.error(
        `Backend ha retornado el codigo: ${error.status}, ` +
        `Mensaje: ${error.error}`);
    }
    return throwError(
        'A ocurrido un error inesperado, por favor intente más tarde');
  };
}
