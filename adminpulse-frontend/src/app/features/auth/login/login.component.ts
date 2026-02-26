import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        console.log(res.role);
        
        if (res.role === 'admin') {
          this.router.navigate(['/dashboard']);
        }
        else if (res.role === 'user') {
        this.router.navigate(['/content']);     // User Dashboard
      }
         else {
          this.error = "Not authorized as admin";
        }
      },
      error: () => {
        this.error = "Invalid credentials";
      }
    });
  }
}