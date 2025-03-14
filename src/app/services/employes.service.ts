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

  // Get all clients
  getAllEmployees(): Observable<employee[]> {
    return this.http.get<employee[]>(this.apiUrl);
  }

  // Get a client by ID
  getEmployeeById(id: number): Observable<employee> {
    return this.http.get<employee>(`${this.apiUrl}/${id}`);
  }

  // Create a new client
  createEmployee(employee: employee): Observable<employee> {
    return this.http.post<employee>(this.apiUrl, employee);
  }

  // Update an existing client
  updatEmployee(id: number, employee: employee): Observable<employee> {
    return this.http.put<employee>(`${this.apiUrl}/${id}`, employee);
  }

  // Delete a client
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

