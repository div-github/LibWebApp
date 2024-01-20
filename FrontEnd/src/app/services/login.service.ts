import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000';  // Replace with your Node.js server URL

  constructor(private http: HttpClient) {}

  signIn(user: any) {
    const signInUrl = `${this.apiUrl}/signin`;
    console.log(user)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(signInUrl, JSON.stringify(user), { headers });
  }
}
