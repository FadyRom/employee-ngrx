import { createAction, props } from "@ngrx/store";
import { Employee } from "../model/employee.model";

const load_employee = '[employee] getall'
const load_employee_success = 'employee getall-success'
const load_employee_fail = 'employee getall-fail'

const delete_employee = '[employee] delete'
const delete_employee_Succeed = '[employee] delete-succ'

export const loadEmployee = createAction(load_employee)
export const loadEmployeeSuccess = createAction(load_employee_success,props<{list:Employee[]}>())
export const loadEmployeeFail = createAction(load_employee_fail,props<{err:string}>())

export const deleteEmployee = createAction(delete_employee,props<{empId:number}>())
export const deleteEmployeeSucc = createAction(delete_employee_Succeed,props<{empId:number}>())

export const emptyAction = createAction('empty')
