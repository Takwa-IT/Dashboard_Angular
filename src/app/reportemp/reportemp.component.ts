import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-reportemp',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './reportemp.component.html',
  styleUrl: './reportemp.component.css'
})
export class ReportempComponent {
  reportData: any;
  currentDate = new Date().toLocaleDateString();

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.reportData = navigation?.extras.state?.['reportData'];
  }
}
