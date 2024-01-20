
import { Component } from '@angular/core';
import { User } from '../models/loginuser';
import { LoginService } from '../services/login.service';
import { error } from 'console';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './sign-in-logging-in.component.html',
  styleUrls: ['./sign-in-logging-in.component.css'],

})
export class SigninComponent {
// Create an instance of the User class
user: User = new User('', '');
  constructor(private loginService:LoginService,private router:Router) {}

  signIn()
  {
    this.loginService.signIn(this.user).subscribe((data:any)=>
      {
        console.log(data);
        localStorage.setItem('token',data.token);
        this.router.navigate(['/dashboard']);
      },
      error=>{
        console.log(error);
      })
  }
}

