import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddCar } from '../interfaces/car/addCar.interface';
import { Car } from '../interfaces/car/car.interface';
import { UpdateCar } from '../interfaces/car/updateCar.interface';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseApiURL: string = environment.APIUrl;
  private apiURL = this.baseApiURL + '/api/Car';
  private complementPath!: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private readonly _httpClient: HttpClient) {}

  addCar(data : AddCar): Observable<any>{
    this.complementPath = 'AddCar'
    return this._httpClient.post(`${this.apiURL}/${this.complementPath}`, data).pipe(
        catchError(this.handleError)
    );
  }

  getCarByPlaque(plaque: string):Observable<Car>{
    this.complementPath = 'GetCar/'+ plaque;
    return this._httpClient.get<Car>(`${this.apiURL}/${this.complementPath}`).pipe(
      catchError(this.handleError));
  }

  updateCar(data : UpdateCar): Observable<any>{
    this.complementPath = 'UpdateCar'
    return this._httpClient.post(`${this.apiURL}/${this.complementPath}`, data).pipe(
        catchError(this.handleError)
    );
  }

  deleteCar(plaque: string):Observable<any>{
    this.complementPath = 'DeleteCar/'+ plaque;
    return this._httpClient.get(`${this.apiURL}/${this.complementPath}`).pipe(
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
