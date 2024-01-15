import { Component } from '@angular/core';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrl: './return-book.component.css'
})
export class ReturnBookComponent {

  confirmReturn() {
    // Add logic to handle the confirmation and send email to admin
    console.log('Return confirmed. Sending email to admin.');
  }
  
}
