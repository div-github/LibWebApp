// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';  // Replace with your Node.js server URL

  constructor(private http: HttpClient) {}

  signup(user: any): Observable<any> {
    const signupUrl = `${this.apiUrl}/signup`;
    return this.http.post(signupUrl, user);
  }

 
}
