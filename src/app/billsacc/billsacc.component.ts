import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import Swal, { SweetAlertResult } from 'sweetalert2';


@Component({
  selector: 'app-billsacc',
  standalone: true,
  imports: [CommonModule, RouterLink, NgClass],
  templateUrl: './billsacc.component.html',
  styleUrl: './billsacc.component.css'
})
export class BillsaccComponent {
  bills = [
    { reference: '2395478', name: 'Moez', city: 'Tunis', status: 'Paid', enter: ' 12-02-2024 09:45 ' },
    { reference: '5498002', name: 'Ahmed', city: 'Mahdia', status: 'Unpaid', enter: '  12-01-2025 13:55 ' },
    { reference: '5495100', name: 'Nour', city: 'Tunis', status: 'Paid', enter: ' 30-11-2024 10:25 ' },
    { reference: '2078199', name: 'Jihed', city: 'Djerba', status: 'Paid', enter: '  22-07-2024 11:52 ' },
    { reference: '9864100', name: 'Takwa', city: 'Monastir', status: 'Paid', enter: '  14-09-2024 08:20 ' },
    { reference: '5049226', name: 'Hamza', city: 'Tataouine', status: 'Unpaid', enter: '  20-12-2024 09:40 ' },
    { reference: '2476312', name: 'Asma', city: 'Beja', status: 'Unpaid', enter: '  02-01-2025 14:43 ' },
    { reference: '2394576', name: 'Fatma', city: 'Bizerte', status: 'Paid', enter: ' 1 04-10-2024 08:405 ' },
  ];

  addBill() {
    Swal.fire({
      title: 'Enter Bill details',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Add Bill Reference">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Add Client Name">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Add Client City">' +
        '<input id="swal-input4" class="swal2-input" placeholder="Add Bill Status">' +
        '<input id="swal-input5" class="swal2-input" placeholder="Add Bill Enter Time">',
      focusConfirm: false,
      confirmButtonText: 'Add',
      confirmButtonColor: '#228B22',
      preConfirm: (): { reference: string; name: string; city: string; status: string; enter: string } | false => {
        const reference = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const name = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const city = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const status = (document.getElementById('swal-input4') as HTMLInputElement).value;
        const enter = (document.getElementById('swal-input5') as HTMLInputElement).value;

        if (!reference || !name || !city || !status || !enter) {
          Swal.showValidationMessage('Please fill all fields');
          return false;
        }
        return { reference, name, city, status, enter };
      }
    }).then((result: SweetAlertResult<{ reference: string; name: string; city: string; status: string; enter: string }>) => {
      if (result.isConfirmed && result.value) {
        this.bills.push(result.value);

        Swal.fire({
          title: ' Bill Added Successfully!',
          html: `            
            <p>Reference: ${result.value.reference}</p>
            <p>Client Name: ${result.value.name}</p>
            <p>City: ${result.value.city}</p>
            <p>Bill Status: ${result.value.status}</p>
            <p>Enter Time: ${result.value.enter}</p>
          `,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#228B22'
        });
      }
    });
  }

  showEditablePopup(existingData: { reference: string; name: string; city: string; status: string; enter: string }) {
    Swal.fire({
      title: 'Edit Bill details',
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Reference" value="${existingData.reference}">
        <input id="swal-input2" class="swal2-input" placeholder="Client Name" value="${existingData.name}">
        <input id="swal-input3" class="swal2-input" placeholder="City" value="${existingData.city}">
        <input id="swal-input4" class="swal2-input" placeholder="Bill Status" value="${existingData.status}">
        <input id="swal-input5" class="swal2-input" placeholder="Enter Time" value="${existingData.enter}">
      `,
      focusConfirm: false,
      confirmButtonText: 'Save Changes',
      confirmButtonColor: '#228B22',
      preConfirm: () => {
        const reference = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const name = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const city = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const status = (document.getElementById('swal-input4') as HTMLInputElement).value;
        const enter = (document.getElementById('swal-input5') as HTMLInputElement).value;

        if (!reference || !name || !city || !status || !enter) {
          Swal.showValidationMessage('Please fill all fields');
          return false;
        }

        return { reference, name, city, status, enter };
      }
    }).then((result: SweetAlertResult<{ reference: string; name: string; city: string; status: string; enter: string }>) => {
      if (result.isConfirmed && result.value) {

        const index = this.bills.findIndex(bll => bll.reference === existingData.reference);
        if (index !== -1) {
          this.bills[index] = result.value;
        }

        Swal.fire({
          title: 'Bill Updated Successfully!',
          html: `
            <p>Reference: ${result.value.reference}</p>
            <p>Client Name: ${result.value.name}</p>
            <p>City: ${result.value.city}</p>
            <p>Bill Status: ${result.value.status}</p>
            <p>Enter Time: ${result.value.enter}</p>
          `,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#228B22'
        });
      }
    });
  }

  deleteBill(bill: { reference: string; name: string; city: string; status: string; enter: string }) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete ${bill.reference}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bills = this.bills.filter(bll => bll.reference !== bill.reference);
        Swal.fire({
          title: 'Deleted!',
          text: `${bill.reference} has been deleted.`,
          icon: 'success',
          confirmButtonColor: '#228B22'
        });
      }
    });
  }

  constructor(private router: Router) { }
  viewBillInfo(bill: any) {
    this.router.navigate(['/billinfosacc'], {
      state: { billData: bill }
    });
  }
}

