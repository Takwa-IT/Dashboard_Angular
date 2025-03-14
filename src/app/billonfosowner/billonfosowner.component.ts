import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-billonfosowner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './billonfosowner.component.html',
  styleUrl: './billonfosowner.component.css'
})
export class BillonfosownerComponent {
  billData: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.billData = navigation?.extras.state?.['billData']
  }
}
