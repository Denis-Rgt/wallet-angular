import { JwtHelperService} from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Jwt } from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  // Méthode pour appeler l'API de connexion
  login(email: string, password: string): Observable<any> {
    const url = 'http://localhost:8080/login';
    const body = { email, password };
    return this.http.post(url, body);
  }
  logout() {
    localStorage.removeItem('token');
  }

  createAccount(nom: string, email: string, password: string): Observable<any> {
    const url = 'http://localhost:8080/addUser';
    const body = { nom, email, password };
    return this.http.post(url, body);
  }

  // getPublicKey(): Observable<any> {
  //   const url = 'http://localhost:8080/publicKey';
  //   const publicKey = this.http.get(url);
  //   return publicKey;
  // }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() { 
    return localStorage.getItem('token');
  }

  getUserId() {
    console.log('getUserId');
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    console.log(decodedToken);
    return decodedToken.id;
  }

  getUserName() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    console.log(decodedToken);
    return decodedToken.nom;
  }

  getUserEmail() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    console.log(decodedToken);
    return decodedToken.email;
  }

  isLoggedIn() {
    try {
      const token = localStorage.getItem('token');
      if (token && !this.jwtHelper.isTokenExpired(token)) {
        return true;
      } else {
        return false;
      }
    
      // const publicKey =this.getPublicKey().subscribe(
      //   (response) => {
      //     console.log(response);
      //     const publicKey = response.publicKey;
      //     console.log(publicKey);
      //     const options: jwt.VerifyOptions = { algorithms: ['RS256']  }; // Spécifiez l'algorithme de signature utilisé pour vérifier le JWT
      //     const decodedToken = jwt.verify(token, publicKey, options);
      //     //console.log(decodedToken);
      //     return true;
      // })
    ;}
    catch (error) {
      console.log(error);
      return false;
    }
  }
  
}