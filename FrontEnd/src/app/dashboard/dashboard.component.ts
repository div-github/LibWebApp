import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderWithLogoComponent } from '../header-with-logo/header-with-logo.component';
import { FooterWithCopywriteAndContactComponent } from '../footer-with-copywrite-and-contact/footer-with-copywrite-and-contact.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
  HeaderWithLogoComponent,
  FooterWithCopywriteAndContactComponent,
  RouterOutlet
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
