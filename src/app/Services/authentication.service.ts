import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  setAccessToken(token:any){
   localStorage.setItem('access_token',token);
  }

  getAccessToken(){
    return localStorage.getItem('access_token'); 
  }

  get isLoggedIn(){
    return localStorage.getItem('access_token')!==null ? true : false;
  }
  get isSuperAdmin(){
   return localStorage.getItem('superAdmin') === 'admin'
  }
  logout(){
    localStorage.removeItem('access_token');
  }
}
