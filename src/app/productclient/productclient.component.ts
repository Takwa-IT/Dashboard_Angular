import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-productclient',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './productclient.component.html',
  styleUrl: './productclient.component.css'
})
export class ProductclientComponent {
  products = [
    { reference: '2395478', enterTime: '12-02-2024 09:45', quantity: '150KG', status: 'Finished', finishTime: '22-05-2024 09:45' },
    { reference: '5498002', enterTime: '12-01-2025 13:55', quantity: '200KG', status: 'Pending', finishTime: '14-04-2025 13:55' },
    { reference: '5495100', enterTime: '30-11-2024 10:25', quantity: '350KG', status: 'Ongoing', finishTime: '20-01-2025 10:25' },
    { reference: '2078199', enterTime: '22-07-2024 11:52', quantity: '100KG', status: 'Finished', finishTime: '09-10-2024 11:52' },
    { reference: '6407892', enterTime: '14-09-2024 08:20', quantity: '120KG', status: 'Finished', finishTime: '04-01-2025 08:20' },
  ];

  searchQuery: string = '';
  isSearchActive: boolean = false;

  searchProducts(): void {
    if (!this.searchQuery) {
      this.loadProducts();
      this.isSearchActive = false;
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.products = this.products.filter(
      (product) =>
        product.reference.toLowerCase().includes(query) ||
        product.enterTime.toString().toLowerCase().includes(query) ||
        product.quantity.toLowerCase().includes(query) ||
        product.status.toLowerCase().includes(query) ||
        product.finishTime.toLowerCase().includes(query)
    );
    this.isSearchActive = true;
  }
  loadProducts() {
    throw new Error('Method not implemented.');
  }
  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchProducts(); // Trigger search when Enter is pressed
    }
  }
}
