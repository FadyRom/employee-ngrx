import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EmployeeModel } from "./employee.model";


const getEmployeeState = createFeatureSelector<EmployeeModel>('emp');

export const getEmployeeList = createSelector(getEmployeeState,(state)=>{
  return state.list
})
