import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthSuperAdminService {

  constructor(private http : HttpClient) { }

  login(username: string,password: string): Observable<any>{
    const body={username,password};
    const headers= new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/api/keste-damena/superAdmin/login',body, {headers, responseType: 'text', observe: 'response'});
  }
}
