import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AccountantService, Accountant, PaginatedResponse } from '../accountant.service';
@Component({
  selector: 'app-accountant',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './accountant.component.html',
  styleUrls: ['./accountant.component.css']
})
export class AccountantComponent implements OnInit {
  accountants: Accountant[] = [];
  currentPage = 1;
  totalPages = 1;

  constructor(private accountantService: AccountantService) { }

  ngOnInit() {
    this.loadAccountants();
  }

  loadAccountants() {
    this.accountantService.getAccountants(this.currentPage).subscribe(
      (data: PaginatedResponse<Accountant>) => {
        this.accountants = data.results;
        this.totalPages = Math.ceil(data.count / 10);  // Assuming 10 items per page
      },
      (error) => {
        console.error('Error loading accountants:', error);
        Swal.fire('Error', 'Failed to load accountants', 'error');
      }
    );
  }

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
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.accountantService.addAccountant(result.value).subscribe(
          (response) => {
            this.accountants.push(response);
            Swal.fire('Success', 'Accountant added successfully', 'success');
          },
          (error) => {
            console.error('Error adding accountant:', error);
            Swal.fire('Error', 'Failed to add accountant', 'error');
          }
        );
      }
    });
  }

  showEditablePopup(accountant: Accountant) {
    Swal.fire({
      title: 'Edit Accountant details',
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Name" value="${accountant.name}">
        <input id="swal-input2" class="swal2-input" placeholder="Email" value="${accountant.email}">
        <input id="swal-input3" class="swal2-input" placeholder="Phone" value="${accountant.phone}">
        <input id="swal-input4" class="swal2-input" placeholder="City" value="${accountant.city}">
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
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.accountantService.updateAccountant(accountant.id!, result.value).subscribe(
          (response) => {
            const index = this.accountants.findIndex(acc => acc.id === accountant.id);
            if (index !== -1) {
              this.accountants[index] = response;
            }
            Swal.fire('Success', 'Accountant updated successfully', 'success');
          },
          (error) => {
            console.error('Error updating accountant:', error);
            Swal.fire('Error', 'Failed to update accountant', 'error');
          }
        );
      }
    });
  }

  deleteAccountant(accountant: Accountant) {
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
        this.accountantService.deleteAccountant(accountant.id!).subscribe(
          () => {
            this.accountants = this.accountants.filter(acc => acc.id !== accountant.id);
            Swal.fire('Success', 'Accountant deleted successfully', 'success');
          },
          (error) => {
            console.error('Error deleting accountant:', error);
            Swal.fire('Error', 'Failed to delete accountant', 'error');
          }
        );
      }
    });
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadAccountants();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadAccountants();
    }
  }
}