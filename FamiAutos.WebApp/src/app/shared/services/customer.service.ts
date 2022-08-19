import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddCustomer } from '../interfaces/customer/addCustomer.interface';
import { Customer } from '../interfaces/customer/customer.interface';
import { UpdateCustomer } from '../interfaces/customer/updateCustomer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseApiURL: string = environment.APIUrl;
  private apiURL = this.baseApiURL + '/api/Customer';
  private complementPath!: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private readonly _httpClient: HttpClient) {}

  addCustomer(data : AddCustomer): Observable<any>{
    this.complementPath = 'Register'
    return this._httpClient.post(`${this.apiURL}/${this.complementPath}`, data).pipe(
        catchError(this.handleError)
    );
  }

  getCustomerByEmail(email: string):Observable<Customer>{
    this.complementPath = 'GetCustomerByEmail/'+ email;
    return this._httpClient.get<Customer>(`${this.apiURL}/${this.complementPath}`).pipe(
      catchError(this.handleError));
  }

  getCustomerByNit(nit: string):Observable<Customer>{
    this.complementPath = 'GetCustomerByNit/'+ nit;
    return this._httpClient.get<Customer>(`${this.apiURL}/${this.complementPath}`).pipe(
      catchError(this.handleError));
  }

  getCustomerByCarPlaque(plaque: string):Observable<Customer>{
    this.complementPath = 'GetCustomerByCarPlaque/'+ plaque;
    return this._httpClient.get<Customer>(`${this.apiURL}/${this.complementPath}`).pipe(
      catchError(this.handleError));
  }

  updateCustomer(data : UpdateCustomer): Observable<any>{
    this.complementPath = 'Update'
    return this._httpClient.post(`${this.apiURL}/${this.complementPath}`, data).pipe(
        catchError(this.handleError)
    );
  }

  deleteCustomer(customerId: string):Observable<any>{
    this.complementPath = 'Delete/'+ customerId;
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
