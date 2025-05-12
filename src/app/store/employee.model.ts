import { Employee } from "../model/employee.model";

export interface EmployeeModel{
  list:Employee[];
  errorMessage:string;
}
