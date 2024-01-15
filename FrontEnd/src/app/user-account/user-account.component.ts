import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.css'
})
export class UserAccountComponent {

  constructor(private router:Router) { }
  logout() {
    // Implement logout logic here
    console.log('Logout clicked');
    this.router.navigate(['/signin']);
  }

}
