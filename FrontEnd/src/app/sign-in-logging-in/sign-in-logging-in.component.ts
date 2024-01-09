
import { Component } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './sign-in-logging-in.component.html',
  styleUrls: ['./sign-in-logging-in.component.css'],

})
export class SigninComponent {
  email: any;
  password: any;

  onSubmit(event:any) {
    event?.preventDefault()
    console.log('Submitted values:', this.email, this.password);
    // Perform further actions like sending data to a server, etc.
  }
}

