import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Accounting } from '../interfaces/accounting/accounting.interface';
import { AddAccounting } from '../interfaces/accounting/addAccounting.interface';

@Injectable({
  providedIn: 'root',
})

export class AccountingService {
  private apiURL = '/api/Accounting';
  private complementPath!: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private readonly _httpClient: HttpClient) {}

  addAccountingFlow(data : AddAccounting): Observable<any>{
    this.complementPath = 'AddFlow'
    return this._httpClient.post(`${this.apiURL}/${this.complementPath}`, data).pipe(
        catchError(this.handleError)
    );
  }

  getAccountingByYear(year: number):Observable<Accounting[]>{
    this.complementPath = 'GetFlowByYear/'+ year;
    return this._httpClient.get<Accounting[]>(`${this.apiURL}/${this.complementPath}`).pipe(
      catchError(this.handleError));
  }

  getAccountingByMonth(month: number):Observable<Accounting[]>{
    this.complementPath = 'GetFlowByMonth/'+ month;
    return this._httpClient.get<Accounting[]>(`${this.apiURL}/${this.complementPath}`).pipe(
      catchError(this.handleError));
  }

  getAccountingByDate(year: number, month: number, day: number): Observable<Accounting[]>{
    this.complementPath = 'GetFlowByDate/'+ year + '/' + month + '/' + day;
    return this._httpClient.get<Accounting[]>(`${this.apiURL}/${this.complementPath}`).pipe(
      catchError(this.handleError));
  }

  modifyAccountingFlow(data: Accounting): Observable<any>{
    this.complementPath = 'ModifyFlow'
    return this._httpClient.put(`${this.apiURL}/${this.complementPath}`, data).pipe(
        catchError(this.handleError)
    );
  }

  deleteAccountingFlow(id:number):Observable<any>{
    this.complementPath = 'DeleteFlow/'+ id;
    return this._httpClient.delete(`${this.apiURL}/${this.complementPath}`).pipe(
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
