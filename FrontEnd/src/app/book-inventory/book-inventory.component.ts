import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-book-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-inventory.component.html',
  styleUrl: './book-inventory.component.css'
})
export class BookInventoryComponent {
  books :any=  [];

  constructor(private BookService:BooksService) {}
  ngOnInit()
  {
    this.BookService.bookList().subscribe((data:any)=>{
      console.log(data);
      this.books=data;
    })
  }

}
