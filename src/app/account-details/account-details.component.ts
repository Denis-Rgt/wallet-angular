import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent {
  userEmail: any = this.loginService.getUserEmail();
  userName: any = this.loginService.getUserName();

  constructor(private loginService: LoginService, private router: Router) { }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }


}
