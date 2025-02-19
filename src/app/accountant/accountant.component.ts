import { Component, OnInit, Inject } from "@angular/core";
import Swal, { SweetAlertResult } from "sweetalert2";
import { FormsModule } from "@angular/forms";
import { CommonModule, NgFor } from "@angular/common";
import { RouterLink, RouterModule } from "@angular/router";


@Component({
  selector: "app-accountant",
  standalone: true,
  imports: [FormsModule, NgFor, RouterLink, CommonModule, RouterModule],
  templateUrl: "./accountant.component.html",
  styleUrls: ["./accountant.component.css"],
})
export class AccountantComponent {
  accountants = [
    { name: 'Moez', phone: '23954780', city: 'Gafsa', email: 'Moez@gmail.com' },
    { name: 'Njoud', phone: '54980024', city: 'Tunis', email: 'Njoud@gmail.com' },
    { name: 'Roua', phone: '54951007', city: 'Bizerte', email: 'Roua@gmail.com' },
    { name: 'Hamza', phone: '20781994', city: 'Djerba', email: 'Hamza@gmail.com' },
    { name: 'Nidhal', phone: '9864000', city: 'Monastir', email: 'Nidhal@gmail.com' },
    { name: 'Ramzi', phone: '50482267', city: 'Sousse', email: 'Ramzi@gmail.com' },
    { name: 'Asma', phone: '24763128', city: 'Beja', email: 'Asma@gmail.com' },
    { name: 'Lotfi', phone: '22945761', city: 'Ariana', email: 'Lotfi@gmail.com' }
  ];

  addAccountant() {
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
      preConfirm: (): { name: string; phone: string; city: string; email: string } | false => {
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
    }).then((result: SweetAlertResult<{ name: string; phone: string; city: string; email: string }>) => {
      if (result.isConfirmed && result.value) {
        this.accountants.push(result.value);

        Swal.fire({
          title: ' Client Added Successfully!',
          html: `
              <p>Name: ${result.value.name}</p>
              <p>City: ${result.value.city}</p>
              <p>Phone: ${result.value.phone}</p>
              <p>City: ${result.value.city}</p>
            `,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#228B22'
        });
      }
    });
  }

  showEditablePopup(existingData: { name: string; phone: string; city: string; email: string }) {
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
      preConfirm: () => {
        const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const phone = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const city = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const email = (document.getElementById('swal-input4') as HTMLInputElement).value;

        if (!name || !phone || !city || !email) {
          Swal.showValidationMessage('Please fill all fields');
          return false;
        }

        return { name, email, phone, city };
      }
    }).then((result: SweetAlertResult<{ name: string; phone: string; city: string; email: string }>) => {
      if (result.isConfirmed && result.value) {

        const index = this.accountants.findIndex(acc => acc.name === existingData.name);
        if (index !== -1) {
          this.accountants[index] = result.value;
        }

        Swal.fire({
          title: 'Accountant Updated Successfully!',
          html: `
                <p>Name: ${result.value.name}</p>
                <p>Phone: ${result.value.phone}</p>
                <p>City: ${result.value.city}</p>
                <p>Email: ${result.value.email}</p>
              `,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#228B22'
        });
      }
    });
  }

  deleteAccountant(accountant: { name: string; phone: string; city: string; email: string }) {
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
        this.accountants = this.accountants.filter(acc => acc.name !== accountant.name);
        Swal.fire({
          title: 'Deleted!',
          text: `${accountant.name} has been deleted.`,
          icon: 'success',
          confirmButtonColor: '#228B22'
        });
      }
    });
  }

  searchQuery: string = '';
  isSearchActive: boolean = false;

  searchAccountant(): void {
    if (!this.searchQuery) {
      this.loadAccountant();
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
  loadAccountant() {
    throw new Error('Method not implemented.');
  }
  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchAccountant(); // Trigger search when Enter is pressed
    }
  }


}