import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface employee {
  id: number;
  name: string;
  phone_number: string;
  city: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployesService {

  private apiUrl = 'http://localhost:7090/api/employees';

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<employee[]> {
    return this.http.get<employee[]>(this.apiUrl);
  }

  getEmployeeById(id: number): Observable<employee> {
    return this.http.get<employee>(`${this.apiUrl}/${id}`);
  }

  createEmployee(employee: employee): Observable<employee> {
    return this.http.post<employee>(this.apiUrl, employee);
  }

  updatEmployee(id: number, employee: employee): Observable<employee> {
    return this.http.put<employee>(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

