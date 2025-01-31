import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-accountant',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './accountant.component.html',
  styleUrl: './accountant.component.css'
})
export class AccountantComponent {
  accountants = [
    { name: 'Ridha', phone: '23954780', email: 'Ridha@gmail.com', city: 'Tunis' },
    { name: 'Jihen', phone: '54980024', email: 'Jihen@gmail.com', city: 'Mahdia' },
    { name: 'Nour', phone: '54951007', email: 'Nour@gmail.com', city: 'Tunis' },
    { name: 'Jihed', phone: '20781994', email: 'Jihed@gmail.com', city: 'Djerba' },
    { name: 'Takwa', phone: '9864000', email: 'Takwa@gmail.com', city: 'Monastir' },
    { name: 'Ramzi', phone: '50482267', email: 'Ramzi@gmail.com', city: 'Tataouine' },
    { name: 'Asma', phone: '24763128', email: 'Asma@gmail.com', city: 'Beja' },
    { name: 'Mohsen', phone: '22945761', email: 'Mohsen@gmail.com', city: 'Bizerte' }
  ];

  addAccountant() {
    Swal.fire({
      title: 'Enter Accountant details',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Add Accountant Name">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Add Accountant Email">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Add Accountant City">' +
        '<input id="swal-input4" class="swal2-input" placeholder="Add Accountant Phone Number">',
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
        this.accountants.push(result.value);

        Swal.fire({
          title: ' Accountant Added Successfully!',
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
      title: 'Edit Accountant details',
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Name" value="${existingData.name}">
        <input id="swal-input2" class="swal2-input" placeholder="Email" value="${existingData.email}">
        <input id="swal-input3" class="swal2-input" placeholder="Phone" value="${existingData.phone}">
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

        const index = this.accountants.findIndex(acc => acc.email === existingData.email);
        if (index !== -1) {
          this.accountants[index] = result.value;
        }

        Swal.fire({
          title: 'Accountant Updated Successfully!',
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

  deleteAccountant(accountant: { name: string; email: string; phone: string; city: string }) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete ${accountant.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.accountants = this.accountants.filter(acc => acc.email !== accountant.email);
        Swal.fire({
          title: 'Deleted!',
          text: `${accountant.name} has been deleted.`,
          icon: 'success',
          confirmButtonColor: '#228B22'
        });
      }
    });
  }
}
