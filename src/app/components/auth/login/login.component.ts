import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const credentials = {
      username: this.username,
      password: this.password,
    };

    this.authService.login(credentials).subscribe(
      (response) => {
        const token = response.token; // Assuming the token is returned as 'token'
        this.authService.setToken(token);
        console.log('Logged in successfully! Token:', token);
        this.router.navigate(['/dashboard']); // Navigate to the dashboard after successful login
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}





