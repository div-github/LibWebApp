import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header-with-logo',
  standalone:true,
  imports:[MatToolbarModule,MatIconModule,RouterModule],
  templateUrl: './header-with-logo.component.html',
  styleUrls: ['./header-with-logo.component.css']
})
export class HeaderWithLogoComponent {
  isNavbarOpen = false;

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
} 
