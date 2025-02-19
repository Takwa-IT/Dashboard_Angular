import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-billinfoacc',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './billinfoacc.component.html',
  styleUrl: './billinfoacc.component.css'
})
export class BillinfoaccComponent {
  billData: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.billData = navigation?.extras.state?.['billData']
  }
}