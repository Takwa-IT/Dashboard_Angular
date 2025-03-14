import { Component, OnInit } from "@angular/core";
import Swal, { SweetAlertResult } from "sweetalert2";
import { FormsModule } from "@angular/forms";
import { CommonModule, NgFor } from "@angular/common";
import { RouterLink, RouterModule } from "@angular/router";
import { Accountant, AccountantService } from "../services/accountant.service";


@Component({
  selector: "app-accountant",
  standalone: true,
  imports: [FormsModule, NgFor, RouterLink, CommonModule, RouterModule],
  templateUrl: "./accountant.component.html",
  styleUrls: ["./accountant.component.css"],
})
export class AccountantComponent implements OnInit {
  accountants: Accountant[] = [];
  searchQuery: string = '';
  isSearchActive: boolean = false;

  constructor(private accountantService: AccountantService) { }

  ngOnInit(): void {
    this.loadAccountants();
  }

  loadAccountants(): void {
    this.accountantService.getAllAccountants().subscribe(
      (data: Accountant[]) => {
        this.accountants = data;
      },
      (error: any) => {
        console.error('Error fetching accountants:', error);
      }
    );
  }

  addAccountant(): void {
    Swal.fire({
      title: 'Enter Accountant details',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Add Accountant Name">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Add Accountant Phone Number">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Add Accountant City">' +
        '<input id="swal-input4" class="swal2-input" placeholder="Add Accountant Email">',
      focusConfirm: false,
      confirmButtonText: 'Add',
      confirmButtonColor: '#228B22',
      preConfirm: (): Accountant | false => {
        const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const phone = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const city = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const email = (document.getElementById('swal-input4') as HTMLInputElement).value;

        if (!name || !phone || !city || !email) {
          Swal.showValidationMessage('Please fill all fields');
          return false;
        }
        return { name, phone, email, city };
      }
    }).then((result: SweetAlertResult<Accountant>) => {
      if (result.isConfirmed && result.value) {
        this.accountantService.addAccountant(result.value).subscribe(
          (newAccountant: Accountant) => {
            this.accountants.push(newAccountant);
            Swal.fire({
              title: 'Accountant Added Successfully!',
              html: `
                <p>Name: ${newAccountant.name}</p>
                <p>Phone: ${newAccountant.phone}</p>
                <p>City: ${newAccountant.city}</p>
                <p>Email: ${newAccountant.email}</p>
              `,
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: '#228B22'
            });
          },
          (error: any) => {
            console.error('Error adding accountant:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to add accountant.',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#d33'
            });
          }
        );
      }
    });
  }

  showEditablePopup(existingData: Accountant): void {
    Swal.fire({
      title: 'Edit Accountant details',
      html: `
            <input id="swal-input1" class="swal2-input" placeholder="Name" value="${existingData.name}">
            <input id="swal-input2" class="swal2-input" placeholder="Phone" value="${existingData.phone}">
            <input id="swal-input3" class="swal2-input" placeholder="City" value="${existingData.city}">
            <input id="swal-input4" class="swal2-input" placeholder="Email" value="${existingData.email}">
          `,
      focusConfirm: false,
      confirmButtonText: 'Save Changes',
      confirmButtonColor: '#228B22',
      preConfirm: (): Accountant | false => {
        const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const phone = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const city = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const email = (document.getElementById('swal-input4') as HTMLInputElement).value;

        if (!name || !phone || !city || !email) {
          Swal.showValidationMessage('Please fill all fields');
          return false;
        }

        return { id: existingData.id, name, email, phone, city };
      }
    }).then((result: SweetAlertResult<Accountant>) => {
      if (result.isConfirmed && result.value) {
        this.accountantService.updateAccountant(result.value.id!, result.value).subscribe(
          (updatedAccountant: Accountant) => {
            const index = this.accountants.findIndex(acc => acc.id === updatedAccountant.id);
            if (index !== -1) {
              this.accountants[index] = updatedAccountant;
            }
            Swal.fire({
              title: 'Accountant Updated Successfully!',
              html: `
                <p>Name: ${updatedAccountant.name}</p>
                <p>Phone: ${updatedAccountant.phone}</p>
                <p>City: ${updatedAccountant.city}</p>
                <p>Email: ${updatedAccountant.email}</p>
              `,
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: '#228B22'
            });
          },
          (error: any) => {
            console.error('Error updating accountant:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to update accountant.',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#d33'
            });
          }
        );
      }
    });
  }

  deleteAccountant(accountant: Accountant): void {
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
            Swal.fire({
              title: 'Deleted!',
              text: `${accountant.name} has been deleted.`,
              icon: 'success',
              confirmButtonColor: '#228B22'
            });
          },
          (error: any) => {
            console.error('Error deleting accountant:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete accountant.',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#d33'
            });
          }
        );
      }
    });
  }

  searchAccountant(): void {
    if (!this.searchQuery) {
      this.loadAccountants();
      this.isSearchActive = false;
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.accountants = this.accountants.filter(
      (accountant) =>
        accountant.name.toLowerCase().includes(query) ||
        accountant.phone.toString().toLowerCase().includes(query) ||
        accountant.city.toLowerCase().includes(query) ||
        accountant.email.toLowerCase().includes(query)
    );
    this.isSearchActive = true;
  }

  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchAccountant();
    }
  }
}