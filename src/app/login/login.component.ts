import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showPassword = false;
  email: string = '';
  password: string = '';
  selectedRole: string = '';
  keepLoggedIn: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  roles = [
    { value: 'owner', label: 'Owner' },
    { value: 'employee', label: 'Employee' },
    { value: 'accountant', label: 'Accountant' },
    { value: 'client', label: 'Client' }
  ];

  constructor(private authService: AuthService) { }

  onSubmit() {
    if (this.email && this.password && this.selectedRole) {
      // Here you would typically handle authentication
      // For this example, we'll just navigate based on role
      this.authService.navigateBasedOnRole(this.selectedRole);
    }
  }
}