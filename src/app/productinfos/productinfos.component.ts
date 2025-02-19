import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-productinfos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './productinfos.component.html',
  styleUrl: './productinfos.component.css'
})
export class ProductinfosComponent {
  productData: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.productData = navigation?.extras.state?.['productData'];
  }
}
