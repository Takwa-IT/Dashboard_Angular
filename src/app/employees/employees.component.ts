import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  employees = [
    { name: 'Moez', phone: '23954780', email: 'Moez@gmail.com', city: 'Tunis' },
    { name: 'Ahmed', phone: '54980024', email: 'Ahmed@gmail.com', city: 'Mahdia' },
    { name: 'Nour', phone: '54951007', email: 'Nour@gmail.com', city: 'Tunis' },
    { name: 'Jihed', phone: '20781994', email: 'Jihed@gmail.com', city: 'Djerba' },
    { name: 'Takwa', phone: '9864000', email: 'Takwa@gmail.com', city: 'Monastir' },
    { name: 'Hamza', phone: '50482267', email: 'Hamza@gmail.com', city: 'Tataouine' },
    { name: 'Asma', phone: '24763128', email: 'Asma@gmail.com', city: 'Beja' },
    { name: 'Fatma', phone: '22945761', email: 'Fatma@gmail.com', city: 'Bizerte' }
  ];

  addEmployee() {
    Swal.fire({
      title: 'Enter Employee details',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Add Employee Name">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Add Employee Email">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Add Employee City">' +
        '<input id="swal-input4" class="swal2-input" placeholder="Add Employee Phone Number">',
      focusConfirm: false,
      confirmButtonText: 'Add',
      confirmButtonColor: '#228B22',
      preConfirm: (): { name: string; email: string; phone: string; city: string } | false => {
        const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const email = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const city = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const phone = (document.getElementById('swal-input4') as HTMLInputElement).value;

        if (!name || !email || !phone || !city) {
          Swal.showValidationMessage('Please fill all fields');
          return false;
        }
        return { name, email, phone, city };
      }
    }).then((result: SweetAlertResult<{ name: string; email: string; phone: string; city: string }>) => {
      if (result.isConfirmed && result.value) {
        this.employees.push(result.value);

        Swal.fire({
          title: 'Employee Added Successfully!',
          html: `
            <p>Name: ${result.value.name}</p>
            <p>Email: ${result.value.email}</p>
            <p>City: ${result.value.city}</p>
            <p>Phone: ${result.value.phone}</p>
          `,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#228B22'
        });
      }
    });
  }

  showEditablePopup(existingData: { name: string; email: string; phone: string; city: string }) {
    Swal.fire({
      title: 'Edit Employee details',
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Name" value="${existingData.name}">
        <input id="swal-input2" class="swal2-input" placeholder="Email" value="${existingData.email}">
        <input id="swal-input3" class="swal2-input" placeholder="Phone Number" value="${existingData.phone}">
        <input id="swal-input4" class="swal2-input" placeholder="City" value="${existingData.city}">
      `,
      focusConfirm: false,
      confirmButtonText: 'Save Changes',
      confirmButtonColor: '#228B22',
      preConfirm: () => {
        const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const email = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const phone = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const city = (document.getElementById('swal-input4') as HTMLInputElement).value;

        if (!name || !email || !phone || !city) {
          Swal.showValidationMessage('Please fill all fields');
          return false;
        }

        return { name, email, phone, city };
      }
    }).then((result: SweetAlertResult<{ name: string; email: string; phone: string; city: string }>) => {
      if (result.isConfirmed && result.value) {

        const index = this.employees.findIndex(emp => emp.email === existingData.email);
        if (index !== -1) {
          this.employees[index] = result.value;
        }

        Swal.fire({
          title: 'Employee Updated Successfully!',
          html: `
            <p>Name: ${result.value.name}</p>
            <p>Email: ${result.value.email}</p>
            <p>City: ${result.value.city}</p>
            <p>Phone: ${result.value.phone}</p>
          `,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#228B22'
        });
      }
    });
  }

  deleteEmployee(employee: { name: string; email: string; phone: string; city: string }) {
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
        this.employees = this.employees.filter(emp => emp.email !== employee.email);
        Swal.fire({
          title: 'Deleted!',
          text: `${employee.name} has been deleted.`,
          icon: 'success',
          confirmButtonColor: '#228B22'
        });
      }
    });
  }

  searchQuery: string = '';
  isSearchActive: boolean = false;

  searchEmployee(): void {
    if (!this.searchQuery) {
      this.loadEmployee();
      this.isSearchActive = false;
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.employees = this.employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.phone.toString().toLowerCase().includes(query) ||
        employee.city.toLowerCase().includes(query)
    );
    this.isSearchActive = true;
  }
  loadEmployee() {
    throw new Error('Method not implemented.');
  }
  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchEmployee(); // Trigger search when Enter is pressed
    }
  }
}