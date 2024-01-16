
import { Component } from '@angular/core';
import { User } from '../models/loginuser';

@Component({
  selector: 'app-signin',
  templateUrl: './sign-in-logging-in.component.html',
  styleUrls: ['./sign-in-logging-in.component.css'],

})
export class SigninComponent {
// Create an instance of the User class
user: User = new User('', '');

  onSubmit() {

    console.log(this.user);
  }
}

