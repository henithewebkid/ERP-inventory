import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http : HttpClient,private authenticator: AuthenticationService) { }

  newReport(saleReport:any,TotalSales:number): Observable<any>{
    const body = {saleReport,TotalSales} 
    const token: any = this.authenticator.getAccessToken();
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' +  token });
    headers.set('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/api/keste-damena/report/',body, {headers, responseType: 'text', observe: 'response'})
  }
  getHistory(): Observable<any>{
    const token: any = this.authenticator.getAccessToken();
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' +  token });
    headers.set('Content-Type', 'application/json');

    return this.http.get('http://localhost:3000/api/keste-damena/report/list/', {headers, responseType: 'text', observe: 'response'})
  }
  getAllHistory(username: any): Observable<any>{
    const token: any = this.authenticator.getAccessToken();
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' +  token });
    headers.set('Content-Type', 'application/json');

    return this.http.get('http://localhost:3000/api/keste-damena/report/' + username, {headers, responseType: 'text', observe: 'response'})
  }
}
