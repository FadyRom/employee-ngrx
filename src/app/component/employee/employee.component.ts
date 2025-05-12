import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Employee } from '../../model/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { deleteEmployee, loadEmployee } from '../../store/employee.actions';
import { getEmployeeList } from '../../store/employee.selectors';

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
export class EmployeeComponent implements OnInit, OnDestroy {
  private matDialog = inject(MatDialog);
  // private employeeService = inject(EmployeeService);
  private store = inject(Store);

  private subs: Subscription = new Subscription();

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
    const sub = this.getAllEmployee();

    this.subs.add(sub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    console.log('destroyed');
  }

  getAllEmployee() {
    // return this.employeeService.getAll().pipe(
    //   tap({
    //     next: (employees) => {
    //       this.empList.set(employees);
    //     },
    //     complete: () => {
    //       this.dataSource = new MatTableDataSource(this.empList());
    //     },
    //   })
    // ).subscribe();
    this.store.dispatch(loadEmployee());
    this.store.select(getEmployeeList).subscribe((employees) => {
      this.empList.set(employees);
      this.dataSource = new MatTableDataSource(this.empList());
    });
  }

  deleteEmployee(empId: number) {
    // const sub = this.employeeService.delete(empId).subscribe(() => {
    //   this.getAllEmployee();
    // });

    // this.subs.add(sub)

    this.store.dispatch(deleteEmployee({ empId: empId }));
  }
  editEmployee(emp: Employee) {
    this.openPopup(emp.id);
  }

  addEmployee() {
    this.openPopup(0);
  }

  openPopup(empId: number) {
    const sub = this.matDialog
      .open(AddEmployeeComponent, {
        width: '50%',
        exitAnimationDuration: '500ms',
        enterAnimationDuration: '1000ms',
        data: {
          code: empId,
        },
      })
      .afterClosed()
      .subscribe(() => this.getAllEmployee());
    this.subs.add(sub);
  }
}
