// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }

  navigateBasedOnRole(role: string) {
    switch (role) {
      case 'owner':
        this.router.navigate(['/dash']);
        break;
      case 'client':
        this.router.navigate(['/billcl']);
        break;
      case 'accountant':
        this.router.navigate(['/billacc']);
        break;
      case 'employee':
        this.router.navigate(['/employeedash']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }
}