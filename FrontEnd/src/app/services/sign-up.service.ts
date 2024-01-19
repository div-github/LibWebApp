
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private apiUrl = 'http://localhost:3000';  // Replace with your Node.js server URL

  constructor(private http: HttpClient) {}

  signup(user: any) {
    const signupUrl = `${this.apiUrl}/signup`;
    return this.http.post(signupUrl, user);
  }
}
