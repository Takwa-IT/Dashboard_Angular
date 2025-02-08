import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settingsemployee',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './settingsemployee.component.html',
  styleUrl: './settingsemployee.component.css'
})
export class SettingsemployeeComponent {
  showPassword = false;
  showConfirmPassword = false;

  formData = {
    name: '',
    email: '',
    phone: '',
    newPassword: '',
    confirmPassword: ''
  };

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    console.log('Form submitted:', this.formData);
  }

  onSaveChanges() {
    Swal.fire({
      title: 'Success!',
      text: 'Your changes have been saved.',
      confirmButtonText: 'OK',
      confirmButtonColor: '#228B22',
      imageWidth: 150,
      imageHeight: 150,
      imageUrl: 'sucess.gif'
    });
  }

  onCancel() {

    this.formData = {
      name: '',
      email: '',
      phone: '',
      newPassword: '',
      confirmPassword: ''
    };
  }
}

