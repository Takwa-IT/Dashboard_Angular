import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-billscl',
  standalone: true,
  imports: [CommonModule, RouterLink, NgFor, FormsModule],
  templateUrl: './billscl.component.html',
  styleUrl: './billscl.component.css'
})
export class BillsclComponent {
  bills = [
    { reference: '2395478', amount: '590DT', quantity: '250KG', status: 'Paid', receiveTime: '12-02-2024 09:45', isPaid: true },
    { reference: '5498002', amount: '990DT', quantity: '100KG', status: 'Unpaid', receiveTime: '12-01-2025 13:55', isPaid: false },
    { reference: '5495100', amount: '1500DT', quantity: '190KG', status: 'Paid', receiveTime: '30-11-2024 10:25', isPaid: true },
    { reference: '2078199', amount: '800DT', quantity: '500KG', status: 'Paid', receiveTime: '22-07-2024 11:52', isPaid: true },
  ];

  searchQuery: string = '';
  isSearchActive: boolean = false;

  searchBills(): void {
    if (!this.searchQuery) {
      this.loadBills();
      this.isSearchActive = false;
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.bills = this.bills.filter(
      (bill) =>
        bill.reference.toLowerCase().includes(query) ||
        bill.amount.toLowerCase().includes(query) ||
        bill.quantity.toString().toLowerCase().includes(query) ||
        bill.status.toLowerCase().includes(query) ||
        bill.receiveTime.toLowerCase().includes(query)
    );
    this.isSearchActive = true;
  }
  loadBills() {
    throw new Error('Method not implemented.');
  }
  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchBills(); // Trigger search when Enter is pressed
    }
  }
}
