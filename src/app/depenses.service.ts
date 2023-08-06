import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class DepensesService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private loginService: LoginService) {}

  getDepenses(): Observable<any> {
    const url = this.apiUrl + '/getDepenses';
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let depenses = this.http.get(url, { headers });
    console.log(depenses);
    return depenses;
  }
  // formatDate(dateString: string): Date {
  //   dateString = dateString.substr(0, 10);
  //   const parts = dateString.split('-');
  //   const year = parseInt(parts[0], 10);
  //   const month = parseInt(parts[1], 10) - 1; // Les mois commencent à partir de 0 (0 = janvier)
  //   const day = parseInt(parts[2], 10);
  
  //   return new Date(year, month, day);
  // }

  addDepense(depense: any): Observable<any> {
    const url = this.apiUrl + '/addDepense';
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post(url, depense, { headers });
  }

  deleteDepense(depenseId: number) {
    const url = `${this.apiUrl}/deleteDepense/${depenseId}`;
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.delete(url, { headers });
  }

  editDepense(depenseId: number, depense: any) {
    console.log(depense);
    const url = `${this.apiUrl}/updateDepense/${depenseId}`;
    console.log(url);
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.put(url, depense, { headers });
  }
  
}
