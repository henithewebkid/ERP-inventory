import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BranchAdminService {

  constructor(private http : HttpClient,private authenticator: AuthenticationService) { }

  SignUp(username:string,location:string,password:string,isnew:boolean): Observable<any>{
    const body = {username,location,password,isnew} 
    const token: any = this.authenticator.getAccessToken();
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' +  token });
    headers.set('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/api/keste-damena/branchAdmin/signup',body, {headers, responseType: 'text', observe: 'response'})
  }
  getAllAdmins(): Observable<any>{
    const token: any = this.authenticator.getAccessToken();
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' +  token });
    headers.set('Content-Type', 'application/json');

    return this.http.get('http://localhost:3000/api/keste-damena/branchAdmin', {headers, responseType: 'text', observe: 'response'})
  }
  updateAdmin(id: any,body:{username:string,location:string}): Observable<any>{
    const token: any = this.authenticator.getAccessToken();
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' +  token });
    headers.set('Content-Type', 'application/json');

    return this.http.patch('http://localhost:3000/api/keste-damena/branchAdmin/' + id, body, {headers, responseType: 'text', observe: 'response'})
  }
  deleteAdmin(id : any): Observable<any>{
    const token: any = this.authenticator.getAccessToken();
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' +  token });
    headers.set('Content-Type', 'application/json');

    return this.http.delete('http://localhost:3000/api/keste-damena/branchAdmin/' + id, {headers, responseType: 'text', observe: 'response'})
  }
  resetPassword(id : any,body:{password:string,isnew:boolean}): Observable<any>{
    const token: any = this.authenticator.getAccessToken();
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' +  token });
    headers.set('Content-Type', 'application/json');

    return this.http.patch('http://localhost:3000/api/keste-damena/branchAdmin/resetPassword/' + id, body, {headers, responseType: 'text', observe: 'response'})
  }
  login(username: string,password: string): Observable<any>{
    const body={username,password};
    const headers= new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/api/keste-damena/branchAdmin/login',body, {headers, responseType: 'text', observe: 'response'});
  }
  changePassword(passwordCurrent:string,password: string): Observable<any>{
    const body = {passwordCurrent,password}
    console.log(passwordCurrent)
    const token: any = this.authenticator.getAccessToken();
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' +  token });
    headers.set('Content-Type', 'application/json');

    return this.http.patch('http://localhost:3000/api/keste-damena/branchAdmin/updatePassword', body, {headers, responseType: 'text', observe: 'response'})
  }
}