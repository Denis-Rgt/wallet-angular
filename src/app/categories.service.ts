import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  
  constructor(private http: HttpClient, private loginService: LoginService) { }

  getCategories(): Observable<any> {
    const url = 'http://localhost:8080/getCategories';
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(url, { headers });
  }

  addCategory(nom: string): Observable<any> {
    const url = 'http://localhost:8080/addCategory';
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const body = { nom };
    console.log(body);
    return this.http.post(url, body, { headers });
  }

  deleteCategory(id: number): Observable<any> {
    const url = 'http://localhost:8080/deleteCategory/' + id;
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.delete(url, { headers });
  }

  editCategory(id: number, nom: string): Observable<any> {
    const url = 'http://localhost:8080/updateCategory/' + id;
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const body = { nom };
    console.log(body);
    return this.http.put(url, body, { headers });
  }

}
