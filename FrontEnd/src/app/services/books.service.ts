import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = 'http://localhost:3000';  // Replace with your Node.js server URL

  constructor(private http:HttpClient) 
  { }
  bookList()
  {
    const bookListUrl = `${this.apiUrl}/books`;
    return this.http.get(bookListUrl);
  }
}
