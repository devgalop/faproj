import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReparationService {

  private baseApiURL: string = environment.APIUrl;
  private apiURL = this.baseApiURL + '/api/Reparation';
  private complementPath!: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private readonly _httpClient: HttpClient) {}

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
