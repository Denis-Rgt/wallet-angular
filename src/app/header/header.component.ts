import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import {MatDialog} from '@angular/material/dialog';
import { AccountDetailsComponent } from '../account-details/account-details.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  email: string = this.loginService.getUserEmail();
  
  constructor(private loginService: LoginService, private dialog: MatDialog) { }

  openAccountDetailsPopup() {
    let dialogRef = this.dialog.open(AccountDetailsComponent, {
      height: '200px',
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
