import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Accountant {
  id?: number;
  name: string;
  email: string;
  phone: string;
  city: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

@Injectable({
  providedIn: 'root'
})
export class AccountantService {
  private apiUrl = 'http://localhost:4200';

  constructor(private http: HttpClient) { }

  getAccountants(page: number = 1): Observable<PaginatedResponse<Accountant>> {
    let params = new HttpParams().set('page', page.toString());
    return this.http.get<PaginatedResponse<Accountant>>(this.apiUrl, { params });
  }

  addAccountant(accountant: Accountant): Observable<Accountant> {
    return this.http.post<Accountant>(this.apiUrl, accountant);
  }

  updateAccountant(id: number, accountant: Accountant): Observable<Accountant> {
    return this.http.put<Accountant>(`${this.apiUrl}${id}/`, accountant);
  }

  deleteAccountant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}