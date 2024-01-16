import { Component } from '@angular/core';
import { User } from '../models/user';
import { MyService } from '../my-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  // Create an instance of the User class
  newUser: User = new User('', '', '', '', '');
  constructor(private MyService: MyService) {}

  onSubmit():void {
    // Assuming this method is called when the form is submitted
    this.MyService.signup(this.newUser).subscribe(
      (response) => {
        console.log('User created successfully:', response);
        // Handle success, e.g., redirect to another page or show a success message
      },
      (error) => {
        console.error('Error creating user:', error);
        // Handle error, e.g., show an error message to the user
      }
    );
  }
}