import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent {
  newAccountForm: FormGroup;

  constructor( private loginService: LoginService, private router: Router) {
    this.newAccountForm = new FormGroup({
      nom : new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
    }

  createAccount() {
    if (this.newAccountForm.valid) {
      const nom = this.newAccountForm.value.nom;
      const email = this.newAccountForm.value.email;
      const password = this.newAccountForm.value.password;
      this.loginService.createAccount(nom, email, password).subscribe(
        response => {
          console.log("createAccount success");
          this.loginService.login(email, password).subscribe(
            response => {
              const token = response.token;
              this.loginService.saveToken(token);
              this.router.navigate(['/depenses']);
            },
            error => {
              console.log(error);
              // Traitez les erreurs ici
            }
          );
        },
        error => {
          console.log(error);
          // Traitez les erreurs ici
        }
      );
    }
  }
}
