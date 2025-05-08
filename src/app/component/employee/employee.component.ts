import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Employee } from '../../model/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { tap } from 'rxjs';

@Component({
  selector: 'app-employee',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  private matDialog = inject(MatDialog);
  private employeeService = inject(EmployeeService);
  private destroyRef = inject(DestroyRef);

  empList = signal<Employee[]>([]);
  dataSource!: MatTableDataSource<Employee>;
  displayedColumns = signal<string[]>([
    'id',
    'name',
    'role',
    'doj',
    'salary',
    'action',
  ]);

  ngOnInit(): void {
    const sub = this.getAllEmployee().subscribe();

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }
  getAllEmployee() {
    return this.employeeService.getAll().pipe(
      tap({
        next: (employees) => {
          this.empList.set(employees);
        },
        complete: () => {
          this.dataSource = new MatTableDataSource(this.empList());
        },
      })
    );
  }

  deleteEmployee(empId: number) {
    return this.employeeService.delete(empId).subscribe(() => {
      this.getAllEmployee().subscribe();
    });
  }
  editEmployee(emp: Employee) {
    return this.employeeService.update(emp).subscribe();
  }

  addEmployee() {
    this.matDialog
      .open(AddEmployeeComponent, {
        width: '50%',
        exitAnimationDuration: '500ms',
        enterAnimationDuration: '1000ms',
      })
      .afterClosed()
      .subscribe(() => this.getAllEmployee().subscribe());
  }
}
