import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Accountant {
  id?: number;
  name: string;
  phone: string;
  email: string;
  city: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountantService {
  private baseUrl = 'http://localhost:7090/api/accountants'; 

  constructor(private http: HttpClient) { }

  getAllAccountants(): Observable<Accountant[]> {
    return this.http.get<Accountant[]>(this.baseUrl);
  }

  getAccountantById(id: number): Observable<Accountant> {
    return this.http.get<Accountant>(`${this.baseUrl}/${id}`);
  }

  addAccountant(accountant: Accountant): Observable<Accountant> {
    return this.http.post<Accountant>(this.baseUrl, accountant);
  }

  updateAccountant(id: number, accountant: Accountant): Observable<Accountant> {
    return this.http.put<Accountant>(`${this.baseUrl}/${id}`, accountant);
  }

  deleteAccountant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
