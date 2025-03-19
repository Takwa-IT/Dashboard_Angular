import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { EmployesService, employee } from '../services/employes.service';
@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {

  employee: employee[] = []; 
  searchQuery: string = '';
  isSearchActive: boolean = false;

  constructor(
    private EmployesService: EmployesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadEmployee(); 
  }

  loadEmployee(): void {
    this.EmployesService.getAllEmployees().subscribe({
      next: (data) => (this.employee = data),
      error: (err) => console.error('Failed to load employees:', err)
    });
  }

  addEmployee(): void {
    Swal.fire({
      title: 'Enter Employee details',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Employee Name">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Phone Number">' +
        '<input id="swal-input3" class="swal2-input" placeholder="City">' +
        '<input id="swal-input4" class="swal2-input" placeholder="Email">',

      focusConfirm: false,
      confirmButtonText: 'Add',
      confirmButtonColor: '#228B22',
      preConfirm: () => {
        const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const phone_number = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const city = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const email = (document.getElementById('swal-input4') as HTMLInputElement).value;

        if (!name || !phone_number || !city || !email) {
          Swal.showValidationMessage('Please fill all fields');
          return false;
        }

        return { name, phone_number, city, email };
      }

    }).then((result: SweetAlertResult<employee>) => {
      if (result.isConfirmed && result.value) {
        this.EmployesService.createEmployee(result.value).subscribe(
          (newEmployee: employee) => {
            this.employee.push(newEmployee);
            Swal.fire({
              title: 'Employee Added Successfully!',
              html: `
                    <p>Name: ${newEmployee.name}</p>
                    <p>Phone: ${newEmployee.phone_number}</p>
                    <p>City: ${newEmployee.city}</p>
                    <p>Email: ${newEmployee.email}</p>
                  `,
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: '#228B22'
            });
          },
          (error: any) => {
            console.error('Error adding employee:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to add employee.',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#d33'
            });
          }
        );
      }
    });
  }

  showEditablePopup(employee: employee): void {
    Swal.fire({
      title: 'Edit Employee details',
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Client Name" value="${employee.name}">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Phone Number" value="${employee.phone_number}">` +
        `<input id="swal-input3" class="swal2-input" placeholder="City" value="${employee.city}">` +
        `<input id="swal-input4" class="swal2-input" placeholder="Status" value="${employee.email}">`,
      focusConfirm: false,
      confirmButtonText: 'Save Changes',
      confirmButtonColor: '#228B22',
      preConfirm: () => {
        const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const phone_number = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const city = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const email = (document.getElementById('swal-input4') as HTMLInputElement).value;

        if (!name || !phone_number || !city || !email) {
          Swal.showValidationMessage('Please fill all fields');
          return false;
        }

        return { id: employee.id, name, phone_number, city, email };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.EmployesService.updatEmployee(employee.id, result.value).subscribe({
          next: (updatedEmployee) => {
            const index = this.employee.findIndex((e) => e.id === employee.id);
            if (index !== -1) {
              this.employee[index] = updatedEmployee; // Update the client in the list
            }
            Swal.fire('Success!', 'Employee updated successfully.', 'success');
          },
          error: (err) => Swal.fire('Error!', 'Failed to update employee.', 'error')
        });
      }
    });
  }

  deleteEmployee(employee: employee): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete ${employee.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.EmployesService.deleteEmployee(employee.id).subscribe({
          next: () => {
            this.employee = this.employee.filter((e) => e.id !== employee.id); // Remove the client from the list
            Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
          },
          error: (err) => Swal.fire('Error!', 'Failed to delete employee.', 'error')
        });
      }
    });
  }

  searchEmployee(): void {
    if (!this.searchQuery) {
      this.loadEmployee();
      this.isSearchActive = false;
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.employee = this.employee.filter(
      (employee) =>
        employee.name.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.phone_number.toString().toLowerCase().includes(query) ||
        employee.city.toLowerCase().includes(query)
    );
    this.isSearchActive = true;
  }
  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchEmployee(); // Trigger search when Enter is pressed
    }
  }
}