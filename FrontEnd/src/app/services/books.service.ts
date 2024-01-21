import { HttpClient, HttpParams } from '@angular/common/http';
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
  issueBook(user_id:string,book_id:string)
  {
    const issueBookUrl = `${this.apiUrl}/issue_book`;
    return this.http.post(issueBookUrl,{user_id,book_id});
  }
  getAccountInfo(user_id:string){
    let params = new HttpParams();
    params = params.append('user_id', user_id);
    const accountInfoUrl = `${this.apiUrl}/account_info`;
    return this.http.get(accountInfoUrl,{params:params});
  }
  returnBook(user_id:string)
  {
    const retireBookUrl = `${this.apiUrl}/return_book`;
    return this.http.post(retireBookUrl,{user_id});
  }

}
