import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import Swal, { SweetAlertResult } from 'sweetalert2';


@Component({
  selector: 'app-productsemp',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './productsemp.component.html',
  styleUrl: './productsemp.component.css'
})
export class ProductsempComponent {
  products = [
    { name: ' Product 1', enter: ' 12-02-2024 09:45', quantity: '100KG', city: 'Tunis', status: 'Finished', finish: ' 22-05-2024 09:45' },
    { name: 'Product 2 ', enter: ' 12-01-2025 13:55', quantity: '200KG', city: 'Mahdia', status: 'Pending', finish: ' 14-04-2025 13:55' },
    { name: 'Product 3 ', enter: ' 30-11-2024 10:25', quantity: '150KG', city: 'Tunis', status: 'Ongoing', finish: ' 20-01-2025 10:25' },
    { name: 'Product 4 ', enter: ' 22-07-2024 11:52', quantity: '100KG', city: 'Djerba', status: 'Finished', finish: ' 09-10-2024 11:52' },
    { name: 'Product 5 ', enter: ' 14-09-2024 08:20', quantity: '170KG', city: 'Monastir', status: 'Finished', finish: ' 04-01-2025 08:20' },
    { name: 'Product 6 ', enter: ' 20-12-2024 09:40', quantity: '100KG', city: 'Tataouine', status: 'Ongoing', finish: ' 27-02-2025 09:40' },
    { name: 'Product 7 ', enter: ' 02-01-2025 14:43', quantity: '120KG', city: 'Beja', status: 'Pending', finish: ' 13-03-2025 14:43' },
    { name: 'Product 8 ', enter: ' 04-10-2024 08:40', quantity: '500KG', city: 'Bizerte', status: 'Ongoing', finish: ' 19-01-2025 08:40' }
  ];

  addProduct() {
    Swal.fire({
      title: 'Enter Product details',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Add Product Name">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Add Product Enter Time">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Add Product Quantity">' +
        '<input id="swal-input4" class="swal2-input" placeholder="Add Product City">' +
        '<input id="swal-input5" class="swal2-input" placeholder="Add Product Status">' +
        '<input id="swal-input6" class="swal2-input" placeholder="Add Product Finish Time">',
      focusConfirm: false,
      confirmButtonText: 'Add',
      confirmButtonColor: '#228B22',
      preConfirm: (): { name: string; enter: string; quantity: string; city: string; status: string; finish: string } | false => {
        const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const enter = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const quantity = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const city = (document.getElementById('swal-input4') as HTMLInputElement).value;
        const status = (document.getElementById('swal-input5') as HTMLInputElement).value;
        const finish = (document.getElementById('swal-input6') as HTMLInputElement).value;

        if (!name || !enter || !quantity || !city || !status || !finish) {
          Swal.showValidationMessage('Please fill all fields');
          return false;
        }
        return { name, enter, quantity, city, status, finish };
      }
    }).then((result: SweetAlertResult<{ name: string; enter: string; quantity: string; city: string; status: string; finish: string }>) => {
      if (result.isConfirmed && result.value) {
        this.products.push(result.value);

        Swal.fire({
          title: ' Product Added Successfully!',
          html: `
            <p>Product Name: ${result.value.name}</p>
            <p>Enter Time: ${result.value.enter}</p>
            <p>Quantity: ${result.value.quantity}</p>
            <p>City: ${result.value.city}</p>
            <p>Product Status: ${result.value.status}</p>
            <p>Finish Time: ${result.value.finish}</p>

          `,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#228B22'
        });
      }
    });
  }

  showEditablePopup(existingData: { name: string; enter: string; quantity: string; city: string; status: string; finish: string }) {
    Swal.fire({
      title: 'Edit Product details',
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Name" value="${existingData.name}">
        <input id="swal-input2" class="swal2-input" placeholder="Enter Time" value="${existingData.enter}">
        <input id="swal-input3" class="swal2-input" placeholder="Quantity" value="${existingData.quantity}">
        <input id="swal-input4" class="swal2-input" placeholder="City" value="${existingData.city}">
        <input id="swal-input5" class="swal2-input" placeholder="Product Status" value="${existingData.status}">
        <input id="swal-input6" class="swal2-input" placeholder="Finish Time" value="${existingData.finish}">
      `,
      focusConfirm: false,
      confirmButtonText: 'Save Changes',
      confirmButtonColor: '#228B22',
      preConfirm: () => {
        const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const enter = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const quantity = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const city = (document.getElementById('swal-input4') as HTMLInputElement).value;
        const status = (document.getElementById('swal-input5') as HTMLInputElement).value;
        const finish = (document.getElementById('swal-input6') as HTMLInputElement).value;

        if (!name || !enter || !quantity || !city || !status || !finish) {
          Swal.showValidationMessage('Please fill all fields');
          return false;
        }

        return { name, enter, quantity, city, status, finish };
      }
    }).then((result: SweetAlertResult<{ name: string; enter: string; quantity: string; city: string; status: string; finish: string }>) => {
      if (result.isConfirmed && result.value) {

        const index = this.products.findIndex(pr => pr.name === existingData.name);
        if (index !== -1) {
          this.products[index] = result.value;
        }

        Swal.fire({
          title: 'Product Updated Successfully!',
          html: `
            <p>Product Name: ${result.value.name}</p>
            <p>Enter Time: ${result.value.enter}</p>
            <p>Quantity: ${result.value.quantity}</p>
            <p>City: ${result.value.city}</p>
            <p>Product Status: ${result.value.status}</p>
            <p>Finish Time: ${result.value.finish}</p>
          `,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#228B22'
        });
      }
    });
  }

  deleteProduct(product: { name: string; enter: string; quantity: string; city: string; status: string; finish: string }) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete ${product.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.products = this.products.filter(pr => pr.name !== product.name);
        Swal.fire({
          title: 'Deleted!',
          text: `${product.name} has been deleted.`,
          icon: 'success',
          confirmButtonColor: '#228B22'
        });
      }
    });
  }

  constructor(private router: Router) { }
  viewProductInfo(product: any) {
    this.router.navigate(['/productsinfosemp'], {
      state: { productData: product }
    });
  }
}

