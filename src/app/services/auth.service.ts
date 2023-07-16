import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string = '';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }) {
    // Make the HTTP request to your login endpoint
    return this.http.post<any>('/api/login', credentials);
  }

  setToken(token: string) {
    this.token = token;
    // Store the token securely (e.g., in local storage or a cookie)
  }

  getToken() {
    // Retrieve the token from storage
    return this.token;
  }

  isLoggedIn() {
    // Check if the user is logged in by verifying the token's existence and validity
    return !!this.token;
  }

  logout() {
    // Clear the token from storage
    this.token = '';
  }
}
