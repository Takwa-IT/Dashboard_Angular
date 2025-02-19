import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-productsinfoemp',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './productsinfoemp.component.html',
  styleUrl: './productsinfoemp.component.css'
})
export class ProductsinfoempComponent {
  productData: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.productData = navigation?.extras.state?.['productData'];
  }
}