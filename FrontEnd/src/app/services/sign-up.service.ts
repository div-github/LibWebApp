
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private apiUrl = 'http://localhost:3000';  // Replace with your Node.js server URL

  constructor(private http: HttpClient) {}

  signup(user: any) {
    const signupUrl = `${this.apiUrl}/signup`;
    console.log(user)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(signupUrl, JSON.stringify(user), { headers });
  }
}
