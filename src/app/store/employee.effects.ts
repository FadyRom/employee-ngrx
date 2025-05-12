import { inject, Injectable } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  deleteEmployee,
  deleteEmployeeSucc,
  emptyAction,
  loadEmployee,
  loadEmployeeFail,
  loadEmployeeSuccess,
} from './employee.actions';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class EmpEffect {
  private actions$ = inject(Actions);
  private employeeService = inject(EmployeeService);
  private toastrService = inject(ToastrService);

  loadEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEmployee),
      exhaustMap((action) => {
        return this.employeeService.getAll().pipe(
          map((data) => {
            return loadEmployeeSuccess({ list: data });
          }),
          catchError((err) => of(loadEmployeeFail({ err: err })))
        );
      })
    )
  );

  deleteEmployee = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteEmployee),
      switchMap((action) => {
        return this.employeeService.delete(action.empId).pipe(
          switchMap((data) => {
            return of(
              deleteEmployeeSucc({ empId: action.empId }),
              this.showAlert('deleted', 'pass')
            );
          }),
          catchError((err) => of(this.showAlert(err.message, 'fail')))
        );
      })
    )
  );

  showAlert(message: string, res: string) {
    if (res === 'pass') {
      this.toastrService.success(message);
    } else {
      this.toastrService.error(message);
    }

    return emptyAction;
  }
}
