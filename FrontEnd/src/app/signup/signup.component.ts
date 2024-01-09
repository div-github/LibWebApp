import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  firstName: any;
  lastName: any;
  email: any;
  password: any;
  confirmPassword: any;

  onSubmit() {
    // Implement your form submission logic here
    console.log('Form submitted:', this.firstName, this.lastName, this.email, this.password, this.confirmPassword);
  }
}