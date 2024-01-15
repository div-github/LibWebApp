import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-book-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-inventory.component.html',
  styleUrl: './book-inventory.component.css'
})
export class BookInventoryComponent {
  books = [
    { imageUrl: './assets/Logo1.png', title: 'Book 1' },
    { imageUrl: './assets/Logo1.png', title: 'Book 2' },
    { imageUrl: './assets/Logo1.png', title: 'Book 3' },
    { imageUrl: './assets/Logo1.png', title: 'Book 3' },
    { imageUrl: './assets/Logo1.png', title: 'Book 3' },
    { imageUrl: './assets/Logo1.png', title: 'Book 3' },
    { imageUrl: './assets/Logo1.png', title: 'Book 3' },
    { imageUrl: './assets/Logo1.png', title: 'Book 3' },
    // Add more books as needed
  ];
}
