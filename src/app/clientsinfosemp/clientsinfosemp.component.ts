import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-clientsinfosemp',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './clientsinfosemp.component.html',
  styleUrl: './clientsinfosemp.component.css'
})
export class ClientsinfosempComponent {
  clientData: any;


  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.clientData = navigation?.extras.state?.['clientData']
  }

  viewReport(clientData: any) {
    this.router.navigate(['/reportemp'], {
      state: {
        reportData: {
          ...clientData,
          enterTime: clientData.enter,
          finishTime: clientData.finish,
          getProductTime: clientData.finish,
          reference: ' ',
          paymentMethod: 'Cash',
          totalPrice: '2000'
        }
      }
    });
  }
}
