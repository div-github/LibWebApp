import { Component } from '@angular/core';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.css'
})
export class UserAccountComponent {


  logout() {
    // Implement logout logic here
    console.log('Logout clicked');
  }

}
