import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../model/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  private employeeService = inject(EmployeeService);
  private ref = inject(MatDialogRef<AddEmployeeComponent>);
  private toastrService = inject(ToastrService);

  myForm = new FormGroup({
    id: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    doj: new FormControl(new Date(), Validators.required),
    role: new FormControl('', Validators.required),
    salary: new FormControl(0, Validators.required),
  });

  saveForm() {
    if (this.myForm.controls.id.value == 0) {
      this.toastrService.warning('please change id number', 'warning');
    }
    if (this.myForm.valid && this.myForm.controls.id.value != 0) {
      let data: Employee = {
        id: this.myForm.controls.id.value as number,
        name: this.myForm.controls.name.value as string,
        doj: this.myForm.controls.doj.value as Date,
        role: this.myForm.controls.role.value as string,
        salary: this.myForm.controls.salary.value as number,
      };
      this.employeeService.create(data).subscribe({
        complete: () => {
          this.toastrService.success('Saved', 'Created');
          this.closePopup();
        },
      });
    }
  }

  closePopup() {
    this.ref.close();
  }
}
