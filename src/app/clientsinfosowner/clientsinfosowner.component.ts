import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-clientsinfosowner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './clientsinfosowner.component.html',
  styleUrl: './clientsinfosowner.component.css'
})
export class ClientsinfosownerComponent {
  clientData: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.clientData = navigation?.extras.state?.['clientData'];
  }

}

