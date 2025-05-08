import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private httpClient = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/employee';

  getAll() {
    return this.httpClient.get<Employee[]>(this.apiUrl);
  }

  getEmployee(empId: number) {
    return this.httpClient.get<Employee>(`${this.apiUrl}/${empId}`);
  }

  create(data: Employee) {
    return this.httpClient.post(`${this.apiUrl}`, data);
  }

  update(data: Employee) {
    return this.httpClient.put(`${this.apiUrl}/${data.id}`, data);
  }

  delete(empId: number) {
    return this.httpClient.delete(`${this.apiUrl}/${empId}`);
  }
}
