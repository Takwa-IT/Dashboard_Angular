import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-employeedash',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './employeedash.component.html',
  styleUrl: './employeedash.component.css'
})
export class EmployeedashComponent {
  clients = [
    { name: 'Aymen', phone: '23954780', city: 'Tunis', status: 'Finished', time: ' 12-02-2024 09:45' },
    { name: 'Fedi', phone: '54980024', city: 'Mahdia', status: 'Pending', time: '12-01-2025 13:55' },
    { name: 'Nour', phone: '54951007', city: 'Tunis', status: 'Ongoing', time: ' 30-11-2024 10:25' },
    { name: 'Hamza', phone: '20781994', city: 'Djerba', status: 'Finished', time: ' 22-07-2024 11:52' },
    { name: 'Ridha', phone: '9864000', city: 'Monastir', status: 'Finished', time: '14-09-2024 08:20' },
    { name: 'Ramzi', phone: '50482267', city: 'Tataouine', status: 'Ongoing', time: ' 20-12-2024 09:40' },
    { name: 'Asma', phone: '24763128', city: 'Beja', status: 'Pending', time: ' 02-01-2025 14:43' },
    { name: 'Mohamed', phone: '22945761', city: 'Bizerte', status: 'Ongoing', time: ' 04-10-2024 08:40' }
  ];

  addClient() {
    Swal.fire({
      title: 'Enter Accountant details',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Add Client Name">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Add Client Phone Number">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Add Client City">' +
        '<input id="swal-input4" class="swal2-input" placeholder="Add Product Status">' +
        '<input id="swal-input5" class="swal2-input" placeholder="Add Client Enter Time">',
      focusConfirm: false,
      confirmButtonText: 'Add',
      confirmButtonColor: '#228B22',
      preConfirm: (): { name: string; time: string; phone: string; city: string; status: string } | false => {
        const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const phone = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const city = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const status = (document.getElementById('swal-input4') as HTMLInputElement).value;
        const time = (document.getElementById('swal-input5') as HTMLInputElement).value;

        if (!name || !time || !phone || !city || !status) {
          Swal.showValidationMessage('Please fill all fields');
          return false;
        }
        return { name, time, status, phone, city };
      }
    }).then((result: SweetAlertResult<{ name: string; time: string; phone: string; city: string; status: string }>) => {
      if (result.isConfirmed && result.value) {
        this.clients.push(result.value);

        Swal.fire({
          title: ' Client Added Successfully!',
          html: `
            <p>Name: ${result.value.name}</p>
            <p>Time: ${result.value.time}</p>
            <p>City: ${result.value.city}</p>
            <p>Phone: ${result.value.phone}</p>
            <p>Status: ${result.value.status}</p>
          `,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#228B22'
        });
      }
    });
  }

  showEditablePopup(existingData: { name: string; time: string; phone: string; city: string; status: string }) {
    Swal.fire({
      title: 'Edit Client details',
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Name" value="${existingData.name}">
        <input id="swal-input2" class="swal2-input" placeholder="Phone" value="${existingData.phone}">
        <input id="swal-input3" class="swal2-input" placeholder="City" value="${existingData.city}">
        <input id="swal-input4" class="swal2-input" placeholder="Status" value="${existingData.status}">
        <input id="swal-input5" class="swal2-input" placeholder="Time" value="${existingData.time}">
      `,
      focusConfirm: false,
      confirmButtonText: 'Save Changes',
      confirmButtonColor: '#228B22',
      preConfirm: () => {
        const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const phone = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const city = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const status = (document.getElementById('swal-input4') as HTMLInputElement).value;
        const time = (document.getElementById('swal-input5') as HTMLInputElement).value;

        if (!name || !time || !phone || !city || !status) {
          Swal.showValidationMessage('Please fill all fields');
          return false;
        }

        return { name, time, status, phone, city };
      }
    }).then((result: SweetAlertResult<{ name: string; time: string; phone: string; city: string; status: string }>) => {
      if (result.isConfirmed && result.value) {

        const index = this.clients.findIndex(cl => cl.time === existingData.time);
        if (index !== -1) {
          this.clients[index] = result.value;
        }

        Swal.fire({
          title: 'Client Updated Successfully!',
          html: `
            <p>Name: ${result.value.name}</p>
            <p>Phone: ${result.value.phone}</p>
            <p>City: ${result.value.city}</p>
            <p>Status: ${result.value.status}</p>
            <p>Enter Time: ${result.value.time}</p>
          `,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#228B22'
        });
      }
    });
  }

  deleteClient(client: { name: string; time: string; phone: string; city: string; status: string }) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete ${client.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clients = this.clients.filter(cl => cl.time !== client.time);
        Swal.fire({
          title: 'Deleted!',
          text: `${client.name} has been deleted.`,
          icon: 'success',
          confirmButtonColor: '#228B22'
        });
      }
    });
  }

  constructor(private router: Router) { }
  viewClientInfo(client: any) {
    this.router.navigate(['/clientsinfos'], {
      state: { clientData: client }
    });
  }
}
