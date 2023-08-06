import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm: FormGroup;
  

  constructor( private loginService: LoginService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required)
    });
    }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.loginService.login(email, password).subscribe(
        response => {
          const token = response.token;
          this.loginService.saveToken(token);
          console.log(response);
          this.router.navigate(['/depenses']);
        },
        error => {
          console.log(error);
          // Traitez les erreurs ici
        }
      );
    }
  }

  gotoDepenses() : void {
    this.router.navigate(['/depenses']);
    }
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  gotoInscription() : void {
    this.router.navigate(['/inscription']);
    }
}
