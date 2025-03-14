import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { ClientsService, Client } from '../services/clients.service'; // Import the service and Client interface

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, FormsModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {
  clients: Client[] = []; // Use the Client interface
  searchQuery: string = '';
  isSearchActive: boolean = false;

  constructor(
    private clientsService: ClientsService, // Inject the ClientsService
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadClients(); // Load clients when the component initializes
  }

  // Load all clients from the backend
  loadClients(): void {
    this.clientsService.getAllClients().subscribe({
      next: (data) => (this.clients = data),
      error: (err) => console.error('Failed to load clients:', err)
    });
  }

  // Add a new client
  addClient(): void {
    Swal.fire({
      title: 'Enter Client details',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Client Name">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Phone Number">' +
        '<input id="swal-input3" class="swal2-input" placeholder="City">' +
        '<input id="swal-input4" class="swal2-input" placeholder="Status">' +
        '<input id="swal-input5" class="swal2-input" placeholder="Enter Time">',
      focusConfirm: false,
      confirmButtonText: 'Add',
      confirmButtonColor: '#228B22',
      preConfirm: () => {
        const client_name = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const phone_number = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const city = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const status = (document.getElementById('swal-input4') as HTMLInputElement).value;
        const enter_time = (document.getElementById('swal-input5') as HTMLInputElement).value;

        if (!client_name || !phone_number || !city || !status || !enter_time) {
          Swal.showValidationMessage('Please fill all fields');
          return false;
        }

        return { client_name, phone_number, city, status, enter_time };
      }
    }).then((result: SweetAlertResult<Client>) => {
      if (result.isConfirmed && result.value) {
        this.clientsService.createClient(result.value).subscribe(
          (newClient: Client) => {
            this.clients.push(newClient);
            Swal.fire({
              title: 'Client Added Successfully!',
              html: `
                    <p>Client Name: ${newClient.client_name}</p>
                    <p>Phone Number: ${newClient.phone_number}</p>
                    <p>City: ${newClient.city}</p>
                    <p>Status: ${newClient.status}</p>
                    <p>Enter Time: ${newClient.enter_time}</p>
                  `,
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: '#228B22'
            });
          },
          (error: any) => {
            console.error('Error adding client:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to add client.',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#d33'
            });
          }
        );
      }
    });
  }

  // Edit a client
  showEditablePopup(client: Client): void {
    Swal.fire({
      title: 'Edit Client details',
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Client Name" value="${client.client_name}">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Phone Number" value="${client.phone_number}">` +
        `<input id="swal-input3" class="swal2-input" placeholder="City" value="${client.city}">` +
        `<input id="swal-input4" class="swal2-input" placeholder="Status" value="${client.status}">` +
        `<input id="swal-input5" class="swal2-input" placeholder="Enter Time" value="${client.enter_time}">`,
      focusConfirm: false,
      confirmButtonText: 'Save Changes',
      confirmButtonColor: '#228B22',
      preConfirm: () => {
        const client_name = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const phone_number = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const city = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const status = (document.getElementById('swal-input4') as HTMLInputElement).value;
        const enter_time = (document.getElementById('swal-input5') as HTMLInputElement).value;

        if (!client_name || !phone_number || !city || !status || !enter_time) {
          Swal.showValidationMessage('Please fill all fields');
          return false;
        }

        return { id: client.id, client_name, phone_number, city, status, enter_time };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.clientsService.updateClient(client.id, result.value).subscribe({
          next: (updatedClient) => {
            const index = this.clients.findIndex((c) => c.id === client.id);
            if (index !== -1) {
              this.clients[index] = updatedClient; // Update the client in the list
            }
            Swal.fire('Success!', 'Client updated successfully.', 'success');
          },
          error: (err) => Swal.fire('Error!', 'Failed to update client.', 'error')
        });
      }
    });
  }

  // Delete a client
  deleteClient(client: Client): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete ${client.client_name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientsService.deleteClient(client.id).subscribe({
          next: () => {
            this.clients = this.clients.filter((c) => c.id !== client.id); // Remove the client from the list
            Swal.fire('Deleted!', 'Client has been deleted.', 'success');
          },
          error: (err) => Swal.fire('Error!', 'Failed to delete client.', 'error')
        });
      }
    });
  }

  // View client info
  viewClientInfo(client: Client): void {
    this.router.navigate(['/clientsinfosown'], {
      state: { clientData: client }
    });
  }

  // Search clients
  searchClient(): void {
    if (!this.searchQuery) {
      this.loadClients(); // Reload all clients if the search query is empty
      this.isSearchActive = false;
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.clients = this.clients.filter(
      (client) =>
        client.client_name.toLowerCase().includes(query) ||
        client.phone_number.toLowerCase().includes(query) ||
        client.city.toLowerCase().includes(query) ||
        client.status.toLowerCase().includes(query) ||
        client.enter_time.toLowerCase().includes(query)
    );
    this.isSearchActive = true;
  }

  // Handle search keydown event
  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchClient();
    }
  }
}