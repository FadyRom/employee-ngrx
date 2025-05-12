import { createReducer, on } from '@ngrx/store';
import { employeeState } from './employee.state';
import {
  deleteEmployeeSucc,
  loadEmployeeFail,
  loadEmployeeSuccess,
} from './employee.actions';

const employeeReducer$ = createReducer(
  employeeState,
  on(loadEmployeeSuccess, (state, action) => {
    return {
      ...state,
      list: action.list,
      errorMessage: '',
    };
  }),
  on(loadEmployeeFail, (state, action) => {
    return {
      ...state,
      list: [],
      errorMessage: action.err,
    };
  }),
  on(deleteEmployeeSucc, (state, action) => {
    const newData = state.list.filter((o) => o.id != action.empId);
    return {
      ...state,
      list: newData,
      errorMessage: '',
    };
  })
);

export function employeeReducer(state: any, action: any) {
  return employeeReducer$(state, action);
}
